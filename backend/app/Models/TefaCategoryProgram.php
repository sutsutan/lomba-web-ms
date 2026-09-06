<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TefaCategoryProgram extends Model
{
    // TIDAK perlu $table lagi — default Laravel sudah benar: tefa_category_programs

    protected $fillable = [
        'major_id', 'program_order', 'title', 'title_id', 'description', 'description_id',
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