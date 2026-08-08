<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Explore_Gallery extends Model
{
    protected $table = 'explore_galleries';

    protected $fillable = [
        'organization_id',
        'extracurricular_id',
        'event_name',
        'traits_achievement',
        'news_id',
        'documentation_url',
        'documentation_urls',
        'year',
        'is_active'
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'documentation_urls' => 'array',
    ];

    public function organization() { return $this->belongsTo(Organization::class); }
    public function extracurricular() { return $this->belongsTo(Extracurricular::class); }
    public function news() { return $this->belongsTo(News::class); }
}