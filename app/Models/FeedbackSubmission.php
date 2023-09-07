<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FeedbackSubmission extends Model
{
    use HasFactory;
    protected $primaryKey=['roll_num','subject_code'];
    protected $keyType = 'string';
    public $incrementing = false;
    public $timestamps=false;
}
