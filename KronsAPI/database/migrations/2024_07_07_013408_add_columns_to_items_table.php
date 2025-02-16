<?php 

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddColumnsToItemsTable extends Migration
{
    public function up()
    {
        Schema::table('items', function (Blueprint $table) {
            $table->decimal('purchased_quantity', 25)->default(0);
            $table->decimal('purchased_average_cost', 25)->default(0)->after('purchased_quantity');
            $table->decimal('issued_quantity', 25)->default(0)->after('purchased_average_cost');
            $table->decimal('issued_average_cost', 25)->default(0)->after('issued_quantity');
            $table->decimal('cost', 25)->default(0);
        });
    }

    public function down()
    {
        Schema::table('items', function (Blueprint $table) {
            $table->dropColumn('purchased_quantity');
            $table->dropColumn('purchased_average_cost');
            $table->dropColumn('issued_quantity');
            $table->dropColumn('issued_average_cost');
            $table->dropColumn('cost');
        });
    }
}
