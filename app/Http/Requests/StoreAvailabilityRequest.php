<?php

namespace App\Http\Requests;

use App\AvailabilityStatus;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
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
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'date_option_id' => ['required', 'exists:date_options,id'],
            'status' => ['nullable', Rule::enum(AvailabilityStatus::class)],
        ];
    }
}
