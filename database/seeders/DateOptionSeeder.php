<?php

namespace Database\Seeders;

use App\Models\DateOption;
use App\Models\Event;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DateOptionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $events = Event::all();

        foreach ($events as $event) {
            DateOption::factory(5)->create([
                'event_id' => $event->id,
            ]);
        }
    }
}
