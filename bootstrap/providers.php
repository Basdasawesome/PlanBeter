<?php

use App\Providers\AppServiceProvider;
use App\Providers\FortifyServiceProvider;
use Illuminate\Broadcasting\BroadcastServiceProvider;

return [
    AppServiceProvider::class,
    BroadcastServiceProvider::class,
    FortifyServiceProvider::class,
];
