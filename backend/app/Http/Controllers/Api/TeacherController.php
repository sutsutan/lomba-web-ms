<?php
namespace App\Http\Controllers\Api;
use App\Models\Teacher;

class TeacherController extends BaseResourceController {
    protected $model = Teacher::class;
    protected $searchableFields = ['name', 'nip', 'role'];
    protected $validationRules = [
        'name'               => 'required|string|max:255',
        'nip'                => 'nullable|string|unique:teachers,nip',
        'division'           => 'required|in:IT,Culinary,Visual Communication Design,Hospitality,Accounting,general_subject,staff',
        'role'               => 'required|string|max:255',
        'quote'              => 'nullable|string',
        'competencies_tags'  => 'nullable|string',
        'profile_picture'    => 'nullable|string',
        'is_active'          => 'nullable|boolean',
    ];
}