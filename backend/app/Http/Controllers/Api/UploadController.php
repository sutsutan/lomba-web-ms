<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;

class UploadController extends Controller
{
    public function upload(Request $request)
    {
        $request->validate([
            'file'   => 'required|file|mimes:jpeg,jpg,png,webp,gif,svg,pdf,doc,docx,xls,xlsx,ppt,pptx,zip,rar|max:51200',
            'folder' => 'nullable|string',
        ]);

        try {
            $folder = $request->input('folder', 'uploads');

            if (!$request->hasFile('file')) {
                return response()->json([
                    'success' => false,
                    'message' => 'File tidak ditemukan.'
                ], 400);
            }

            $file = $request->file('file');

            if (!$file->isValid()) {
                return response()->json([
                    'success' => false,
                    'message' => 'File upload tidak valid.'
                ], 400);
            }

            $path = Storage::disk('public')->putFile($folder, $file);

            if (!$path) {
                return response()->json([
                    'success' => false,
                    'message' => 'Gagal menyimpan file.'
                ], 500);
            }

            return response()->json([
                'success' => true,
                'path' => $path,
                'url' => Storage::url($path),

                // Debug
                'exists' => Storage::disk('public')->exists($path),
                'absolute_path' => Storage::disk('public')->path($path),
                'disk_root' => config('filesystems.disks.public.root'),
                'app_url' => config('app.url'),
            ]);
        } catch (\Throwable $e) {

            Log::error($e);

            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
                'line' => $e->getLine(),
                'file' => $e->getFile(),
            ], 500);
        }
    }
}