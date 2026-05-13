<?php

use App\AvailabilityStatus;
use App\Models\Event;
use App\Models\User;

test('#7: user can submit availability for all date options', function () {
    $user = User::factory()->create();

    $this->actingAs($user);

    $this->post(route('events.store'), [
        'title' => 'Drie data',
        'description' => null,
        'group_id' => null,
        'recurrence_type' => null,
        'date_options' => [
            ['date' => planningFutureDate(2)],
            ['date' => planningFutureDate(3)],
            ['date' => planningFutureDate(4)],
        ],
    ])->assertRedirect();

    $event = Event::where('title', 'Drie data')->firstOrFail();
    $event->load('dateOptions');
    $options = $event->dateOptions->sortBy('date')->values();

    $this->post(route('events.availability.update', $event), [
        'date_option_id' => $options[0]->id,
        'status' => AvailabilityStatus::YES->value,
    ])->assertRedirect();

    $this->post(route('events.availability.update', $event), [
        'date_option_id' => $options[1]->id,
        'status' => AvailabilityStatus::NO->value,
    ])->assertRedirect();

    $this->post(route('events.availability.update', $event), [
        'date_option_id' => $options[2]->id,
        'status' => AvailabilityStatus::MAYBE->value,
    ])->assertRedirect();

    $this->assertDatabaseHas('availabilities', [
        'date_option_id' => $options[0]->id,
        'user_id' => $user->id,
        'status' => AvailabilityStatus::YES->value,
    ]);
    $this->assertDatabaseHas('availabilities', [
        'date_option_id' => $options[1]->id,
        'user_id' => $user->id,
        'status' => AvailabilityStatus::NO->value,
    ]);
    $this->assertDatabaseHas('availabilities', [
        'date_option_id' => $options[2]->id,
        'user_id' => $user->id,
        'status' => AvailabilityStatus::MAYBE->value,
    ]);
});
