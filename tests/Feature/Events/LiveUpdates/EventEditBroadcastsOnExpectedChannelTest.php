<?php

use App\Events\EventEditEvent;
use App\Models\Event;
use App\Models\User;
use Illuminate\Support\Facades\Event as EventFacade;

test('#14: editing event dates dispatches the broadcast event on the expected channel', function () {
    $owner = User::factory()->create();

    $this->actingAs($owner);

    $this->post(route('events.store'), [
        'title' => 'Live update',
        'description' => null,
        'group_id' => null,
        'recurrence_type' => null,
        'date_options' => [
            ['date' => planningFutureDate(2)],
        ],
    ])->assertRedirect();

    $event = Event::query()->where('title', 'Live update')->firstOrFail();
    $original = planningFutureDate(2);
    $newDate = planningFutureDate(12);

    EventFacade::fake();

    $this->put(route('events.update', $event), [
        'title' => 'Live update',
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
                'date' => $original,
                'deleted' => true,
            ],
        ],
    ])->assertRedirect();

    EventFacade::assertDispatched(EventEditEvent::class, function (EventEditEvent $e) use ($event) {
        return $e->event->is($event);
    });

    $broadcast = new EventEditEvent($event->fresh());
    $channelNames = array_map(fn ($c) => $c->name, $broadcast->broadcastOn());

    expect($channelNames)->toContain('event.'.$event->id);
});
