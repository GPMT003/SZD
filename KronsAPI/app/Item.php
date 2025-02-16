<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
    protected $fillable = [
        'accountNumber', 
        'itemNumber', 
        'name', 
        'vatContent', 
        'vtsz', 
        'unit', 
        'purchasePrice',
        'purchased_quantity',      
        'purchased_average_cost',  
        'issued_quantity',         
        'issued_average_cost',     
        'cost' 
    ];
}
