<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class faculty_login extends Model
{
    protected $table = 'faculty_logins';
    protected $primaryKey='faculty_id';
    public $timestamps=false;

    use HasFactory;
}
