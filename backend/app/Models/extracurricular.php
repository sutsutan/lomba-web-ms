<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class extracurricular extends Model
{
     protected $fillable = ['name', 'category', 'coach_name', 'description', 'schedule', 'intensity', 'track_record', 'registration_link', 'image_url', 'is_active'];
    protected $casts = ['is_active' => 'boolean'];
}
