<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\subject;
use App\Models\assign_faculty;
use App\Models\faculty;

class SubjectsController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:faculty-api');
    }
    public function add(Request $req)
    {
        $object = new subject;
        $object->subject_code = $req->input('subject_code');
        $object->subject_name = $req->input('subject_name');
        $object->L = $req->input('L');
        $object->P = $req->input('P');
        $object->C = $req->input('C');
        $object->save();
        return response()->json($object);

    }
    public function get(Request $req)
    {
        $subjects = subject::all();
        return response()->json($subjects);
    }
    public function assignFaculty(Request $req)
    {
        $object = new assign_faculty;
        $object->subject_code = $req->input('subjectCode');
        $object->faculty_id = $req->input("facultyID");
        $object->save();
        return response()->json($object);
    }
    public function getAssignedFaculty()
    {
        $object = assign_faculty::all();
        return response()->json($object);
    }
     public function deleteAssignment(Request $req)
     {
        $subject_code=$req->input('subjectCode');
        $faculty_id=$req->input("facultyID");
        $object=assign_faculty::where('subject_code',$subject_code)->first();
        if(!$object)
        {
            return response()->json(["message"=>"Record not found"]);
        }
        $object->delete();
        return response()->json(['message'=>'record deleted']);
     }
     public function updateAssignment(Request $req)
     {
        $subject_code=$req->input("subjectCode");
        $object=assign_faculty::where('subject_code',$subject_code)->first();
        if(!$object)
        {
            return response()->json(["message"=>"Record not found"]);
        }
        $object->faculty_id=$req->input("facultyID");
        $object->save();
        return response()->json(['message'=>'record updated']);
     }

     public function facultySubjects(Request $req){
        $faculty_id = $req->query('faculty_id');
        $subjects = assign_faculty::where('faculty_id',$faculty_id)->pluck('subject_code');
        return response()->json($subjects);
     }
}
