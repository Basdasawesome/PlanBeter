<?php

namespace App\Http\Requests;

use App\RecurrenceType;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateEventRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user()->can('update', $this->event);
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
            'group_id' => ['nullable', 'exists:groups,id'],
            'recurrence_type' => ['nullable', 'string', Rule::in(RecurrenceType::cases())],
            'recurrence_ends_at' => ['nullable', 'date:Y-m-d'],
            'date_options' => ['sometimes', 'array'],
            'date_options.*.date' => ['required', 'date:Y-m-d'],
            'date_options.*.starts_at' => ['nullable', 'date_format:H:i'],
            'date_options.*.ends_at' => ['nullable', 'date_format:H:i', 'after:date_options.*.starts_at'],
            'date_options.*.deleted' => ['nullable', 'boolean'],
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
