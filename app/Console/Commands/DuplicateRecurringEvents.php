<?php

namespace App\Console\Commands;

use App\RecurrenceType;
use App\Services\DuplicateRecurringEvent;
use Illuminate\Console\Command;

class DuplicateRecurringEvents extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'events:duplicate-recurring';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Duplicate recurring daily events';

    /**
     * Execute the console command.
     */
    public function handle(DuplicateRecurringEvent $duplicateRecurringEvent): int
    {
        foreach (RecurrenceType::cases() as $recurrenceType) {
            $result = $duplicateRecurringEvent->handle($recurrenceType);
            $this->info("Duplicated {$result['created']} {$recurrenceType->value} recurring event(s). Skipped {$result['skipped']} {$recurrenceType->value} recurring event(s).");
        }

        return self::SUCCESS;
    }
}
