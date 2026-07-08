<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class UploadController extends Controller {
    public function upload(Request $request) {
        $request->validate([
            'file' => 'required|file|max:51200',
            'folder' => 'nullable|string',
        ]);

        $folder = $request->get('folder', 'uploads');
        $path = $request->file('file')->store($folder, 'public');
        $url = Storage::disk('public')->url($path);

        return response()->json(['url' => $url, 'path' => $path]);
    }
}