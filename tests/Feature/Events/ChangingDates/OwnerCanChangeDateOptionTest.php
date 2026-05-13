<?php

use App\Models\Event;
use App\Models\User;

test('#10: event owner can change a date option', function () {
    $owner = User::factory()->create();

    $this->actingAs($owner);

    $this->post(route('events.store'), [
        'title' => 'Datum wijzigen',
        'description' => null,
        'group_id' => null,
        'recurrence_type' => null,
        'date_options' => [
            ['date' => planningFutureDate(2)],
        ],
    ])->assertRedirect();

    $event = Event::query()->where('title', 'Datum wijzigen')->firstOrFail();
    $originalDate = planningFutureDate(2);
    $newDate = planningFutureDate(9);

    $this->put(route('events.update', $event), [
        'title' => 'Datum wijzigen',
        'description' => null,
        'group_id' => null,
        'recurrence_type' => null,
        'date_options' => [
            [
                'date' => $newDate,
                'starts_at' => null,
                'ends_at' => null,
            ],
            [
                'date' => $originalDate,
                'deleted' => true,
            ],
        ],
    ])->assertRedirect();

    $this->assertDatabaseMissing('date_options', [
        'event_id' => $event->id,
        'date' => $originalDate,
    ]);
    $this->assertDatabaseHas('date_options', [
        'event_id' => $event->id,
        'date' => $newDate,
    ]);
});
