<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class re_register extends Model
{
    use HasFactory;
    protected $primaryKey=['roll_num','subject_code'];
    protected $keyType =[ 'string','string',];
    public $timestamps=false;
    public function getIncrementing()
    {
        return false;
    }
}
