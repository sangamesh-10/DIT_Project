<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\enrolled_student;
use App\Models\re_register;

class SemesterController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:admin-api');
    }
    public function add(Request $req)
    {
        $object = new enrolled_student;
        $object->year = $req->input('year');
        $object->code = $req->input('code');
        $object->semester = $req->input('semester');
        if($object->save()){
        return response()->json('true');
        }
    }
    public function get()
    {
        $ans = enrolled_student::all();
        return response()->json($ans);
    }
    public function update(Request $req)
    {
        $year = $req->input('year');
        $code = $req->input('code');

        $object = enrolled_student::where('year', $year)->where('code', $code)->first();
        //return response()->json($object);

        if (!$object) {
            return response()->json(['result' => 'Record not found'], 404);
        }

        $object->semester = $req->input('semester');
        $result = $object->save();

        if ($result) {
            return response()->json('true');
        } else {
            return response()->json(['result' => 'Value not updated'], 500);
        }
    }

    public function delete(Request $req)
    {
        $year = $req->input('year');
        $code = $req->input('code');

        $object = enrolled_student::where('year', $year)->where('code', $code)->first();

        if (!$object) {
            return response()->json(['result' => 'Record not found'], 404);
        }

        if($object->delete()){
        return response()->json('true');}
    }
    public function addReRegister(Request $req)
    {
        $object=new re_register;
        $object->roll_num=$req->input('rollNumber');
        $object->subject_code=$req->input('subjectCode');
        if($object->save()){
        return response()->json('true');}
        else
        {
            return response()->json('Error');
        }
    }
    public function getReRegister()
    {
        $object=re_register::all();
        return response()->json($object);
    }
    public function deleteReRegister(Request $req)
    {
        $roll_num =$req->input('rollNumber');
        $subject_code=$req->input('subjectCode');
        $object=re_register::where('roll_num',$roll_num)->where('subject_code',$subject_code)->first();
        //return response()->json($object);
        if (!$object) {
            return response()->json(['result' => 'Record not found']);
        }
        if($object->delete()){
        return response()->json('true');
        }
        else
        {
            return response()->json('Error');
        }
    }
}
