<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::table('majors', function (Blueprint $table) {
            $table->string('program_link')->nullable()->after('curriculum_image');
        });
    }

    public function down()
    {
        Schema::table('majors', function (Blueprint $table) {
            $table->dropColumn('program_link');
        });
    }
};