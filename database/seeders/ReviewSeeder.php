<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Review;
use Spatie\Permission\Models\Permission;

class ReviewSeeder extends Seeder
{
    public function run(): void
    {
        // Review::factory()->count(10)->create();

        // uncommand archived, restore and force delete if Review model has SoftDeletes
        $permissions = [
            "menu review",
            "index review",
            "show review",
            "create review",
            "update review",
            "delete review",
            //"archived review",
            //"restore review",
            //"force delete review",
        ];

        foreach ($permissions as $permit) {
            Permission::updateOrCreate([
                'group' => "review",
                'name' => $permit,
            ]);
        }
    }
}
