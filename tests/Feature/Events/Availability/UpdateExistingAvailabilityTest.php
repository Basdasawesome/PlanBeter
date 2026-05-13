<?php

use App\AvailabilityStatus;
use App\Models\Availability;
use App\Models\Event;
use App\Models\User;

test('#8: user can update existing availability', function () {
    $user = User::factory()->create();

    $this->actingAs($user);

    $this->post(route('events.store'), [
        'title' => 'Update beschikbaarheid',
        'description' => null,
        'group_id' => null,
        'recurrence_type' => null,
        'date_options' => [
            ['date' => planningFutureDate(2)],
        ],
    ])->assertRedirect();

    $event = Event::where('title', 'Update beschikbaarheid')->firstOrFail();
    $option = $event->dateOptions()->firstOrFail();

    $this->post(route('events.availability.update', $event), [
        'date_option_id' => $option->id,
        'status' => AvailabilityStatus::YES->value,
    ])->assertRedirect();

    $this->post(route('events.availability.update', $event), [
        'date_option_id' => $option->id,
        'status' => AvailabilityStatus::NO->value,
    ])->assertRedirect();

    $this->assertDatabaseHas('availabilities', [
        'date_option_id' => $option->id,
        'user_id' => $user->id,
        'status' => AvailabilityStatus::NO->value,
    ]);

    expect(Availability::where('date_option_id', $option->id)->where('user_id', $user->id)->count())->toBe(1);
});
