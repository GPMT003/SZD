<?php

return [
    'paths' => ['api/*', 'sanctum/csrf-cookie'],  // Ha az API URL-je más, akkor azt is itt kell hozzáadni

    'allowed_methods' => ['*'],  // Az összes HTTP metódust engedélyezzük, ha specifikus metódusokat akarsz, pl. ['GET', 'POST'], akkor azt is lehet

    'allowed_origins' => ['http://localhost:3000'],  // Itt engedélyezzük a React frontend alkalmazást

    'allowed_headers' => ['*'],  // Az összes fejléc engedélyezése

    'exposed_headers' => false,  // Nem szükséges ezt most módosítani

    'max_age' => 0,  // A CORS válaszok cache-elése

    'supports_credentials' => true,  // Ha szükség van a cookie-k vagy hitelesítési információk továbbítására
];