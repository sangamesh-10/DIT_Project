<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\faculty;

class facultyRegController extends Controller
{
    function facultyReg(Request $req)
    {
    $faculty = new faculty;
    $faculty->faculty_id=$req->fid;
    $faculty->name=$req->name;
    $faculty->email=$req->email;
    $faculty->alt_email=$req->altemail;
    $faculty->phone_num=$req->phno;
    $faculty->aadhar_num=$req->aadharno;
    $faculty->designation=$req->desig;
    $faculty->experience=$req->exp;
    $result=$faculty->save();
    if($result)
    {
        return['result'=>'data has been saved'];
    }
    else
    {
        return['result'=>'operation failed'];
    }

    }
}
