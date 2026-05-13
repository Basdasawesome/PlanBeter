<?php

use App\Models\Event;
use App\Models\User;

test('#9: invalid availability status is rejected', function () {
    $user = User::factory()->create();

    $this->actingAs($user);

    $this->post(route('events.store'), [
        'title' => 'Status test',
        'description' => null,
        'group_id' => null,
        'recurrence_type' => null,
        'date_options' => [
            ['date' => planningFutureDate(2)],
        ],
    ])->assertRedirect();

    $event = Event::query()->where('title', 'Status test')->firstOrFail();
    $option = $event->dateOptions()->firstOrFail();

    $this->post(route('events.availability.update', $event), [
        'date_option_id' => $option->id,
        'status' => 'probably',
    ])->assertSessionHasErrors('status');
});
