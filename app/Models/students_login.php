<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class students_login extends Model
{
    use HasFactory;
    protected $primaryKey='student_id';
    protected $keyType = 'string';
    public $timestamps=false;
    public function getIncrementing()
    {
        return false;
    }
}
