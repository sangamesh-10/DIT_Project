<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class enrolled_student extends Model
{
    use HasFactory;
    protected $primaryKey=['year','code'];
    protected $keyType =[ 'integer','string',];
    public $timestamps=false;
    public function getIncrementing()
    {
        return false;
    }
}
