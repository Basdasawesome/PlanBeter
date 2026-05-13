<?php

use App\GroupRole;
use App\Models\User;
use Inertia\Testing\AssertableInertia;

test('#1: creating a single event with valid data shows it on the overview', function () {
    $user = User::factory()->create();
    $group = eventTestGroup();
    $user->groups()->attach($group->id, ['role' => GroupRole::MEMBER->value, 'invited' => false]);

    $this->actingAs($user);

    $response = $this->post(route('events.store'), [
        'title' => 'Teamuitje',
        'description' => null,
        'group_id' => $group->id,
        'recurrence_type' => null,
        'recurrence_ends_at' => null,
        'date_options' => [
            ['date' => planningFutureDate(2)],
            ['date' => planningFutureDate(3)],
            ['date' => planningFutureDate(4)],
        ],
    ]);

    $response->assertRedirect();

    $this->assertDatabaseHas('events', [
        'title' => 'Teamuitje',
        'group_id' => $group->id,
        'created_by' => $user->id,
    ]);

    $this->get(route('events.index'))
        ->assertSuccessful()
        ->assertInertia(fn (AssertableInertia $page) => $page
            ->component('events/index')
            ->where('events.0.title', 'Teamuitje'));
});
