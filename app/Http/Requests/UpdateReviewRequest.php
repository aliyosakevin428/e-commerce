<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateReviewRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'transaction_id' => 'nullable',
            'user_id' => 'nullable',
            'rating' => 'required|numeric',
            'comment' => 'required|string',
        ];
    }
}
