<?php
// app/Http/Controllers/Api/ppdb_submissionsController.php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Mail\PpdbReplyMail;
use App\Models\ppdb_submissions;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class ppdb_submissionsController extends Controller
{
    public function index(Request $request)
    {
        $query = ppdb_submissions::query();

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        if ($request->filled('search')) {
            $s = $request->search;
            $query->where(function ($q) use ($s) {
                $q->where('parent_name', 'like', "%{$s}%")
                  ->orWhere('student_name', 'like', "%{$s}%")
                  ->orWhere('email', 'like', "%{$s}%")
                  ->orWhere('subject', 'like', "%{$s}%");
            });
        }

        return response()->json(
            $query->latest()->paginate($request->get('per_page', 20))
        );
    }

    public function show($id)
    {
        return response()->json(ppdb_submissions::with('repliedByUser')->findOrFail($id));
    }

    /**
     * Endpoint publik — dipanggil dari form Contact.tsx.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'parent_name'  => 'required|string|max:255',
            'student_name' => 'nullable|string|max:255',
            'email'        => 'required|email|max:255',
            'phone'        => 'nullable|string|max:30',
            'subject'      => 'required|string|max:255',
            'message'      => 'required|string',
        ]);

        $data['status'] = 'new';
        $item = ppdb_submissions::create($data);

        return response()->json([
            'message' => 'Pesan Anda berhasil dikirim. Tim kami akan segera menghubungi Anda.',
            'data' => $item,
        ], 201);
    }

    public function updateStatus(Request $request, $id)
    {
        $data = $request->validate([
            'status' => 'required|in:new,in_progress,replied,archived',
        ]);

        $item = ppdb_submissions::findOrFail($id);
        $item->update($data);

        return response()->json($item);
    }

    public function reply(Request $request, $id)
    {
        $data = $request->validate([
            'reply_message' => 'required|string',
        ]);

        $item = ppdb_submissions::findOrFail($id);

        Mail::to($item->email)->send(new PpdbReplyMail($item, $data['reply_message']));

        $item->update([
            'reply_message' => $data['reply_message'],
            'status'        => 'replied',
            'replied_at'    => now(),
            'replied_by'    => $request->user()->id,
        ]);

        return response()->json($item->fresh('repliedByUser'));
    }

    public function destroy($id)
    {
        ppdb_submissions::findOrFail($id)->delete();
        return response()->json(['message' => 'Deleted successfully']);
    }
}