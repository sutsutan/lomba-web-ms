<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
class news extends Model
{
  protected $fillable = [
        'title_id', 
        'excerpt_id', 
        'content_id',
        'title_en', 
        'excerpt_en', 
        'content_en',
        'slug', 
        'category',
        'thumbnail',
        'user_id'
    ];

    public function toFormattedArray($lang = 'id')
    {
        return [
            'id' => $this->id,
            'title' => $lang == 'en' ? $this->title_en : $this->title_id,
            'excerpt' => $lang == 'en' ? $this->excerpt_en : $this->excerpt_id,
            'content' => $lang == 'en' ? $this->content_en : $this->content_id,
            'date' => $this->created_at->format('Y-m-d'),
            'category' => $this->category,
            'image' => $this->thumbnail ? asset('storage/' . $this->thumbnail) : null,
            'slug' => $this->slug,
        ];
    }
}
