<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Session;
use Illuminate\Http\Request;
use App\Models\student;
use App\Models\faculty;
use App\Models\sample_sem_assignment;
use Illuminate\Support\Facades\DB;

class profilecontroller extends Controller
{
    function studentProfile()
    {
        $student_id=Session::get('user');

        $data= student::where('roll_num',$student_id)->first();
        $education=sample_sem_assignment::where('roll_num',$student_id)->first();
        return view('profile',['students'=>$data,'education'=>$education]);
    }
    function facultyProfile()
    {

        $data= faculty::where('faculty_id','S001')->first();
        return view('facultyProfile',['faculty'=>$data]);
    }
}
