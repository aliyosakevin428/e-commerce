<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;



class Courier extends Model 
{
    use HasFactory;
    
    

    //protected $table = 'couriers';

    /*
    protected $fillable = [
        'name'
    ];
    */

    protected $guarded = [
        'id',
        'created_at',
        'updated_at',
    ];

    
}
