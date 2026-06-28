<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class organization extends Model
{
     protected $fillable = ['name', 'category', 'leader_name', 'description_id', 'description_en', 'advisor_name','logo_url', 'is_active'];
    protected $casts = ['is_active' => 'boolean'];
    public function exploreGalleries() { return $this->hasMany(Explore_Gallery::class); }
}
