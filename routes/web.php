<?php

use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;
use App\Http\Controllers\EventController;
use App\Http\Controllers\AvailabilityController;

Route::inertia('/', 'welcome', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');

    Route::controller(EventController::class)->name('events.')->prefix('events')->group(function () {
        Route::get('/', 'index')->name('index');
        Route::get('/create', 'create')->name('create');
        Route::post('/store', 'store')->name('store');
        Route::prefix('{event}')->group(function () {
            Route::get('/', 'show')->name('show');
            Route::post('/availability/update', [AvailabilityController::class, 'update'])->name('availability.update');
        });
    });
});

require __DIR__.'/settings.php';
