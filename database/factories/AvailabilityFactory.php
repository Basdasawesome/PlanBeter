<?php

namespace Database\Factories;

use App\AvailabilityStatus;
use App\Models\Availability;
use App\Models\DateOption;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Availability>
 */
class AvailabilityFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'date_option_id' => DateOption::inRandomOrder()->first(),
            'user_id' => User::inRandomOrder()->first(),
            'status' => fake()->randomelement(AvailabilityStatus::cases()),
        ];
    }
}
