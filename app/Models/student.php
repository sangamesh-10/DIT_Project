<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class student extends Model
{
    use HasFactory;
    public $timestamps=false;
    protected $primaryKey = 'roll_num';
    protected $keyType = 'string';

    protected $fillable = ['roll_num', 'name', 'email', 'phone_num', 'aadhar_num', 'mother_name', 'father_name', 'parent_num', 'dob', 'permanent_addr', 'present_addr', 'blood_group', 'caste', 'religion'];
}
