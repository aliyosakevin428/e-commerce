<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreTransactionRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'courier_id' => 'required|exists:couriers,id',
            'cart_ids' => 'array',
            'cart_ids.*' => 'exists:carts,id',
            'description' => 'nullable|string|max:255',
        ];
    }
}
