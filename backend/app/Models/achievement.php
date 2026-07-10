<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\News;

class Achievement extends Model
{
    protected $fillable = [
        'image_url',
        'title',
        'category',
        'competition',
        'level',
        'organizer',
        'location',
        'achievement_date',
        'holder_name',
        'description',
        'content',
        'year',
        'medal',
        'certificate_url',
        'news_id',
        'is_active',
    ];

    protected $casts = [
        'achievement_date' => 'date',
        'is_active' => 'boolean',
    ];

    public function news()
    {
        return $this->belongsTo(News::class);
    }
}