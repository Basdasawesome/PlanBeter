<?php

use App\GroupRole;
use App\Models\Event;
use App\Models\User;

test('#6: guests are redirected to login when viewing a planning', function () {
    $owner = User::factory()->create();
    $group = eventTestGroup();
    $owner->groups()->attach($group->id, ['role' => GroupRole::OWNER->value, 'invited' => false]);

    $this->actingAs($owner);

    $this->post(route('events.store'), [
        'title' => 'Alleen auth',
        'description' => null,
        'group_id' => $group->id,
        'recurrence_type' => null,
        'date_options' => [
            ['date' => planningFutureDate(2)],
        ],
    ])->assertRedirect();

    $event = Event::where('title', 'Alleen auth')->firstOrFail();

    auth()->logout();

    $this->get(route('events.show', $event))
        ->assertRedirect(route('login'));
});
