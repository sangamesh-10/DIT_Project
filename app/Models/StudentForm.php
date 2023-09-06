<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StudentForm extends Model
{
    public $table="student_forms";
    use HasFactory;
    protected $primaryKey=['form_id','form_name'];
    protected $keyType = 'string';
    public $incrementing = false;
    public $timestamps=false;

}
