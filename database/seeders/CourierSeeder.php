<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Courier;
use Spatie\Permission\Models\Permission;

class CourierSeeder extends Seeder
{
    public function run(): void
    {
        Courier::factory()->count(10)->create();

        // uncommand archived, restore and force delete if Courier model has SoftDeletes
        $permissions = [
            "menu courier",
            "index courier",
            "show courier",
            "create courier",
            "update courier",
            "delete courier",
            //"archived courier",
            //"restore courier",
            //"force delete courier",
        ];

        foreach ($permissions as $permit) {
            Permission::updateOrCreate([
                'group' => "courier",
                'name' => $permit,
            ]);
        }
    }
}
