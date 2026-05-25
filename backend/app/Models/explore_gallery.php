<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class explore_gallery extends Model
{
     protected $fillable = ['organization_id', 'event_name', 'traits_achievement', 'news_id', 'documentation_url', 'year', 'is_active'];
    protected $casts = ['is_active' => 'boolean'];
    public function organization() { return $this->belongsTo(Organization::class); }
    public function news() { return $this->belongsTo(News::class); }
}
