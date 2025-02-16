<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{

    protected $fillable = [
        'name',
        'start_date',
        'end_date',
        'contract_amount',
        'contractor_name',
        'partner_id',
        'completion_level',
        'planned_phases',
    ];

    protected $casts = [
        'planned_phases' => 'array',  
    ];

    public function partner()
    {
        return $this->belongsTo(Partner::class);
    }
}
