<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateTransactionRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'courier_id' => 'nullable',
            'description' => 'nullable|string|max:255',
            'paid' => 'nullable|boolean',
            'status' => 'nullable|string|max:255',
        ];
    }
}
