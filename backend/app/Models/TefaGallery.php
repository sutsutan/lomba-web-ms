<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TefaGallery extends Model
{
    protected $fillable = [
        'image_url', 'title', 'title_id', 'subtitle', 'subtitle_id',
        'major_id', 'sort_order', 'is_active',
        'preview_url', 'major_code', // ✅ tambahkan alias ini
    ];

    protected $casts = ['is_active' => 'boolean'];
    protected $appends = ['preview_url', 'major_code'];

    public function major()
    {
        return $this->belongsTo(Major::class);
    }

    public function getPreviewUrlAttribute()
    {
        return $this->image_url;
    }

    public function getMajorCodeAttribute()
    {
        return $this->major ? $this->major->code : '';
    }

    public function setPreviewUrlAttribute($value)
    {
        $this->attributes['image_url'] = $value;
    }

    public function setMajorCodeAttribute($value)
    {
        $major = Major::where('code', $value)->first();
        if ($major) {
            $this->attributes['major_id'] = $major->id;
        }
    }
}