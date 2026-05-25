<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class organization extends Model
{
     protected $fillable = ['name', 'category', 'role', 'description', 'logo_url', 'competencies', 'is_active'];
    protected $casts = ['is_active' => 'boolean'];
    public function exploreGalleries() { return $this->hasMany(Explore_Gallery::class); }
}
