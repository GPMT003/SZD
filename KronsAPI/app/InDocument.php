<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class InDocument extends Model
{
    protected $table = 'indocuments';
    
    protected $fillable = [
        'documentId',  
        'date',        
        'pid',         
    ];
}
