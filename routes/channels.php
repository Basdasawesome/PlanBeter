<?php

use Illuminate\Support\Facades\Broadcast;

Broadcast::channel('event.{event}', function () {
    return true;
});
