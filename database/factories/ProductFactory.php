<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProductFactory extends Factory
{
    protected $model = Product::class;

    public function definition(): array
    {
        return [
            'name' => fake()->sentence(),
            'description' => fake()->paragraph(),
            'category_id' => Category::pluck('id')->random(),
            'price' => fake()->randomNumber(),
            'stock' => fake()->randomNumber(),
        ];
    }
}
