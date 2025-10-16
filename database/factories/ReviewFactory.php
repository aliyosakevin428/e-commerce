<?php

namespace Database\Factories;

use App\Models\Review;
use Illuminate\Database\Eloquent\Factories\Factory;

class ReviewFactory extends Factory
{
    protected $model = Review::class;

    public function definition(): array
    {
        return [
            'transaction_id' => fake()->word(),
            'user_id' => fake()->word(),
            'rating' => fake()->randomNumber(),
            'comment' => fake()->paragraph(),
        ];
    }
}
