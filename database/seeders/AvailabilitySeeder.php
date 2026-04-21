<?php

namespace Database\Seeders;

use App\Models\Availability;
use App\Models\DateOption;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AvailabilitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $dateOptions = DateOption::all();

        foreach ($dateOptions as $dateOption) {
            $users = [1, 2, 3, 4, 5];
            foreach ($users as $user) {
                Availability::factory()->create([
                    'date_option_id' => $dateOption->id,
                    'user_id' => $user,
                ]);
            }
        }
    }
}
