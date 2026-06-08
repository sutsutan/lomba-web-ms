<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HeroBackground extends Model
{
    protected $fillable = ['image_url', 'title_id', 'title_en', 'subtitle_id', 'subtitle_en', 'category', 'order', 'is_active'];
    protected $casts = ['is_active' => 'boolean',
        'order' => 'integer'];
}
