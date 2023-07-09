<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
 use App\Models\admin_login;


class AdminController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:admin-api', ['except' => ['login','adminEntry']]);
    }
    public function adminEntry(Request $req) {
        $admin = admin_login::create([
            'admin_id'=>$req->input('admin_id'),
            'password'=>Hash::make($req->input('password'))
        ]);
        if($admin){
            return response()->json([$admin,'status'=>true]);
        }
        else{
            return response()->json(['status'=>false]);
        }
    }
    public function login(Request $req)
    {
        $credentials = $req->only('admin_id', 'password');;

        if (!$token = auth('admin-api')->attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        return $this->respondWithToken($token);
    }

    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60
        ]);
    }
    public function me()
    {
        return response()->json(auth('admin-api')->user());
    }
    public function logout()
{
    JWTAuth::invalidate(JWTAuth::getToken());

    return response()->json(['message' => 'Successfully logged out'],200);
}

}
