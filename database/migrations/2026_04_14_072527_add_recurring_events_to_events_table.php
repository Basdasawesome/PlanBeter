<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('events', function (Blueprint $table) {
            $table->date('recurrence_last_duplicated_at')->nullable()->after('recurrence_ends_at');
            $table->integer('recurring_events_count')->default(0)->after('recurrence_last_duplicated_at');
            $table->dropColumn('is_recurring');
            $table->dropColumn('is_confirmed');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('events', function (Blueprint $table) {
            $table->dropColumn('recurrence_last_duplicated_at');
            $table->dropColumn('recurring_events_count');
            $table->boolean('is_recurring')->default(false)->after('recurrence_ends_at');
            $table->boolean('is_confirmed')->default(false)->after('is_recurring');
        });
    }
};
