<?php

namespace Database\Factories;

use App\Models\Cart;
use App\Models\Product;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class CartFactory extends Factory
{
    protected $model = Cart::class;

    public function definition(): array
    {
        return [
            'product_id' => Product::pluck('id')->random(),
            'user_id' => User::pluck('id')->random(),
            'qty' => fake()->randomNumber(),
        ];
    }
}
