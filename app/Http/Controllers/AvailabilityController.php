<?php

namespace App\Http\Controllers;

use App\Events\AttendanceSubmittedEvent;
use App\Http\Requests\StoreAvailabilityRequest;
use App\Models\Availability;
use App\Models\Event;
use Illuminate\Http\RedirectResponse;

class AvailabilityController extends Controller
{
    public function update(StoreAvailabilityRequest $request, Event $event): RedirectResponse
    {
        $user = $request->user();

        if ($request->validated('status') === null) {
            Availability::where('date_option_id', $request->validated('date_option_id'))->where('user_id', $user->id ?? session('user_id'))->delete();

            if ($user) {
                return redirect()->route('events.show', $event)->with('success', 'Availability removed');
            } else {
                return redirect()->route('events.guest.show', $event)->with('success', 'Availability removed');
            }
        }

        $availability = Availability::updateOrCreate(
            [
                'date_option_id' => $request->validated('date_option_id'),
                'user_id' => $user?->id ?? session('user_id'),
            ],
            [
                'status' => $request->validated('status'),
            ]
        );

        event(new AttendanceSubmittedEvent($availability));

        if ($user) {
        return redirect()->route('events.show', $event)->with('success', 'Availability saved');
        } else {
            return redirect()->route('events.guest.show', $event)->with('success', 'Availability saved');
        }
    }
}
