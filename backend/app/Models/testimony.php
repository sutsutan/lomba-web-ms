<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class testimony extends Model
{
    protected $fillable = ['from_type', 'name', 'alias', 'quote', 'video_url', 'profile_picture', 'is_active'];
    protected $casts = ['is_active' => 'boolean'];
}
