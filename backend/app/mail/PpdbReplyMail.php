<?php

namespace App\Mail;

use App\Models\ppdb_submissions;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class PpdbReplyMail extends Mailable
{
    use Queueable, SerializesModels;

    public ppdb_submissions $submission;
    public string $replyMessage;

    public function __construct(ppdb_submissions $submission, string $replyMessage)
    {
        $this->submission = $submission;
        $this->replyMessage = $replyMessage;
    }

    public function build()
    {
        return $this->subject('Balasan: ' . $this->submission->subject)
            ->view('emails.ppdb-reply');
    }
}