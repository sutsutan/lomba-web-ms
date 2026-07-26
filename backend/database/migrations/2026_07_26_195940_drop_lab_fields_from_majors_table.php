<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::table('majors', function (Blueprint $table) {
            if (Schema::hasColumn('majors', 'lab_images')) $table->dropColumn('lab_images');
            if (Schema::hasColumn('majors', 'lab_image')) $table->dropColumn('lab_image');
            if (Schema::hasColumn('majors', 'lab_title')) $table->dropColumn('lab_title');
        });
    }

    public function down()
    {
        Schema::table('majors', function (Blueprint $table) {
            $table->json('lab_images')->nullable();
            $table->string('lab_title')->nullable();
        });
    }
};