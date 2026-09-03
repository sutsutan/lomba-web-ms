<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AboutPage extends Model
{
    protected $table = 'about_pages';

    protected $fillable = [
        'know_us_title', 'know_us_desc1', 'know_us_desc2',
        'know_us_summary', 'know_us_image1', 'know_us_image2',
    ];

    public static function singleton(): self
    {
        return self::query()->first() ?? self::create([]);
    }
}