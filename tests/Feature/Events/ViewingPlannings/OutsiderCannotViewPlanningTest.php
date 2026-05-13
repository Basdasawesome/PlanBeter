<?php

use App\GroupRole;
use App\Models\Event;
use App\Models\User;

test('#5: user cannot view a planning for a group they are not part of', function () {
    $owner = User::factory()->create();
    $outsider = User::factory()->create();
    $group = eventTestGroup();

    $owner->groups()->attach($group->id, ['role' => GroupRole::OWNER->value, 'invited' => false]);

    $this->actingAs($owner);

    $this->post(route('events.store'), [
        'title' => 'test event',
        'description' => null,
        'group_id' => $group->id,
        'recurrence_type' => null,
        'date_options' => [
            ['date' => planningFutureDate(2)],
        ],
    ])->assertRedirect();

    $event = Event::where('title', 'test event')->firstOrFail();

    $this->actingAs($outsider)
        ->get(route('events.show', $event))
        ->assertForbidden();
});
