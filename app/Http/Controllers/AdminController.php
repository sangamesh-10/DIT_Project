<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\admin_login;
use Carbon\Carbon;
use App\Models\raise_complaint;
use App\Models\faculty;
use App\Models\student;



class AdminController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:admin-api');
    }
    public function adminEntry(Request $req)
    {
        $admin = admin_login::create([
            'admin_id' => $req->input('admin_id'),
            'password' => Hash::make($req->input('password'))
        ]);
        if ($admin) {
            return response()->json([$admin, 'status' => true]);
        } else {
            return response()->json(['status' => false]);
        }
    }
    public function login(Request $req)
    {
        $credentials = $req->only('admin_id', 'password');
        ;

        if (!$token = auth('admin-api')->attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        return $this->respondWithToken($token);
    }

    protected function respondWithToken($token)
    {
        $expiration = Carbon::now()->addMinutes(JWTAuth::factory()->getTTL());

        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => $expiration->timestamp,
        ]);
    }
    public function me()
    {
        return response()->json(auth('admin-api')->user());
    }
    public function logout()
    {
        JWTAuth::invalidate(JWTAuth::getToken());

        return response()->json(['message' => 'Successfully logged out'], 200);
    }
    public function getComplaints()
    {
        $object = raise_complaint::all();
        return response()->json($object);
    }
    public function deleteComplaint(Request $req)
    {
        $id = $req->input('id');
        $object = raise_complaint::where("id", $id);
        if (!$object) {
            return response()->json(["message" => "Record not found"]);
        }
        $result = $object->delete();
        if ($result) {
            return response()->json(["message" => "record deleted"]);
        }
    }
    public function facultyReg(Request $req)
    {
    $object = new faculty;
    $object->faculty_id=$req->faculty_id;
    $object->name=$req->name;
    $object->email=$req->email;
    $object->alt_email=$req->altEmail;
    $object->phone_num=$req->phoneNo;
    $object->aadhar_num=$req->aadharNo;
    $object->designation=$req->designation;
    $object->experience=$req->experience;
    $result=$object->save();
    if($result)
    {
        return response()->json($object);
    }
    else
    {
        return['result'=>'operation failed'];
    }

}
public function getFaculty()
{
    $object=faculty::all();
    return response()->json($object);
}
public function studentReg(Request $req)
{
    $object=new student;
        $object->roll_num=$req->rollNumber;
        $object->name=$req->name;
        $object->email=$req->email;
        $object->phone_num=$req->phoneNo;
        $object->aadhar_num=$req->aadharNo;
        $object->mother_name=$req->motherName;
        $object->father_name=$req->fatherName;
        $object->parent_num=$req->parentPhNo;
        $object->dob=$req->dob;
        $object->permanent_addr=$req->permanentAddr;
        $object->present_addr=$req->presentAddr;
        $object->blood_group=$req->bloodGroup;
        $object->caste=$req->caste;
        $object->religion=$req->religion;

        $result=$object->save();
        if($result)
        {
            return response()->json($object);
        }
        else
        {
            return response()->json(['result'=>'operation failed']);
        }
}
public function getStudents()
{
    $object=student::all();
    return response()->json($object);
}
}
