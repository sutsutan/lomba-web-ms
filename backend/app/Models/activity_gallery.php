<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class activity_gallery extends Model
{
     protected $fillable = ['image_url', 'caption', 'major_id', 'activity_date', 'is_active'];
    protected $casts = ['is_active' => 'boolean', 'activity_date' => 'date'];
    public function major() { return $this->belongsTo(Major::class); }
}
