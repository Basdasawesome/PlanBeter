<?php

use App\GroupRole;
use App\Models\Event;
use App\Models\User;

test('#11: participant without owner or moderator rights cannot change dates', function () {
    $owner = User::factory()->create();
    $member = User::factory()->create();
    $group = eventTestGroup();

    $owner->groups()->attach($group->id, ['role' => GroupRole::OWNER->value, 'invited' => false]);
    $member->groups()->attach($group->id, ['role' => GroupRole::MEMBER->value, 'invited' => false]);

    $this->actingAs($owner);

    $this->post(route('events.store'), [
        'title' => 'Alleen eigenaar',
        'description' => null,
        'group_id' => $group->id,
        'recurrence_type' => null,
        'date_options' => [
            ['date' => planningFutureDate(2)],
        ],
    ])->assertRedirect();

    $event = Event::query()->where('title', 'Alleen eigenaar')->firstOrFail();

    $this->actingAs($member)
        ->put(route('events.update', $event), [
            'title' => 'Gehackt',
            'description' => null,
            'group_id' => $group->id,
            'recurrence_type' => null,
            'date_options' => [
                ['date' => planningFutureDate(10)],
            ],
        ])
        ->assertForbidden();
});
