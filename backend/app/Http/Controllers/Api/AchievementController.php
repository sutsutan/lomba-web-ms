<?php
namespace App\Http\Controllers\Api;
use App\Models\Achievement;

class AchievementController extends BaseResourceController {
    protected $model = Achievement::class;
    protected $searchableFields = ['holder_name', 'description'];
    protected $validationRules = [
        'image_url'   => 'required|string',
        'category'    => 'required|in:tech,arts,culinary,hospitality,accounting',
        'holder_name' => 'required|string|max:255',
        'description' => 'nullable|string',
        'year'        => 'nullable|integer',
        'is_active'   => 'nullable|boolean',
    ];
}