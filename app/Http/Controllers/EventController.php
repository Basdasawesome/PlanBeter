<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreEventRequest;
use App\Models\Event;
use Carbon\Carbon;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class EventController extends Controller
{
    public function index(Request $request): Response
    {
        $user = $request->user();

        $events = Event::with(['createdBy', 'dateOptions'])
            ->where('created_by', $user->id)
            ->orWhereHas('dateOptions.availabilities', function ($q) use ($user) {
                $q->where('user_id', $user->id);
            })
            ->latest()
            ->get();

        return Inertia::render('events/index', compact('events'));
    }

    public function create(): Response
    {
        return Inertia::render('events/create');
    }

    public function store(StoreEventRequest $request): RedirectResponse
    {
        $user = $request->user();

        $event = Event::create([
            'title' => $request->validated('title'),
            'description' => $request->validated('description'),
            'created_by' => $user->id,
        ]);

        foreach ($request->validated('date_options') as $option) {
            $event->dateOptions()->create([
                'date' => Carbon::parse($option['date'])->format('Y-m-d'),
                'starts_at' => $option['starts_at'] ?? null,
                'ends_at' => $option['ends_at'] ?? null,
            ]);
        }

        return redirect()->route('events.show', $event)->with('success', 'Event created successfully');
    }

    public function show(Event $event): Response
    {
        $event->load(['dateOptions.availabilities.user', 'createdBy']);

        return Inertia::render('events/show', compact('event'));
    }

    public function share(Event $event): RedirectResponse
    {
        if (! $event->public_id) {
            $event->public_id = Str::uuid();
            $event->save();
        }

        return redirect()->route('events.show', $event)->with('success', 'Created share link successfully');
    }
}
