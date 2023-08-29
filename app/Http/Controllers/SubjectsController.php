<?php

namespace App\Http\Controllers;

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
    // $validPrefixes5Chars = ['MC'];
    // $validPrefixes6Chars = ['SE', 'DS', 'CS', 'CN'];

    // $validationRules = [
    //     'subjectCode' => [
    //         'required',
    //         function ($attribute, $value, $fail) use ($validPrefixes5Chars, $validPrefixes6Chars) {
    //             if (strlen($value) === 5) {
    //                 if (!in_array(substr($value, 0, 2), $validPrefixes5Chars)
    //                     || !is_numeric(substr($value, 2, 1))
    //                     || !in_array(substr($value, 3, 1), ['1', '2', '3', '4'])
    //                     || !is_numeric(substr($value, 4, 1))) {
    //                     $fail('The subject code is not valid.');
    //                 }
    //             } elseif (strlen($value) === 6) {
    //                 if (!in_array(substr($value, 0, 2), $validPrefixes6Chars)
    //                     || !is_numeric(substr($value, 2, 1))
    //                     || !in_array(substr($value, 3, 1), ['e', 'c'])
    //                     || !is_numeric(substr($value, 4, 1))
    //                     || !is_numeric(substr($value, 5, 1))) {
    //                     $fail('The subject code is not valid.');
    //                 }
    //             } else {
    //                 $fail('The subject code length is invalid.');
    //             }
    //         },
    //     ],
    //     'facultyID' => 'requiredregex:/^S[0-3][0-9][1-9]$/',
    // ];
    // $validator=Validator::make($req->all(),$validationRules);

    //     if($validator->fails()){
    //         return response()->json(['errors'=>$validator->errors()],422);
    //     }
    $validationRules=[
        'subjectCode' => ['custom_subject_code'],
        'facultyID' => 'regex:/^S[0-3][0-9][1-9]$/',

    ];
    $validator=Validator::make($req->all(),$validationRules);

        if($validator->fails()){
            return response()->json(['errors'=>$validator->errors()],422);
        }
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
        $validationRules=[
            'subjectCode' => ['required', 'custom_subject_code'],
            'facultyID' => 'required|regex:/^S[0-3][0-9][1-9]$/',
        ];
        $validator=Validator::make($req->all(),$validationRules);

            if($validator->fails()){
                return response()->json(['errors'=>$validator->errors()],422);
            }

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
        $validationRules=[
            'subjectCode' => ['required', 'custom_subject_code'],
            'facultyID' => 'required|regex:/^S[0-3][0-9][1-9]$/',
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
        $object->save();
        return response()->json(['message'=>'record updated']);
     }

     public function facultySubjects(Request $req){
        //$faculty_id = $req->query('faculty_id');
        $faculty_id=auth()->user()->faculty_id;
        $subjects = assign_faculty::where('faculty_id',$faculty_id)->pluck('subject_code');
        return response()->json($subjects);
     }
}
