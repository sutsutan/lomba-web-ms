<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class achievement extends Model
{
    protected $fillable = ['image_url', 'category', 'holder_name', 'description', 'year', 'is_active'];
    protected $casts = ['is_active' => 'boolean'];
}
