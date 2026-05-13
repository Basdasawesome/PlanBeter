<?php

use App\Models\User;

test('#2: creating an event without title fails validation', function () {
    $user = User::factory()->create();

    $this->actingAs($user);

    $this->post(route('events.store'), [
        'title' => '',
        'description' => null,
        'group_id' => null,
        'recurrence_type' => null,
        'date_options' => [
            ['date' => planningFutureDate(1)],
        ],
    ])->assertSessionHasErrors('title');
});
