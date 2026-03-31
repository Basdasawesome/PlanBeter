<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Group;
use App\Models\DateOption;
use App\Models\Availability;
use App\Models\Reminder;
use App\Models\EventLog;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Event extends Model
{
    /** @use HasFactory<\Database\Factories\EventFactory> */
    use HasFactory;

    protected $fillable = [
        'group_id',
        'created_by',
        'title',
        'description',
        'is_recurring',
        'recurrence_type',
        'recurrence_ends_at',
        'is_confirmed',
        'selected_id',
    ];

    protected $casts = [
        'recurrence_ends_at' => 'date:Y-m-d',
        'is_confirmed' => 'boolean',
        'is_recurring' => 'boolean',
    ];

    // public function group(): BelongsTo
    // {
    //     return $this->belongsTo(Group::class, 'group_id');
    // }

    public function createdBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function selected(): BelongsTo
    {
        return $this->belongsTo(DateOption::class, 'selected_id');
    }

    public function dateOptions(): HasMany
    {
        return $this->hasMany(DateOption::class, 'event_id');
    }

    public function availabilities(): HasMany
    {
        return $this->hasMany(Availability::class, 'date_option_id');
    }

    // public function reminders(): HasMany
    // {
    //     return $this->hasMany(Reminder::class, 'event_id');
    // }

    // public function eventLogs(): HasMany
    // {
    //     return $this->hasMany(EventLog::class, 'event_id');
    // }
}
