<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class student_work extends Model
{
    protected $fillable = [
        'image_url', 'student_name', 'title', 'description', 'class', 'major_id', 'is_active',
        'preview_url', 'creators', 'major_code', 'project_url'
    ];
    
    protected $casts = ['is_active' => 'boolean'];
    protected $attributes = ['class' => 'General'];
    protected $appends = ['preview_url', 'creators', 'major_code'];

    public function major() { return $this->belongsTo(Major::class); }

    // Accessors
    public function getPreviewUrlAttribute()
    {
        return $this->image_url;
    }

    public function getCreatorsAttribute()
    {
        return $this->student_name;
    }

    public function getMajorCodeAttribute()
    {
        return $this->major ? $this->major->code : '';
    }

    // Mutators
    public function setPreviewUrlAttribute($value)
    {
        $this->attributes['image_url'] = $value;
    }

    public function setCreatorsAttribute($value)
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
