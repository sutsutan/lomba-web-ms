<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('achievements', function (Blueprint $table) {

            $table->string('title')->after('image_url');

            $table->longText('content')
                  ->nullable()
                  ->after('description');

            $table->string('competition')
                  ->nullable()
                  ->after('category');

            $table->string('level')
                  ->nullable()
                  ->after('competition');

            $table->string('organizer')
                  ->nullable()
                  ->after('level');

            $table->string('location')
                  ->nullable()
                  ->after('organizer');

            $table->date('achievement_date')
                  ->nullable()
                  ->after('location');

            $table->string('medal')
                  ->nullable()
                  ->after('achievement_date');

            $table->string('certificate_url')
                  ->nullable()
                  ->after('medal');

            $table->foreignId('news_id')
                  ->nullable()
                  ->constrained('news')
                  ->nullOnDelete()
                  ->after('certificate_url');
        });
    }

    public function down(): void
    {
        Schema::table('achievements', function (Blueprint $table) {

            $table->dropForeign(['news_id']);

            $table->dropColumn([
                'title',
                'content',
                'competition',
                'level',
                'organizer',
                'location',
                'achievement_date',
                'medal',
                'certificate_url',
                'news_id',
            ]);
        });
    }
};