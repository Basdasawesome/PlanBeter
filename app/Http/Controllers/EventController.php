<?php

namespace App\Http\Controllers;

use App\Events\EventEditEvent;
use App\Http\Requests\JoinRequest;
use App\Http\Requests\StoreEventRequest;
use App\Http\Requests\UpdateEventRequest;
use App\Models\Availability;
use App\Models\Event;
use App\Models\User;
use App\RecurrenceType;
use Carbon\Carbon;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class EventController extends Controller
{
    use AuthorizesRequests;

    public function index(Request $request): Response
    {
        $availability = Availability::first();

        $user = $request->user();

        $events = Event::with(['createdBy', 'selected'])
            ->where('created_by', $user->id)
            ->orWhereHas('dateOptions.availabilities', function ($q) use ($user) {
                $q->where('user_id', $user->id);
            })
            ->latest()
            ->get();
        $events->each(function (Event $event) {
            $event->fristOption = $event->dateOptions->sortBy('date')->first();
            $event->lastOption = $event->dateOptions->sortByDesc('date')->first();
        });

        return Inertia::render('events/index', compact('events'));
    }

    public function create(): Response
    {
        $groups = request()->user()->groups()->get() ?? [];
        $recurrenceTypes = RecurrenceType::cases();

        return Inertia::render('events/create', compact('groups', 'recurrenceTypes'));
    }

    public function store(StoreEventRequest $request): RedirectResponse
    {
        $user = $request->user();
        $recurrenceType = $request->validated('recurrence_type');

        $event = Event::create([
            'title' => $request->validated('title'),
            'description' => $request->validated('description'),
            'created_by' => $user->id,
            'group_id' => $request->validated('group_id'),
            'recurrence_type' => $recurrenceType,
            'recurrence_ends_at' => $recurrenceType ? $request->validated('recurrence_ends_at') : null,
            'last_duplicated_at' => $recurrenceType ? Carbon::now()->format('Y-m-d') : null,
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
        $this->authorize('view', $event);
        $event->load(['dateOptions.availabilities.user', 'createdBy']);

        return Inertia::render('events/show', [
            'event' => $event,
            'guestId' => session('user_id'),
            'guestName' => session('name'),
        ]);
    }

    public function edit(Event $event): Response
    {
        $groups = request()->user()->groups()->get() ?? [];
        $recurrenceTypes = RecurrenceType::cases();
        $event->load(['dateOptions']);

        return Inertia::render('events/edit', compact('event', 'groups', 'recurrenceTypes'));
    }

    public function update(UpdateEventRequest $request, Event $event): RedirectResponse
    {
        $validated = $request->validated();
        $recurrenceType = $validated['recurrence_type'] ?? null;
        $shouldResetLastDuplicated = $event->recurrence_type !== $recurrenceType
            || $event->recurrence_ends_at !== ($validated['recurrence_ends_at'] ?? null);

        $event->update([
            'title' => $validated['title'],
            'description' => $validated['description'] ?? null,
            'group_id' => $validated['group_id'],
            'recurrence_type' => $recurrenceType,
            'recurrence_ends_at' => $recurrenceType ? ($validated['recurrence_ends_at'] ?? null) : null,
            'recurrence_last_duplicated_at' => $recurrenceType ? $event->recurrence_last_duplicated_at : null,
        ]);

        if (isset($validated['date_options'])) {
            $shouldResetLastDuplicated = true;
            foreach ($validated['date_options'] as $option) {
                if ($option['deleted'] ?? false) {
                    $event->dateOptions()->where('date', Carbon::parse($option['date'])->format('Y-m-d'))->delete();
                } else {
                    $event->dateOptions()->updateOrCreate(
                        ['date' => Carbon::parse($option['date'])->format('Y-m-d')],
                        ['starts_at' => $option['starts_at'] ?? null, 'ends_at' => $option['ends_at'] ?? null]
                    );
                }
            }
        }

        if ($recurrenceType && $shouldResetLastDuplicated) {
            $event->update(['recurrence_last_duplicated_at' => null]);
        }

        event(new EventEditEvent($event));

        return redirect()->route('events.show', $event)->with('success', 'Event updated successfully');
    }

    public function destroy(Event $event): RedirectResponse
    {
        $this->authorize('delete', $event);

        $event->delete();

        return redirect()->route('events.index')->with('success', 'Event deleted successfully');
    }

    public function share(Event $event): RedirectResponse
    {
        $this->authorize('update', $event);

        if (! $event->public_id) {
            $event->public_id = Str::uuid();
            $event->save();
        }

        return redirect()->route('events.show', $event)->with('success', 'Created share link successfully');
    }

    public function overview(Event $event): RedirectResponse | Response
    {
        $this->authorize('view', $event);
        $event->load(['dateOptions.availabilities.user', 'createdBy']);

        if (!Auth::check() && !session('user_id')) {
            return redirect()->route('events.guest.show', $event);
        }

        return Inertia::render('events/overview', compact('event'));
    }

    public function join(JoinRequest $request, Event $event): RedirectResponse
    {
        $validated = $request->validated();

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
        ]);

        session(['user_id' => $user->id, 'name' => $validated['name']]);

        return redirect()->route('events.guest.show', $event)->with('success', 'Joined event successfully');
    }
}
