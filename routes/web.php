<?php

use App\Http\Controllers\AvailabilityController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\GroupController;
use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;

Route::inertia('/', 'welcome', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('home');

Route::get('/share/{event:public_id}', [EventController::class, 'show'])->name('events.share');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');

    Route::controller(EventController::class)->name('events.')->prefix('events')->group(function () {
        Route::get('/', 'index')->name('index');
        Route::get('/create', 'create')->name('create');
        Route::post('/store', 'store')->name('store');
        Route::prefix('{event}')->group(function () {
            Route::post('/share', [EventController::class, 'share'])->name('share.create');
            Route::get('/', 'show')->name('show');
            Route::put('/', 'update')->name('update');
            Route::get('/edit', 'edit')->name('edit');
            Route::get('/overview', 'overview')->name('overview');
            Route::post('/availability/update', [AvailabilityController::class, 'update'])->name('availability.update');
        });
    });

    Route::controller(GroupController::class)->name('groups.')->prefix('groups')->group(function () {
        Route::get('/', 'index')->name('index');
        Route::get('/create', 'create')->name('create');
        Route::post('/store', 'store')->name('store');
        Route::prefix('{group}')->group(function () {
            Route::get('/', 'show')->name('show');
            Route::get('/edit', 'edit')->name('edit');
        });
    });
});

require __DIR__.'/settings.php';
