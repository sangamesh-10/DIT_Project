<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FeedbackQuestion extends Model
{
    use HasFactory;
    protected $primaryKey='question_name';
    protected $keyType = 'string';
    public $incrementing = false;
    public $timestamps=false;
}
