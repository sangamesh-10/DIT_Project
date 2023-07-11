<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\admin_login;
use Carbon\Carbon;
use App\Models\raise_complaint;



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

}
