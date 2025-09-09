<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Cart;
use Spatie\Permission\Models\Permission;

class CartSeeder extends Seeder
{
    public function run(): void
    {
        Cart::factory()->count(10)->create();

        // uncommand archived, restore and force delete if Cart model has SoftDeletes
        $permissions = [
            "menu cart",
            "index cart",
            "show cart",
            "create cart",
            "update cart",
            "delete cart",
            //"archived cart",
            //"restore cart",
            //"force delete cart",
        ];

        foreach ($permissions as $permit) {
            Permission::updateOrCreate([
                'group' => "cart",
                'name' => $permit,
            ]);
        }
    }
}
