<?php

namespace App;

enum GroupRole: string
{
    case OWNER = 'owner';
    case MODERATOR = 'moderator';
    case MEMBER = 'member';

    public function label(): string
    {
        return match ($this) {
            self::OWNER => 'Owner',
            self::MODERATOR => 'Moderator',
            self::MEMBER => 'Member',
        };
    }
}
