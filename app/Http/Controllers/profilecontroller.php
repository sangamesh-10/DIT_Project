<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\student;
use App\Models\faculty;
use Illuminate\Support\Facades\DB;

class profilecontroller extends Controller
{
    function studentProfile()
    {

        $data= student::where('roll_num','21031F0015')->first();
        return view('pjjrofile',['students'=>$data]);
    }
    function facultyProfile()
    {

        $data= faculty::where('faculty_id','S001')->first();
        return view('facultyProfile',['faculty'=>$data]);
    }
}
