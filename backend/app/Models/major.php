<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use App\Models\Student_work;
use App\Models\Alumni;

class Major extends Model
{
    protected $fillable = [
    'name', 'slug', 'icon', 'description', 'cover_image', 'is_active',
    'code', 'head_of_major', 'total_students', 'total_partners',
    'curriculum_image', 'activity_images'
];
    protected $casts = [
        'is_active'      => 'boolean',
    ];

    public function facilities() { return $this->hasMany(Facility::class); }
    public function activityGalleries() { return $this->hasMany(Activity_Gallery::class); }
    public function studentWorks() { return $this->hasMany(Student_Work::class); }
    public function Alumni() { return $this->hasMany(Alumni::class); }
}