<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\Availability;
use App\Http\Requests\StoreAvailabilityRequest;
use Illuminate\Http\RedirectResponse;

class AvailabilityController extends Controller
{
    public function update(StoreAvailabilityRequest $request, Event $event): RedirectResponse
    {
        $user = $request->user();

        foreach ($request->validated('availabilities') as $availabilityData) {
            Availability::updateOrCreate(
                [
                    'date_option_id' => $availabilityData['date_option_id'],
                    'user_id' => $user->id,
                ],
                [
                    'status' => $availabilityData['status'],
                ]
            );
        }

        return redirect()->route('events.show', $event)->with('success', 'Availability saved!');
    }
}
