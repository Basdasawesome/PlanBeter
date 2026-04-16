<?php

namespace App\Services;

use App\Models\Event;
use App\RecurrenceType;
use Carbon\CarbonImmutable;

class DuplicateRecurringEvent
{
    /**
     * @return array{created:int, skipped:int}
     */
    public function handle(RecurrenceType $recurrenceType): array
    {
        $events = Event::query()
            ->where('recurrence_type', $recurrenceType->value)
            ->with(['selected', 'dateOptions'])
            ->get();

        $createdCount = 0;
        $skippedCount = 0;

        foreach ($events as $event) {
            if ($this->duplicateIfNeeded($event, $recurrenceType)) {
                $createdCount++;
            } else {
                $skippedCount++;
            }
        }

        return [
            'created' => $createdCount,
            'skipped' => $skippedCount,
        ];
    }

    private function duplicateIfNeeded(Event $event, RecurrenceType $recurrenceType): bool
    {
        $today = CarbonImmutable::today()->startOfDay();

        if ($event->recurrence_type !== $recurrenceType) {
            return false;
        }

        if ($event->recurrence_ends_at && $today->isAfter($event->recurrence_ends_at->toImmutable())) {
            $event->update(['recurrence_type' => null]);

            return false;
        }

        if ($event->recurrence_last_duplicated_at && $event->recurrence_last_duplicated_at->toImmutable()->isSameDay($today)) {
            return false;
        }

        if ($event->recurrence_last_duplicated_at && ! $this->shiftDate($event->recurrence_last_duplicated_at?->toImmutable(), $recurrenceType, $event->recurring_events_count + 1)->isSameDay($today)) {
            return false;
        }

        $newEvent = Event::create([
            'title' => $event->title,
            'description' => $event->description,
            'group_id' => $event->group_id,
            'created_by' => $event->created_by,
        ]);

        foreach ($event->dateOptions as $dateOption) {
            $newEvent->dateOptions()->create([
                'date' => $this->shiftDate($dateOption->date->toImmutable(), $recurrenceType, $event->recurring_events_count + 1)->format('Y-m-d'),
                'starts_at' => $dateOption->starts_at?->format('H:i'),
                'ends_at' => $dateOption->ends_at?->format('H:i'),
            ]);
        }

        $event->update(['recurrence_last_duplicated_at' => $today->format('Y-m-d'), 'recurring_events_count' => $event->recurring_events_count + 1]);

        return true;
    }

    private function shiftDate(CarbonImmutable $date, RecurrenceType $recurrenceType, int $count): CarbonImmutable
    {
        return match ($recurrenceType) {
            RecurrenceType::DAILY => $date->addDays($count),
            RecurrenceType::WEEKLY => $date->addWeeks($count),
            RecurrenceType::MONTHLY => $date->addMonths($count),
            RecurrenceType::YEARLY => $date->addYears($count),
        };
    }
}
