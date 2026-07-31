<?php
// app/Models/PpdbSubmission.php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ppdb_submissions extends Model
{
    protected $fillable = [
        'parent_name',
        'student_name',
        'email',
        'phone',
        'subject',
        'message',
        'status',
        'reply_message',
        'replied_at',
        'replied_by',
    ];

    protected $casts = [
        'replied_at' => 'datetime',
    ];

    public function repliedByUser()
    {
        return $this->belongsTo(User::class, 'replied_by');
    }
}