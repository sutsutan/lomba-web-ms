<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration {
    public function up()
    {
        Schema::table('majors', function (Blueprint $table) {
            $table->json('lab_images')->nullable()->after('lab_image');
            $table->json('activity_images')->nullable()->after('activity_image');
        });

        DB::table('majors')->orderBy('id')->get()->each(function ($major) {
            DB::table('majors')->where('id', $major->id)->update([
                'lab_images'      => json_encode($major->lab_image ? [$major->lab_image] : []),
                'activity_images' => json_encode($major->activity_image ? [$major->activity_image] : []),
            ]);
        });
    }

    public function down()
    {
        Schema::table('majors', function (Blueprint $table) {
            $table->dropColumn(['lab_images', 'activity_images']);
        });
    }
};