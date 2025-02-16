<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOutdocumentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('outdocuments', function (Blueprint $table) {
            $table->id();
            $table->string("documentId");
            $table->date('date');
            $table->unsignedBigInteger("pid")->nullable();
            $table->unsignedBigInteger("mid");
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
        Schema::dropIfExists('outdocuments');
    }
}
