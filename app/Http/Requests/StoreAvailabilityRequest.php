<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\AvailabilityStatus;
use Illuminate\Validation\Rule;

class StoreAvailabilityRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'availabilities' => ['required', 'array'],
            'availabilities.*.date_option_id' => ['required', 'exists:date_options,id'],
            'availabilities.*.status' => ['required', Rule::enum(AvailabilityStatus::class)],
        ];
    }
}
