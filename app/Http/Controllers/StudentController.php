<?php

namespace App\Http\Controllers;

use App\Models\notifications;
use App\Models\raise_complaint;
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
    public function getNotifications()
    {
        $user = auth()->user()->student_id;
        $notifications =  notifications::where('receiver_id',$user)->orderBy('created_at', 'desc')->get();

        // Return the notifications as JSON response
        return response()->json(['notifications' => $notifications]);
    }
    public function logout()
    {
        auth()->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }
    public function raiseComplaint(Request $req)
    {
        $user = auth()->guard('student-api')->user()->student_id;
        $object = new raise_complaint;
        $object->from_id= $user;
        $object->description=$req->input("description");
        $object->date=date('Y-m-d');
        $result=$object->save();
        if($result){
            notifications::create([
                'sender_id'=>$user,
                'receiver_id'=>'S101',
                'message'=>'I had raised a complaint,please Respond',
            ]);
        return response()->json($object);
        }
        else{
            return response()->json(['message'=>'could not save data']);
        }
    }
    public function markAsRead(Request $req)
    {
        $notification = notifications::where('id',$req->input('id'))->first();
        if($notification){

            // Ensure the notification belongs to the current user
            if ($notification->receiver_id !== auth()->user()->student_id) {
                abort(403); // Return a forbidden response if the user tries to mark someone else's notification as read
            }
            $notification->update(['is_read' => true]);

            // Redirect back to the notifications index or any other appropriate page
            return response()->json(['message'=>'Marked as read successfully']);
        }
        else{
            return response()->json(['message'=>'Notification Not Found']);

        }
    }
}
