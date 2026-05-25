<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class student_work extends Model
{
    protected $fillable = ['image_url', 'student_name', 'title', 'description', 'class', 'major_id', 'is_active'];
    protected $casts = ['is_active' => 'boolean'];
    public function major() { return $this->belongsTo(Major::class); }
}
