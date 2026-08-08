<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class NewsCategory extends Model
{
    protected $fillable = ['name', 'slug'];

    protected static function booted()
    {
        static::creating(function (self $category) {
            if (empty($category->slug)) {
                $category->slug = Str::slug($category->name);
            }
        });
    }
}