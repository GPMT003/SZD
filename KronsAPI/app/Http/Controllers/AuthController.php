<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use App\Mail\ResetPasswordMail;
use Illuminate\Support\Facades\Mail;
use Carbon\Carbon;

class AuthController extends Controller
{
    private function generateRandomPassword($length = 12)
    {
        $lowercase = 'abcdefghijklmnopqrstuvwxyz';
        $uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $numbers = '0123456789';

        $password = '';

        $password .= $lowercase[mt_rand(0, strlen($lowercase) - 1)];
        $password .= $uppercase[mt_rand(0, strlen($uppercase) - 1)];
        $password .= $numbers[mt_rand(0, strlen($numbers) - 1)];

        $characters = $lowercase . $uppercase . $numbers;
        for ($i = strlen($password); $i < $length; $i++) {
            $password .= $characters[mt_rand(0, strlen($characters) - 1)];
        }

        return str_shuffle($password);
    }

    private function getValidationRulesAndMessages($field)
    {
        $rulesAndMessages = [
            'name' => [
                'rules' => 'required|string|max:255',
                'messages' => [
                    'required' => 'A felhasználónév megadása kötelező!',
                    'unique' => 'Ez a felhasználónév már foglalt.',
                ]
            ],
            'email' => [
                'rules' => 'required|string|email|max:255|unique:users',
                'messages' => [
                    'required' => 'Az email cím megadása kötelező!',
                    'email' => 'Az email cím formátuma érvénytelen.',
                    'unique' => 'Ez az email cím már regisztrálva van.',
                ]
            ],
            'password' => [
                'rules' => 'required|string|min:8|regex:/^(?=.*[a-zA-Z])(?=.*\\d).+$/|confirmed',
                'messages' => [
                    'required' => 'A jelszó megadása kötelező!',
                    'min' => 'A jelszónak legalább 8 karakter hosszúnak kell lennie.',
                    'regex' => 'A jelszónak tartalmaznia kell betűt és számot.',
                    'confirmed' => 'A jelszavak nem egyeznek.',
                ]
            ],
            'password_confirmation' => [
                'rules' => 'required|string',
                'messages' => [
                    'required' => 'A jelszó megerősítése kötelező!',
                ]
            ],
        ];

        return $rulesAndMessages[$field] ?? [
            'rules' => '',
            'messages' => []
        ];
    }

