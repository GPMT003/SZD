<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class OutDoc extends Model
{
    protected $table = 'outdocuments';
    
    protected $fillable = [
        'documentId',
        'date',
        'pid',
        'mid',
        'comment',
    ];
}
