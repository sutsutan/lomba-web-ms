<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
class News extends Model
{
   protected $fillable = [
    'slug', 'title_id', 'title_en', 'excerpt_id', 'excerpt_en', 
    'content_id', 'content_en', 'category', 'thumbnail', 
    'published_date', 'is_published', 'user_id'
];
    protected $casts = ['is_published' => 'boolean', 'published_date' => 'date'];

}
