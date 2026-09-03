<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\AboutPage;
use Illuminate\Http\Request;

class AboutPageController extends Controller
{
    public function show()
    {
        return response()->json(AboutPage::singleton());
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'know_us_title'   => 'nullable|string|max:255',
            'know_us_desc1'   => 'nullable|string',
            'know_us_desc2'   => 'nullable|string',
            'know_us_summary' => 'nullable|string|max:300',
            'know_us_image1'  => 'nullable|string',
            'know_us_image2'  => 'nullable|string',
        ]);

        $about = AboutPage::singleton();
        $about->update($validated);

        return response()->json($about);
    }
}