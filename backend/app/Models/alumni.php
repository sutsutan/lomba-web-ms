<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class alumni extends Model
{
     protected $fillable = ['name', 'role', 'tags', 'testimony', 'latitude', 'longitude', 'location_name', 'grad_year', 'major_id', 'profile_picture', 'is_active'];
    protected $casts = ['is_active' => 'boolean', 'latitude' => 'float', 'longitude' => 'float'];
    public function major() { return $this->belongsTo(Major::class); }
}
