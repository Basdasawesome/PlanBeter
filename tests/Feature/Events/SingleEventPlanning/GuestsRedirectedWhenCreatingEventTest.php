<?php

test('#3: guests are redirected to login when creating an event', function () {
    $this->post(route('events.store'), [
        'title' => 'test event',
        'description' => null,
        'group_id' => null,
        'recurrence_type' => null,
        'date_options' => [
            ['date' => planningFutureDate(1)],
        ],
    ])->assertRedirect(route('login'));
});
