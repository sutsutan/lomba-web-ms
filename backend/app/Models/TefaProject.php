<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TefaProject extends Model
{
    protected $fillable = [
        'image_url', 'student_name', 'class', 'title', 'title_id',
        'description', 'description_id', 'major_id', 'is_active', 'sort_order',
        'preview_url', 'student', 'major_code', // ✅ tambahkan alias ini
    ];

    protected $casts = ['is_active' => 'boolean'];
    protected $attributes = ['class' => 'General'];
    protected $appends = ['preview_url', 'student', 'major_code'];

    public function major()
    {
        return $this->belongsTo(Major::class);
    }

    public function getPreviewUrlAttribute()
    {
        return $this->image_url;
    }

    public function getStudentAttribute()
    {
        return $this->student_name;
    }

    public function getMajorCodeAttribute()
    {
        return $this->major ? $this->major->code : '';
    }

    public function setPreviewUrlAttribute($value)
    {
        $this->attributes['image_url'] = $value;
    }

    public function setStudentAttribute($value)
    {
        $this->attributes['student_name'] = $value;
    }

    public function setMajorCodeAttribute($value)
    {
        $major = Major::where('code', $value)->first();
        if ($major) {
            $this->attributes['major_id'] = $major->id;
        }
    }
}