<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class CorsMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        return $next($request)
            ->header('Access-Control-Allow-Origin', 'http://localhost:3000')  // React app origin engedélyezése
            ->header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS')  // Engedélyezett HTTP metódusok
            ->header('Access-Control-Allow-Headers', 'Content-Type, Authorization');  // Engedélyezett fejlécek
    }
}
