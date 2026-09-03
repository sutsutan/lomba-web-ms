<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\{
    AuthController, HeroBackgroundController, MajorController, AchievementController,
    PartnershipController, TestimonyController, FacilityController, ActivityGalleryController,
    StudentWorkController, TeacherController, ExtracurricularController, OrganizationController,
    NewsController, NewsCategoryController, ExploreGalleryController, AlumniController, UploadController, UserController,
    ppdb_submissionsController, AboutPageController, AboutValueController, AboutTimelineController
};

// --- Auth Routes ---
Route::post('/admin', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

// --- Public Routes ---
Route::get('/hero-backgrounds', [HeroBackgroundController::class, 'index']);
Route::get('/majors', [MajorController::class, 'index']);
Route::get('/majors/{slug}', [MajorController::class, 'show']);
Route::get('/achievements', [AchievementController::class, 'index']);
Route::get('/achievements/summary', [AchievementController::class, 'summary']);
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
Route::get('/news-categories', [NewsCategoryController::class, 'index']);
Route::get('/explore-galleries', [ExploreGalleryController::class, 'index']);
Route::get('/alumni', [AlumniController::class, 'index']);
Route::get('/alumni/years', [AlumniController::class, 'years']);
Route::get('/heroes', [HeroBackgroundController::class, 'index']);
Route::get('/about-page', [AboutPageController::class, 'show']);
Route::get('/about-values', [AboutValueController::class, 'index']);
Route::get('/about-timelines', [AboutTimelineController::class, 'index']);


// Form PPDB/Contact — publik, tanpa perlu login (diisi orang tua murid)
Route::post('/ppdb-submissions', [ppdb_submissionsController::class, 'store']);

// --- Protected Routes (semua role yang sudah login) ---
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);
});

// --- Admin Only Routes (modul yang TIDAK boleh diakses marketing) ---
Route::middleware(['auth:sanctum', 'admin'])->prefix('admin')->group(function () {
    Route::apiResource('users', UserController::class);

    Route::apiResources([
        'facilities'         => FacilityController::class,
        'activity-galleries' => ActivityGalleryController::class,
        'student-works'      => StudentWorkController::class,
        'teachers'           => TeacherController::class,
        'extracurriculars'   => ExtracurricularController::class,
        'organizations'      => OrganizationController::class,
        'news'               => NewsController::class,
        'explore-galleries'  => ExploreGalleryController::class,
    ]);
});

// --- Shared Routes (Admin & Marketing) ---
// Modul: Dashboard/stats, Jurusan, Prestasi, Alumni, Hero, Mitra, Testimoni, PPDB, Upload
Route::middleware(['auth:sanctum', 'role:admin,marketing'])->prefix('admin')->group(function () {
    Route::get('/stats', [AuthController::class, 'adminStats']);
    Route::post('/upload', [UploadController::class, 'upload']);
    Route::put('/about-page', [AboutPageController::class, 'update']);
    Route::apiResource('about-values', AboutValueController::class)->except(['show']);
    Route::apiResource('about-timelines', AboutTimelineController::class)->except(['show']);

    Route::apiResources([
        'majors'           => MajorController::class,
        'achievements'     => AchievementController::class,
        'alumni'           => AlumniController::class,
        'hero-backgrounds' => HeroBackgroundController::class,
        'partnerships'     => PartnershipController::class,
        'testimonies'      => TestimonyController::class,
    ]);

    // Kategori berita — bisa ditambahkan langsung dari form admin berita
    Route::post('/news-categories', [NewsCategoryController::class, 'store']);
    Route::delete('/news-categories/{newsCategory}', [NewsCategoryController::class, 'destroy']);

    // PPDB Inbox — 'store' tidak didaftarkan di sini karena sudah publik di atas
    Route::apiResource('ppdb-submissions', ppdb_submissionsController::class)->except(['store']);
    Route::patch('/ppdb-submissions/{id}/status', [ppdb_submissionsController::class, 'updateStatus']);
    Route::post('/ppdb-submissions/{id}/reply', [ppdb_submissionsController::class, 'reply']);
});