<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class BulkDeleteCourierRequest extends FormRequest
{
    /**
     * Determine if the courier is authorized to make this request.
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
            'courier_ids' => 'required|array',
            'courier_ids.*' => 'exists:couriers,id',
        ];
    }
}
