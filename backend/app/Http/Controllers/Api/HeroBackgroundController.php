<?php
namespace App\Http\Controllers\Api;
use App\Models\Hero_Background;

class HeroBackgroundController extends BaseResourceController {
    protected $model = Hero_Background::class;
    protected $searchableFields = ['title', 'subtitle'];
    protected $validationRules = [
        'image_url' => 'required|string',
        'title'     => 'nullable|string|max:255',
        'subtitle'  => 'nullable|string|max:255',
        'order'     => 'nullable|integer',
        'is_active' => 'nullable|boolean',
    ];
}