<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class assign_faculty extends Model
{
    use HasFactory;
    public $table='assign_faculty';
    protected $primaryKey='subject_code';
    protected $keyType ='string';
    public $timestamps=false;
    public function getIncrementing()
    {
        return false;
    }
}
