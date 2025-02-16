<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProjectsTable extends Migration
{
    public function up()
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->date('start_date');
            $table->date('end_date');
            $table->decimal('contract_amount', 15);
            $table->string('contractor_name');
            $table->unsignedBigInteger('partner_id');
            $table->integer('completion_level');
            $table->text('planned_phases')->nullable();
            $table->timestamps();

        });
    }

    public function down()
    {
        Schema::dropIfExists('projects');
    }
}
