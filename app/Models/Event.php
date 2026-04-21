<?php

namespace App\Models;

use App\RecurrenceType;
use Database\Factories\EventFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;

class Event extends Model
{
    /** @use HasFactory<EventFactory> */
    use HasFactory;

    protected $fillable = [
        'public_id',
        'group_id',
        'created_by',
        'title',
        'description',
        'recurrence_type',
        'recurrence_ends_at',
        'recurrence_last_duplicated_at',
        'recurring_events_count',
        'selected_id',
    ];

    protected $casts = [
        'recurrence_ends_at' => 'date:Y-m-d',
        'recurrence_last_duplicated_at' => 'date:Y-m-d',
        'recurrence_type' => RecurrenceType::class,
    ];

    public function group(): BelongsTo
    {
        return $this->belongsTo(Group::class, 'group_id');
    }

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
        return $this->hasMany(DateOption::class, 'event_id')->orderBy('date');
    }

    public function availabilities(): HasManyThrough
    {
        return $this->hasManyThrough(Availability::class, DateOption::class, 'event_id', 'date_option_id', 'id', 'id');
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
