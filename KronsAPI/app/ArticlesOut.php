<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ArticlesOut extends Model
{
    protected $table = 'articlesout';
    
    protected $fillable = [
        'did',       
        'iid',       
        'price',     
        'fifo',      
        'average',   
        'volume',    
        'comment'
    ];
}
