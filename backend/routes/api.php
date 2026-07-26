<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\{
    AuthController, HeroBackgroundController, MajorController, AchievementController,
    PartnershipController, TestimonyController, FacilityController, ActivityGalleryController,
    StudentWorkController, TeacherController, ExtracurricularController, OrganizationController,
    NewsController, ExploreGalleryController, AlumniController, UploadController, UserController,
};

// --- Auth Routes ---
Route::post('/admin', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

// --- Public Routes ---
Route::get('/hero-backgrounds', [HeroBackgroundController::class, 'index']);
Route::get('/majors', [MajorController::class, 'index']);
Route::get('/majors/{slug}', [MajorController::class, 'show']);
Route::get('/achievements', [AchievementController::class, 'index']);
Route::get('/achievements/{id}', [AchievementController::class, 'show']);
Route::get('/partnerships', [PartnershipController::class, 'index']);
Route::get('/testimonies', [TestimonyController::class, 'index']);
Route::get('/facilities', [FacilityController::class, 'index']);
Route::get('/activity-galleries', [ActivityGalleryController::class, 'index']);
Route::get('/student-works', [StudentWorkController::class, 'index']);
Route::get('/teachers', [TeacherController::class, 'index']);
Route::get('/extracurriculars', [ExtracurricularController::class, 'index']);
Route::get('/organizations', [OrganizationController::class, 'index']);
Route::get('/news', [NewsController::class, 'index']);
Route::get('/news/{slug}', [NewsController::class, 'show']);
Route::get('/explore-galleries', [ExploreGalleryController::class, 'index']);
Route::get('/alumni', [AlumniController::class, 'index']);
Route::get('/alumni/years', [AlumniController::class, 'years']);
Route::get('/heroes', [HeroBackgroundController::class, 'index']);

// --- Protected Routes (semua role yang sudah login) ---
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);
});

// --- Admin Only Routes (full CMS access) ---
Route::middleware(['auth:sanctum', 'admin'])->prefix('admin')->group(function () {

    Route::get('/stats', [AuthController::class, 'adminStats']);
    Route::post('/upload', [UploadController::class, 'upload']);

    // Manajemen user hanya boleh diakses admin.
    Route::apiResource('users', UserController::class);
    Route::post('/users/{id}/approve', [UserController::class, 'approve']);

    Route::apiResources([
        'hero-backgrounds'   => HeroBackgroundController::class,
        'majors'             => MajorController::class,
        'achievements'       => AchievementController::class,
        'partnerships'       => PartnershipController::class,
        'testimonies'        => TestimonyController::class,
        'facilities'         => FacilityController::class,
        'activity-galleries' => ActivityGalleryController::class,
        'student-works'      => StudentWorkController::class,
        'teachers'           => TeacherController::class,
        'extracurriculars'   => ExtracurricularController::class,
        'organizations'      => OrganizationController::class,
        'news'               => NewsController::class,
        'explore-galleries'  => ExploreGalleryController::class,
        'alumni'             => AlumniController::class,
    ]);
});

// --- Marketing Routes (akses terbatas: PPDB + referensi jurusan + dashboard ringkas) ---
Route::middleware(['auth:sanctum', 'role:admin,marketing'])->prefix('admin')->group(function () {
    Route::get('/marketing-stats', [AuthController::class, 'marketingStats']);

    // Marketing hanya boleh membaca data jurusan (referensi PPDB), tidak boleh CRUD penuh.
    Route::get('/majors', [MajorController::class, 'index']);
    Route::get('/majors/{id}', [MajorController::class, 'show']);

    // Ganti dengan controller PPDB kamu yang sebenarnya, contoh:
    // Route::apiResource('ppdb-registrations', PpdbRegistrationController::class)
    //     ->except(['destroy']); // marketing tidak boleh hapus data pendaftar
});