<?php

namespace App\Http\Controllers;

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
            Availability::where('date_option_id', $request->validated('date_option_id'))->where('user_id', $user->id)->delete();

            return redirect()->route('events.show', $event)->with('success', 'Availability removed');
        }

        Availability::updateOrInsert(
            [
                'date_option_id' => $request->validated('date_option_id'),
                'user_id' => $user->id,
            ],
            [
                'status' => $request->validated('status'),
            ]
        );

        return redirect()->route('events.show', $event)->with('success', 'Availability saved');
    }
}
