<?php

namespace App\Events;

use App\Models\Event;
use App\Models\Availability;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class AttendanceSubmittedEvent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    /**
     * Create a new event instance.
     */
    public function __construct(public Availability $availability) {}

    public function broadcastAs(): string
    {
        return 'attendance.submitted';
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, Channel>
     */
    public function broadcastOn(): array
    {
        return [
            new PrivateChannel('event.'.$this->availability->event->id.'.attendance'),
        ];
    }

    public function broadcastWith(): array
    {
        return [
            'availability' => $this->availability,
        ];
    }
}
