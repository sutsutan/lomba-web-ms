<?php

return [
'paths' => ['api/*', 'sanctum/csrf-cookie', '/admin/login/*', 'admin/login', 'admin/logout', 'build/*'],
'allowed_methods' => ['*'],
<<<<<<< HEAD
'allowed_origins' => ['http://127.0.0.1:5173','http://localhost:5173','http://127.0.0.1:5174','http://localhost:5174'],
=======
'allowed_origins' => ['http://127.0.0.1:5173'],
>>>>>>> 0a5216d368e8c7e522e29366506d05b340c3cd48
'allowed_headers' => ['*'],
'exposed_headers' => [],
'max_age' => 0,
'supports_credentials' => true,
];