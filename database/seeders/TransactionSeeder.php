<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Transaction;
use Spatie\Permission\Models\Permission;

class TransactionSeeder extends Seeder
{
    public function run(): void
    {
        Transaction::factory()->count(10)->create();

        // uncommand archived, restore and force delete if Transaction model has SoftDeletes
        $permissions = [
            "menu transaction",
            "index transaction",
            "show transaction",
            "create transaction",
            "update transaction",
            "delete transaction",
            //"archived transaction",
            //"restore transaction",
            //"force delete transaction",
        ];

        foreach ($permissions as $permit) {
            Permission::updateOrCreate([
                'group' => "transaction",
                'name' => $permit,
            ]);
        }
    }
}
