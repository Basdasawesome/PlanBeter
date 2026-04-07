<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreEventRequest extends FormRequest
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
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'date_options' => ['required', 'array', 'min:1'],
            'date_options.*.date' => ['required', 'date:Y-m-d'],
            'date_options.*.starts_at' => ['nullable', 'date_format:H:i'],
            'date_options.*.ends_at' => ['nullable', 'date_format:H:i', 'after:date_options.*.starts_at'],
        ];
    }

    public function attributes(): array
    {
        return [
            'date_options.*.starts_at' => 'Begin tijd',
            'date_options.*.ends_at' => 'Eind tijd',
        ];
    }
}
