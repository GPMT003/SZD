<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Laravel\Sanctum\PersonalAccessToken;

class CheckSanctumToken
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        $token = $request->bearerToken();
    
        if (!$token) {
            return response()->json(['message' => 'Token nem biztosított'], 401);
        }
    
        $personalAccessToken = PersonalAccessToken::findToken($token);
    
        if (!$personalAccessToken || !$personalAccessToken->tokenable) {
            return response()->json([
                'message' => 'Érvénytelen vagy hiányzó token. Kérjük, jelentkezzen be újra.',
                'status' => false
            ], 401);
        }
    
        $user = $personalAccessToken->tokenable;
    
        if (!$user->is_active) {
            return response()->json([
                'message' => 'A felhasználói fiók deaktiválva van. Kérjük, lépjen kapcsolatba az adminisztrátorral.',
                'status' => false
            ], 403);
        }
    
        Auth::login($user);
    
        return $next($request);
    }
}
