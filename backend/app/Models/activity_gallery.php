<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class activity_gallery extends Model
{
    protected $fillable = ['image_url', 'caption', 'title', 'description', 'major_id', 'activity_date', 'is_active', 'is_featured'];
    protected $casts = ['is_active' => 'boolean', 'is_featured' => 'boolean', 'activity_date' => 'date'];
    protected $appends = ['major_code'];

    public function major() { return $this->belongsTo(Major::class); }

    public function getMajorCodeAttribute(): ?string
    {
        if ($this->major) {
            return $this->major->code ?? $this->major->slug;
        }
        return null;
    }
}
