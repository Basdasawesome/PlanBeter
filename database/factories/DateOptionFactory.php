<?php

namespace Database\Factories;

use App\Models\DateOption;
use App\Models\Event;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<DateOption>
 */
class DateOptionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'event_id' => Event::inRandomOrder()->first(),
            'date' => fake()->date('Y-m-d'),
        ];
    }
}
