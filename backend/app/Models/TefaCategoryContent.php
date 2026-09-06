<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TefaCategoryContent extends Model
{
    protected $fillable = [
        'major_id', 'intro', 'intro_id', 'detail', 'detail_id', 'closing', 'closing_id',
        'major_code', // alias
    ];

    protected $appends = ['major_code'];

    public function major()
    {
        return $this->belongsTo(Major::class);
    }

    public function getMajorCodeAttribute()
    {
        return $this->major ? $this->major->code : '';
    }

    public function setMajorCodeAttribute($value)
    {
        $major = Major::where('code', $value)->first();
        if ($major) {
            $this->attributes['major_id'] = $major->id;
        }
    }
}