    public function register(Request $request)
    {
        $rules = [
            'name' => 'required|string|max:255|unique:users,name',
            'email' => 'required|string|email|max:255|unique:users,email',
        ];
        $messages = [];

        foreach (['name', 'email'] as $field) {
            $fieldConfig = $this->getValidationRulesAndMessages($field);
            $rules[$field] = $fieldConfig['rules'];
            $messages = array_merge($messages, $fieldConfig['messages']);
        }

        $validator = Validator::make($request->all(), $rules, $messages);

        if ($validator->fails()) {
            return response()->json(["message" => $validator->errors(), "status" => false], 400);
        }

        $password = $request->has('password') ? $request->password : $this->generateRandomPassword();
        $token = $this->sendLink($request->email, $password);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($password),
            'is_active' => true,
            'role' => false,
            'vtoken' => $token,
            'etime' => Carbon::now()->addMinutes(30)
        ]);

        return response()->json(['message' => 'Sikeres regisztráció', 'password' => $password, "status" => true], 201);
    }

    public function login(Request $request)
    {
        $rules = [
            'name' => 'required|string|max:255',
            'password' => 'required|string|min:8|regex:/^(?=.*[a-zA-Z])(?=.*\\d).+$/',
        ];
        $messages = [
            'name.required' => 'A felhasználónév megadása kötelező!',
            'password.required' => 'A jelszó megadása kötelező!',
            'password.min' => 'A jelszónak legalább 8 karakter hosszúnak kell lennie.',
            'password.regex' => 'A jelszónak tartalmaznia kell betűt és számot.',
        ];

        $validator = Validator::make($request->all(), $rules, $messages);

        if ($validator->fails()) {
            return response()->json(["message" => $validator->errors(), "status" => false], 400);
        }

        $user = User::where('name', $request->name)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'Érvénytelen hitelesítő adatok', 'status' => false], 401);
        }

        if (!$user->is_active) {
            return response()->json(['message' => 'A felhasználó inaktív', 'status' => false], 403);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json(['message' => 'Sikeres bejelentkezés', 'token' => $token, 'role' => $user->role, 'status' => true], 200);
    }

    public function logout(Request $request)
    {
        $user = Auth::guard('sanctum')->user();

        if (!$user) {
            return response()->json(['message' => 'Érvénytelen token', 'status' => false], 401);
        }

        $user->tokens->each(function ($token) {
            $token->delete();
        });

        return response()->json(['message' => 'Sikeres kijelentkezés', 'status' => true], 200);
    }

    public function checkToken(Request $request)
    {
        $user = Auth::guard('sanctum')->user();

        if (!$user) {
            return response()->json(['message' => 'Érvénytelen token', 'status' => false], 401);
        }

        if ($user->is_active == 0) {
            return response()->json(['message' => 'Zárolt fiók', 'status' => false], 403);
        }

        return response()->json(['message' => 'Érvényes token', 'status' => true], 200);
    }

    public function getAllUsers(Request $request)
    {
        $users = User::select('id', 'name', 'email', 'role', 'is_active')->get();
        return response()->json(['users' => $users, 'status' => true], 200);
    }

    public function updateUser(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|string|max:255|unique:users,name,' . $request->id . ',id',
            'email' => 'sometimes|email|unique:users,email,' . $request->id . ',id',
            'is_active' => 'sometimes|boolean',
            'role' => 'sometimes|boolean',
        ]);
        

        if ($validator->fails()) {
            return response()->json(["message" => $validator->errors(), "status" => false], 400);
        }

        $user = User::find($request->id);

        if (!$user) {
            return response()->json(['message' => 'Felhasználó nem található', 'status' => false], 404);
        }

        if ($request->has('name')) {
            $user->name = $request->name;
        }
        if ($request->has('email')) {
            $user->email = $request->email;
        }
        if ($request->has('is_active')) {
            $user->is_active = $request->is_active;
        }
        if ($request->has('role')) {
            $user->role = $request->role;
        }

        $user->save();

        return response()->json(['message' => 'Felhasználó adatai frissítve', 'status' => true], 200);
    }

    public function sendLink($email, $password)
    {
        $token = Str::random(60);
        $resetLink = 'http://localhost:3000/password-reset?token=' . $token;

        try {
            Mail::to($email)->send(new ResetPasswordMail($resetLink, $password));
        } catch (\Exception $e) {
            \Log::error('Hiba történt az e-mail küldése során: ' . $e->getMessage());
            return response()->json(['message' => 'Hiba történt az e-mail küldése során', 'status' => false], 500);
        }

        return $token;
    }

    public function resetPassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'password' => 'required|string|min:8|regex:/^(?=.*[a-zA-Z])(?=.*\\d).+$/',
            'email' => 'required|email',
        ]);

        if ($validator->fails()) {
            return response()->json(["message" => $validator->errors(), "status" => false], 400);
        }

        $user = User::where('vtoken', $request->token)->first();

        if (!$user || $user->etime < Carbon::now()) {
            return response()->json(['message' => 'A token lejárt vagy érvénytelen', 'status' => false], 400);
        }

        if ($request->email == $user->email) {
            $user->vtoken = "";
            $user->etime = Carbon::now();
            $user->password = Hash::make($request->password);
            $user->save();

            return response()->json(['message' => 'Sikeres jelszó módosítás!', 'status' => true], 200);
        }

        return response()->json(['message' => 'Felhasználó nem található', 'status' => false], 404);
    }
}