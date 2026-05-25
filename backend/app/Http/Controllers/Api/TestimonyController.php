<?php
namespace App\Http\Controllers\Api;
use App\Models\Testimony;

class TestimonyController extends BaseResourceController {
    protected $model = Testimony::class;
    protected $searchableFields = ['name', 'quote'];
    protected $validationRules = [
        'from_type'       => 'required|in:student,parents,teacher,alumni,industry',
        'name'            => 'required|string|max:255',
        'alias'           => 'nullable|string|max:255',
        'quote'           => 'required|string',
        'video_url'       => 'nullable|url',
        'profile_picture' => 'nullable|string',
        'is_active'       => 'nullable|boolean',
    ];
}