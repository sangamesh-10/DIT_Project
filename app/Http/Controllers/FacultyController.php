<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;
use Tymon\JWTAuth\Facades\JWTAuth;
use Carbon\Carbon;
use App\Models\faculty_login;
use Exception;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Support\Facades\Log;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class FacultyController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:faculty-api', ['except' => ['login','facultyEntry']]);
    }
    public function facultyEntry(Request $req) {
        $faculty = faculty_login::create([
            'faculty_id'=>$req->input('faculty_id'),
            'password'=>Hash::make($req->input('password'))
        ]);
        if($faculty){
            return response()->json([$faculty,'status'=>true]);
        }
        else{
            return response()->json(['status'=>false]);
        }
    }
    public function login(Request $req)
    {
            $credentials = $req->only('faculty_id', 'password');

            if (! $token = auth('faculty-api')->attempt($credentials)) {
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
        return response()->json(auth()->guard('faculty-api')->user());
    }



    public function logout()
    {
        auth()->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }

}
