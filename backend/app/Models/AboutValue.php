<?php

// app/Models/AboutValue.php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AboutValue extends Model
{
    protected $fillable = ['image', 'title', 'description', 'order'];
}
