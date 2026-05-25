<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class partnership extends Model
{
     protected $fillable = ['logo_url', 'company_name', 'location', 'website_url', 'is_active'];
    protected $casts = ['is_active' => 'boolean'];
}
