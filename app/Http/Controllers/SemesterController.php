<?php

namespace App\Http\Controllers;

use Illuminate\Database\QueryException;
use Illuminate\Validation\Rule;
//use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Validator;
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
        $validationRules=[
            'year'=>'numeric|digits:2',
            'code'=>'string|in:F0,D0,D2,D6,DB',
            'semester'=>'numeric|in:1,2,3,4',
        ];
        $validator= Validator::make($req->all(),$validationRules);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422); // 422 Unprocessable Entity
        }
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
        $validationRules=[
            'year'=>'numeric|digits:2|regex:/^[2-9][1-9]$/',
            'code'=>'string|in:F0,D0,D2,D6,DB',
        ];
        $validator= Validator::make($req->all(),$validationRules);
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422); // 422 Unprocessable Entity
        }
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
        $validationRules=[
            'year'=>'numeric|digits:2|regex:/^[2-9][1-9]$/',
            'code'=>'string|in:F0,D0,D2,D6,DB',
        ];
        $validator= Validator::make($req->all(),$validationRules);
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422); // 422 Unprocessable Entity
        }
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
        $validationRules=[
            'rollNumber'=>'size:10|regex:/^[2-9][0-9]031[FD][026B]0[0-9][0-9]$/',
            'subjectCode' => ['custom_subject_code'],
        ];
        $validator= Validator::make($req->all(),$validationRules);
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422); // 422 Unprocessable Entity
        }

        try{
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
    catch(QueryException $e){
    //$errorCode = $e->errorInfo[1];
    if ($e->getCode() === '23000') {
        return response()->json('Already registered', 422);
    }else {
        return response()->json('Database error', 500);
    }
   }
 }
   public function getReRegister()
    {
        $object=re_register::all();
        return response()->json($object);
    }
    public function deleteReRegister(Request $req)
    {
        $validationRules=[
            'rollNumber'=>'required|size:10|regex:/^[2-9][0-9]031[FD][026B]0[0-9][0-9]$/',
            'subjectCode' => ['required', 'custom_subject_code'],
        ];
        $validator= Validator::make($req->all(),$validationRules);
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422); // 422 Unprocessable Entity
        }
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
