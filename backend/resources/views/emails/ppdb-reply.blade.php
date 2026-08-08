<!DOCTYPE html>
<html>
<body style="font-family: sans-serif; color: #1e293b; line-height: 1.6;">
    <div style="max-width: 600px; margin: 0 auto; padding: 24px;">
        <h2 style="color: #12606A;">SMK Pariwisata Metland School</h2>
        <p>Kepada Yth. {{ $submission->parent_name }},</p>

        <p>Terima kasih telah menghubungi kami perihal <strong>{{ $submission->subject }}</strong>. Berikut balasan kami:</p>

        <div style="background: #f8fafb; border-left: 4px solid #12606A; padding: 16px; margin: 16px 0; white-space: pre-line;">
            {{ $replyMessage }}
        </div>

        <p style="color: #64748b; font-size: 12px; margin-top: 32px;">
            Pesan asli Anda:<br>
            <em>"{{ $submission->message }}"</em>
        </p>

        <p>Hormat kami,<br>Tim Marketing SMK Pariwisata Metland School</p>
    </div>
</body>
</html>