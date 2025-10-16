<?php

namespace Database\Factories;

use App\Models\Courier;
use App\Models\Transaction;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class TransactionFactory extends Factory
{
    protected $model = Transaction::class;

    public function definition(): array
    {
        return [
            'user_id' => User::pluck('id')->random(),
            'courier_id' => Courier::pluck('id')->random(),
            'items' => null,
            'description' => fake()->sentence(),
            'status' => fake()->randomElement(Transaction::$statusLists),
            'total_price' => fake()->randomNumber(),
            'paid' => fake()->boolean(),
        ];
    }
}
