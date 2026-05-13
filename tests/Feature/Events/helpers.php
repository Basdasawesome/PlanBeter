<?php

use App\Models\Group;

/**
 * Shared helpers for event feature tests (see scenarios).
 */
function planningFutureDate(int $daysFromToday = 2): string
{
    return now()->addDays($daysFromToday)->format('Y-m-d');
}

/**
 * Group factory state is optional in this project; tests always provide a name.
 *
 * @param  array<string, mixed>  $attributes
 */
function eventTestGroup(array $attributes = []): Group
{
    return Group::factory()->create(array_merge([
        'name' => 'Test Group',
    ], $attributes));
}
