<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class faculty extends Model
{
    public $table="faculty";
    use HasFactory;
    public $timestamps=false;
    protected $primaryKey='faculty_id';
    protected $keyType = 'string';
}
