<?php

namespace App\Models;

use App\AvailabilityStatus;
use Database\Factories\AvailabilityFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOneThrough;

class Availability extends Model
{
    /** @use HasFactory<AvailabilityFactory> */
    use HasFactory;

    protected $fillable = [
        'date_option_id',
        'user_id',
        'status',
    ];

    protected $casts = [
        'status' => AvailabilityStatus::class,
    ];

    public function dateOption(): BelongsTo
    {
        return $this->belongsTo(DateOption::class, 'date_option_id');
    }

    public function event(): HasOneThrough
    {
        return $this->hasOneThrough(Event::class, DateOption::class, 'id', 'id', 'date_option_id', 'event_id');
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
