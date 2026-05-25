<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class facility extends Model
{
     protected $fillable = ['name', 'description', 'image_url', 'major_id', 'is_active'];
    protected $casts = ['is_active' => 'boolean'];
    public function major() { return $this->belongsTo(Major::class); }
}
