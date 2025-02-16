<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateForeignKeysForTables extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('articles', function (Blueprint $table) {
            $table->foreign('did')->references('id')->on('indocuments')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('iid')->references('id')->on('items')->onDelete('cascade')->onUpdate('cascade');
        });

        Schema::table('outdocuments', function (Blueprint $table) {
            $table->foreign('mid')->references('id')->on('moves')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('pid')->references('id')->on('projects')->onDelete('cascade')->onUpdate('cascade');
        });

        Schema::table('indocuments', function (Blueprint $table) {
            $table->foreign('pid')->references('id')->on('partners')->onDelete('cascade')->onUpdate('cascade');
        });

        Schema::table('articlesout', function (Blueprint $table) {
            $table->foreign('did')->references('id')->on('outdocuments')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('iid')->references('id')->on('items')->onDelete('cascade')->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('articles', function (Blueprint $table) {
            $table->dropForeign(['did']);
            $table->dropForeign(['iid']);
        });

        Schema::table('outdocuments', function (Blueprint $table) {
            $table->dropForeign(['mid']);
            $table->dropForeign(['pid']);
        });

        Schema::table('indocuments', function (Blueprint $table) {
            $table->dropForeign(['pid']);
        });

        Schema::table('articlesout', function (Blueprint $table) {
            $table->dropForeign(['iid']);
            $table->dropForeign(['did']);
        });
    }
}
