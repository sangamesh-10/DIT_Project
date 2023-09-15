<?php

namespace App\Http\Controllers;

use Illuminate\Validation;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use App\Models\students_login;
use App\Models\faculty_login;
use App\Models\admin_login;
use Illuminate\Support\Facades\Hash;


class AuthenticationController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:admin-api');
    }
    public function addStdLogin(Request $req)
    {

        $object=new students_login;
        $object->student_id=$req->input("rollNumber");
        $object->password=Hash::make($req->input("password"));
        if($object->save()){
        return response()->json('true');}
    }
    public function updateStdLogin(Request $req)
    {
        $student_id=$req->input("rollNumber");
        $object=students_login::where('student_id',$student_id)->first();
        if(!$object)
        {
            return response()->json(['message'=>'Record not found'],404);
        }
        $object->password= Hash::make($req->input("password"));
        $object->save();
        return response()->json(['message'=>'Record updated']);
    }
    public function deleteStdLogin(Request $req)
    {
        $validationRules=[
            'rollNumber'=>'regex:/^[2-9][0-9]031[FD][026B]0[0-9][0-9]$/',
        ];
        $validator=Validator::make($req->all(),$validationRules);

        if($validator->fails()){
            return response()->json(['errors'=>$validator->errors()],422);
        }
        $student_id=$req->input("rollNumber");
        $object=students_login::where('student_id',$student_id)->first();
        if(!$object)
        {
            return response()->json(['message'=>'Record not found'],404);
        }
        if($object->delete()){
        return response()->json('true');}
    }
    public function addFacLogin(Request $req)
    {
        $object=new faculty_login;
        $object->faculty_id=$req->input("facultyID");
        $object->password=Hash::make($req->input("password"));
        if($object->save()){
        return response()->json('true');}
    }
    public function updateFacLogin(Request $req)
    {
        $faculty_id=$req->input("facultyID");
        $object=faculty_login::where('faculty_id',$faculty_id)->first();
        if(!$object)
        {
            return response()->json(['message'=>'Record not found'],404);
        }
        $object->password=Hash::make($req->input("password"));
        $object->save();
        return response()->json(['message'=>'Record updated']);
    }
    public function deleteFacLogin(Request $req)
    {
        $validationRules=[
            'facultyID'=>'required|regex:/^S[0-3][0-9][1-9]$/',
        ];
        $validator=Validator::make($req->all(),$validationRules);

        if($validator->fails()){
            return response()->json(['errors'=>$validator->errors()],422);
        }

        $faculty_id=$req->input("facultyID");
        $object=faculty_login::where('faculty_id',$faculty_id)->first();
        if(!$object)
        {
            return response()->json(['message'=>'Record not found'],404);
        }
        if($object->delete()){
        return response()->json('true');}
    }
    public function addAdminLogin(Request $req)
    {
        $object=new admin_login;
        $object->admin_id=$req->input("adminID");
        $object->password=Hash::make($req->input("password"));
        $object->save();
        return response()->json($object);
    }
    public function updateAdminLogin(Request $req)
    {
        $admin_id=$req->input("adminID");
        $object=admin_login::where('admin_id',$admin_id)->first();
        if(!$object)
        {
            return response()->json(['message'=>'Record not found'],404);
        }
        $object->password=$req->input("password");
        $object->save();
        return response()->json(['message'=>'Record updated']);
    }
    public function deleteAdminLogin(Request $req)
    {
        $admin_id=$req->input("adminID");
        $object=admin_login::where('admin_id',$admin_id)->first();
        if(!$object)
        {
            return response()->json(['message'=>'Record not found'],404);
        }
        $object->delete();
        return response()->json(['message'=>'Record deleted']);
    }

}
