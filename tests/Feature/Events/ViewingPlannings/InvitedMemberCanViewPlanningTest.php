<?php

use App\GroupRole;
use App\Models\Event;
use App\Models\User;
use Illuminate\Support\Str;
use Inertia\Testing\AssertableInertia;

test('#4: invited group member can view a planning they belong to', function () {
    $owner = User::factory()->create();
    $member = User::factory()->create();
    $group = eventTestGroup();

    $owner->groups()->attach($group->id, ['role' => GroupRole::OWNER->value, 'invited' => false]);
    $member->groups()->attach($group->id, ['role' => GroupRole::MEMBER->value, 'invited' => true]);

    $this->actingAs($owner);

    $this->post(route('events.store'), [
        'title' => 'Groepsuitje',
        'description' => null,
        'group_id' => $group->id,
        'recurrence_type' => null,
        'date_options' => [
            ['date' => planningFutureDate(2)],
        ],
    ])->assertRedirect();

    $event = Event::where('title', 'Groepsuitje')->firstOrFail();
    $event->fill(['public_id' => (string) Str::uuid()])->save();

    $this->actingAs($member)
        ->get(route('events.show', $event))
        ->assertSuccessful()
        ->assertInertia(fn (AssertableInertia $page) => $page
            ->component('events/show')
            ->where('event.title', 'Groepsuitje')
            ->has('event.date_options.0.date'));
});
