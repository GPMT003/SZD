<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateArticlesoutTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('articlesout', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger("did");
            $table->unsignedBigInteger("iid");
            $table->decimal('price', 10);
            $table->decimal('fifo', 10)->nullable();
            $table->decimal('average', 10);
            $table->decimal('volume', 10);
            $table->text('comment')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('articlesout');
    }
}
