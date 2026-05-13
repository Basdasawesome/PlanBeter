<?php

use App\GroupRole;
use App\Models\Event;
use App\Models\User;
use App\RecurrenceType;

test('#12: creating a monthly recurring event stores recurrence', function () {
    $user = User::factory()->create();
    $group = eventTestGroup();
    $user->groups()->attach($group->id, ['role' => GroupRole::MEMBER->value, 'invited' => false]);

    $this->actingAs($user);

    $this->post(route('events.store'), [
        'title' => 'Maandelijkse borrel',
        'description' => null,
        'group_id' => $group->id,
        'recurrence_type' => RecurrenceType::MONTHLY->value,
        'recurrence_ends_at' => planningFutureDate(365),
        'date_options' => [
            ['date' => planningFutureDate(2)],
        ],
    ])->assertRedirect();

    $event = Event::query()->where('title', 'Maandelijkse borrel')->firstOrFail();

    expect($event->recurrence_type)->toBe(RecurrenceType::MONTHLY)
        ->and($event->group_id)->toBe($group->id);
});
