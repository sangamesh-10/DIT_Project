<?php

namespace App\Http\Controllers;
use Tymon\JWTAuth\Facades\JWTAuth;
use Carbon\Carbon;
use App\Models\faculty_login;

use Illuminate\Http\Request;

class FacultyController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:faculty-api');
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
