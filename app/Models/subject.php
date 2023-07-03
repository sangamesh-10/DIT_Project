<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class subject extends Model
{
    use HasFactory;
    protected $primaryKey='subject_code';
    protected $keyType = 'string';
    public $timestamps=false;
    public function getIncrementing()
    {
        return false;
    }
}
