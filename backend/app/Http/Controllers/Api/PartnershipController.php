<?php

namespace App\Http\Controllers\Api;

use App\Models\Partnership;

class PartnershipController extends BaseResourceController
{
    protected $model = Partnership::class;

    protected $searchableFields = [
        'company_name',
        'location',
    ];

    protected $validationRules = [
        'logo_url'     => 'required|string',
        'company_name' => 'required|string|max:255',
        'location'     => 'nullable|string|max:255',
        'website_url'  => 'nullable|url|max:255',
        'is_active'    => 'nullable|boolean',
    ];
}