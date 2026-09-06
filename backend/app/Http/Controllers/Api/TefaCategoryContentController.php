<?php
// TefaCategoryContentController.php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Major;
use App\Models\TefaCategoryContent;
use Illuminate\Http\Request;

class TefaCategoryContentController extends Controller
{
    // GET /tefa-category-contents  (publik, semua jurusan sekaligus)
    public function index()
    {
        return response()->json(
            TefaCategoryContent::with('major')->get()
        );
    }

    // GET /admin/tefa-category-contents/{major_code}
    public function show(string $majorCode)
    {
        $major = Major::where('code', $majorCode)->firstOrFail();
        $content = TefaCategoryContent::firstOrCreate(
            ['major_id' => $major->id],
            ['intro' => '', 'detail' => '', 'closing' => '']
        );
        return response()->json($content);
    }

    // PUT /admin/tefa-category-contents/{major_code}
    public function update(Request $request, string $majorCode)
    {
        $major = Major::where('code', $majorCode)->firstOrFail();

        $validated = $request->validate([
            'intro'      => 'required|string',
            'intro_id'   => 'nullable|string',
            'detail'     => 'required|string',
            'detail_id'  => 'nullable|string',
            'closing'    => 'required|string',
            'closing_id' => 'nullable|string',
        ]);

        $content = TefaCategoryContent::updateOrCreate(
            ['major_id' => $major->id],
            $validated
        );

        return response()->json($content);
    }
}