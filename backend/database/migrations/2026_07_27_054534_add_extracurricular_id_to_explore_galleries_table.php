<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::table('explore_galleries', function (Blueprint $table) {
            $table->foreignId('extracurricular_id')
                ->nullable()
                ->after('organization_id')
                ->constrained('extracurriculars')
                ->nullOnDelete();
        });
    }

    public function down()
    {
        Schema::table('explore_galleries', function (Blueprint $table) {
            $table->dropConstrainedForeignId('extracurricular_id');
        });
    }
};