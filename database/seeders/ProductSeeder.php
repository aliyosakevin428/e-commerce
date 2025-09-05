<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;
use Spatie\Permission\Models\Permission;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        Product::factory()->count(10)->create();

        // uncommand archived, restore and force delete if Product model has SoftDeletes
        $permissions = [
            "menu product",
            "index product",
            "show product",
            "create product",
            "update product",
            "delete product",
            //"archived product",
            //"restore product",
            //"force delete product",
        ];

        foreach ($permissions as $permit) {
            Permission::updateOrCreate([
                'group' => "product",
                'name' => $permit,
            ]);
        }
    }
}
