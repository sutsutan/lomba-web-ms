<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::table('facilities', function (Blueprint $table) {
            $table->string('location')->nullable()->after('image_url');
            $table->string('condition')->default('Baik')->after('location');
        });
    }

    public function down()
    {
        Schema::table('facilities', function (Blueprint $table) {
            $table->dropColumn(['location', 'condition']);
        });
    }
};