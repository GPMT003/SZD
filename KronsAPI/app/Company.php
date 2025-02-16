<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Company extends Model
{

    protected $table = 'companies'; 

    protected $fillable = [
        'companyName',
        'taxNumber',
        'vatNumber',
        'location',
        'valuationMethod',
    ];


    public $timestamps = true;


    public static function valuationMethods()
    {
        return ['Fifo', 'AverageCost', 'PurchaseCost', 'AccountingCost'];
    }
}
