<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AboutTimeline extends Model
{
    protected $fillable = ['year', 'heads', 'beginning', 'growing', 'image', 'order'];

    protected $casts = [
        'heads' => 'array',
    ];
}
