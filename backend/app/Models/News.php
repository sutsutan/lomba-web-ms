<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class News extends Model
{
    use HasFactory;

    // Pastikan ini ada agar bisa diisi (mass assignment)
    protected $fillable = [
        'title_id', 'title_en', 'category', 'thumbnail', 
        'content_id', 'content_en', 'excerpt_id', 'excerpt_en', 
        'is_published', 'published_date', 'slug', 'user_id', 'gallery_images', 'is_headline'
    ];

    // Jika Anda ingin format tanggal otomatis
    protected $casts = [
        'is_published' => 'boolean',
        'is_headline' => 'boolean',
        'gallery_images' => 'array',
    ];

    public function toFormattedArray($lang = 'id')
{
    return [
        'id'             => $this->id,
        'title_id'       => $this->title_id,
        'category'       => $this->category,
        'published_date' => $this->published_date,
        'is_published'   => (bool)$this->is_published,
        'thumbnail'      => $this->thumbnail,
        'content_id'     => $this->content_id,
        'excerpt_id'     => $this->excerpt_id,
        'slug'           => $this->slug,
        'is_headline'    => (bool)$this->is_headline,
        'gallery_images' => $this->gallery_images ?? [],
    ];
}
}