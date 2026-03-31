<?php

namespace App;

enum AvailabilityStatus: string
{
    case YES = 'yes';
    case MAYBE = 'maybe';
    case NO = 'no';

    public function label(): string
    {
        return match ($this) {
            self::YES => 'Yes',
            self::MAYBE => 'Maybe',
            self::NO => 'No',
        };
    }
}
