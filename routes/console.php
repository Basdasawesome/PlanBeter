<?php

use Illuminate\Support\Facades\Schedule;

Schedule::command('events:duplicate-recurring')->daily();
