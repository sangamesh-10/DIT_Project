<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\student;
use Illuminate\Support\Facades\DB;

class profilecontroller extends Controller
{
    function profile(Request $req)
    {

        $student = student::where('roll_num', '21031F0015')->first();
        if($student)
        {
            return $student;
        }
    }
}
