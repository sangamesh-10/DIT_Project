<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FeedbackResponse extends Model
{
    use HasFactory;
    protected $primaryKey=['roll_num','subject_code'];
    protected $keyType = 'string';
    public $incrementing = false;
    public $timestamps=false;
    protected $fillable = ['roll_num','subject_code', 'question_1', 'question_2', 'question_3', 'question_4', 'question_5', 'question_6', 'question_7', 'question_8', 'question_9', 'question_10'];

}
