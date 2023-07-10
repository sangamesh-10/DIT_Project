<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use Carbon\Carbon;
use App\Models\students_login;
use App\Models\student;

class StudentController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:student-api');
    }
    public function login(Request $req)
    {
        $credentials = $req->only('student_id', 'password');

        if (!$token = auth('student-api')->attempt($credentials)) {
            // dd($token);
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
        $user = auth()->guard('student-api')->user();
        $loginId = $user->student_id;
        $object=Student::where("roll_num",$loginId)->first();
        return response()->json($object);
    }

    public function logout()
    {
        auth()->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }
}
