<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Std_softcopie extends Model
{
    public $timestamps=false;
    protected $primaryKey = 'roll_num';
    protected $keyType = 'string';
    use HasFactory;
}
