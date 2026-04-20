<?php

use Illuminate\Support\Facades\Broadcast;

Broadcast::channel('event.{event}.attendance', function () {
    return true;
});
