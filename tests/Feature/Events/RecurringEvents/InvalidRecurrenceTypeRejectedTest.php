<?php

use App\GroupRole;
use App\Models\User;

test('#13: invalid recurrence type is rejected', function () {
    $user = User::factory()->create();
    $group = eventTestGroup();
    $user->groups()->attach($group->id, ['role' => GroupRole::MEMBER->value, 'invited' => false]);

    $this->actingAs($user);

    $this->post(route('events.store'), [
        'title' => 'Ongeldige herhaling',
        'description' => null,
        'group_id' => $group->id,
        'recurrence_type' => 'elk kwartaal',
        'date_options' => [
            ['date' => planningFutureDate(2)],
        ],
    ])->assertSessionHasErrors('recurrence_type');
});
