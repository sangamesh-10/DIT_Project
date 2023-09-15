<?php

namespace App\Http\Controllers;

use Illuminate\Database\QueryException;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use App\Models\subject;
use App\Models\assign_faculty;
use App\Models\faculty;

class SubjectsController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:faculty-api');
        $this->middleware('auth:admin-api');
    }
    public function add(Request $req)
    {
        $validationRules=[
            'subject_code' => ['required', 'custom_subject_code'],
            'subject_name' =>'string|max:255',
            'L'=>'numeric|digits:1',
            'P'=>'numeric|digits:1',
            'C'=>'numeric|digits:1',
        ];
        $validator=Validator::make($req->all(),$validationRules);

            if($validator->fails()){
                return response()->json(['errors'=>$validator->errors()],422);
            }

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
    $validationRules=[
        'subjectCode' => ['custom_subject_code'],
        'facultyID' => 'regex:/^S[0-3][0-9][1-9]$/',

    ];
    $validator=Validator::make($req->all(),$validationRules);

        if($validator->fails()){
            return response()->json(['errors'=>$validator->errors()],422);
        }
        $facultyID = $req->input('facultyID');
        $subjectCode = $req->input('subjectCode');
        $assignmentsCount = assign_faculty::where('faculty_id', $facultyID)->count();

        if ($assignmentsCount >= 3) {
            return response()->json(['errors' => ['facultyID' => 'The faculty is already assigned to 3 subjects.']], 422);
        }
        try{
        $object = new assign_faculty;
        $object->subject_code = $req->input('subjectCode');
        $object->faculty_id = $req->input("facultyID");
        $object->save();
       return response()->json($object);
        }
        catch (QueryException $e) {
        // Check if it's an integrity constraint violation for subject code
        if ($e->getCode() === '23000') {
            return response()->json(['errors' => ['subjectCode' => 'This subject code is already assigned.']], 422);
        } else {
            // Handle other database-related errors
            return response()->json(['errors' => ['database' => 'Database error']], 500);
        }
    }
}

    public function getAssignedFaculty()
    {
        $object = assign_faculty::all();
        return response()->json($object);
    }
     public function deleteAssignment(Request $req)
     {
        $validationRules=[
            'subjectCode' => ['required', 'custom_subject_code'],
        ];
        $validator=Validator::make($req->all(),$validationRules);

            if($validator->fails()){
                return response()->json(['errors'=>$validator->errors()],422);
            }

        $subject_code=$req->input('subjectCode');
        $object=assign_faculty::where('subject_code',$subject_code)->first();
        if(!$object)
        {
            return response()->json(['errors' => ['subjectCode' => 'Subject does not exist']], 422);
        }
        if($object->delete()){
        return response()->json('true');}
     }
     public function updateAssignment(Request $req)
     {
        $validationRules=[
            'subjectCode' => ['required', 'custom_subject_code'],
            'facultyID' => 'regex:/^S[0-3][0-9][1-9]$/',
        ];
        $validator=Validator::make($req->all(),$validationRules);

            if($validator->fails()){
                return response()->json(['errors'=>$validator->errors()],422);
            }

        $subject_code=$req->input("subjectCode");
        $object=assign_faculty::where('subject_code',$subject_code)->first();
        if(!$object)
        {
            return response()->json(["message"=>"Record not found"]);
        }
        $object->faculty_id=$req->input("facultyID");
        if($object->save()){
        return response()->json('true');}
     }
   public function facultySubjects(Request $req){
        //$faculty_id = $req->query('faculty_id');
        $faculty_id=auth()->user()->faculty_id;
        $subjects = assign_faculty::where('faculty_id',$faculty_id)->pluck('subject_code');
        return response()->json($subjects);
     }
}
