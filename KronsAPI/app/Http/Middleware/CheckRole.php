<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Laravel\Sanctum\PersonalAccessToken;

class CheckRole
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
        
        $personalAccessToken = PersonalAccessToken::findToken($request->bearerToken());
        $user = $personalAccessToken->tokenable;
        if (!$user->role) {
            return response()->json([
                'message' => 'Nincs jogosultsága a művelethez',
                'status' => false
            ], 403);
        }

        return $next($request); // Ha a felhasználó jogosult
    }
}
