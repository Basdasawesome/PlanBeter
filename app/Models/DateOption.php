<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class DateOption extends Model
{
    /** @use HasFactory<\Database\Factories\DateOptionFactory> */
    use HasFactory;

    protected $fillable = [
        'event_id',
        'date',
        'starts_at',
        'ends_at',
    ];

    protected $casts = [
        'date' => 'date:Y-m-d',
        'starts_at' => 'datetime:H:i',
        'ends_at' => 'datetime:H:i',
    ];

    public function event(): BelongsTo
    {
        return $this->belongsTo(Event::class, 'event_id');
    }

    public function availabilities(): HasMany
    {
        return $this->hasMany(Availability::class, 'date_option_id');
    }
}
