<x-mail::message>
# Je bent uitgenodigd om deel te nemen aan een groep

Je bent uitgenodigd om deel te nemen aan de groep {{$groupName}}

<x-mail::button :url="route('groups.register', $email)">
Deelnemen
</x-mail::button>

Thanks,<br>
{{ config('app.name') }}
</x-mail::message> 
