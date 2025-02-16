<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Move extends Model
{
        protected $table = 'moves';

        protected $fillable = [
            'moveType', 
            'accountNumber',
            'isBV'
        ];
    
        protected $dates = ['created_at', 'updated_at'];
}
