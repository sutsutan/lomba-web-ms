<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class hero_background extends Model
{
    protected $fillable = ['image_url', 'title', 'subtitle', 'order', 'is_active'];
    protected $casts = ['is_active' => 'boolean'];
}
