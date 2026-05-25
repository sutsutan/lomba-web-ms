<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use App\Models\student_work;
use App\Models\alumni;
class Major extends Model
{
     protected $fillable = ['name', 'slug', 'icon', 'description', 'cover_image', 'is_active'];
    protected $casts = ['is_active' => 'boolean'];

    public function facilities() { return $this->hasMany(Facility::class); }
    public function activityGalleries() { return $this->hasMany(Activity_Gallery::class); }
    public function studentWorks() { return $this->hasMany(Student_Work::class); }
    public function alumni() { return $this->hasMany(Alumni::class); }
}
