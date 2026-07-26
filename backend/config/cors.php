<?php

return [
'paths' => ['api/*', 'sanctum/csrf-cookie', '/admin/*', 'admin', 'admin/logout', 'build/*'],
'allowed_methods' => ['*'],
'allowed_origins' => ['http://localhost:5173'],
'allowed_headers' => ['*'],
'exposed_headers' => [],
'max_age' => 0,
'supports_credentials' => true,
];