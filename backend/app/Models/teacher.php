<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class teacher extends Model
{
      protected $fillable = ['name', 'nip', 'division', 'role', 'quote', 'competencies_tags', 'profile_picture', 'is_active'];
    protected $casts = ['is_active' => 'boolean'];
}
