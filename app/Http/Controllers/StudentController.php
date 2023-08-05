<?php

namespace App\Http\Controllers;

use App\Models\notifications;
use App\Models\raise_complaint;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use Carbon\Carbon;
use App\Models\students_login;
use App\Models\student;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use App\Mail\MailSender;
use Illuminate\Support\Facades\Cache;



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

        //return $this->respondWithToken($token);
        /** @var Students_login $student */
        $student=auth()->guard('student-api')->user();
        //return $student;
        $token=$student->createToken('main')->plainTextToken;
        //return $token;
        return response (compact('student','token'));

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
    public function updatePwd(Request $req)
    {
        $student_id = auth()->user()->student_id;
        $new_password = $req->input('new_password');
        $confirm_password = $req->input('confirm_password');

        $rules = [
            'new_password' => 'required|regex:/^(?=.*[A-Z])(?=.*\d).{8,}$/'
        ];

        $validator = Validator::make($req->all(), $rules);

        if ($validator->fails() || $new_password != $confirm_password) {
        return response()->json(['error'=> $validator->errors()]);
        } else {
            $student = students_login::where('student_id', $student_id)->first();

            if ($student) {
                $student->password = Hash::make($new_password);
                $student->save();
                return response()->json(['success'=> 'password modified']);
            }
        }
    }
    public function updateContact(Request $request)
    {

        $request->validate([
            'mobile' => 'required',
        ]);

        $student_id = auth()->user()->student_id;
        $newPhoneNumber = $request->input('mobile');

        $student = Student::where('roll_num', $student_id)->first();

        if ($student) {
            $student->phone_num = $newPhoneNumber;
            $student->save();
        }

        return response()->json(['success'=> 'Contact modified']);
    }

    public function sendOtp(Request $req)
    {
        $student_id = $req->input("student_id");
        $student = Student::where("roll_num", $student_id)->first();
        $email = $student->email;

        $otp = mt_rand(100000, 999999);

        Cache::put('otp', $otp, 60);
        $mailData = [
            'subject' => 'OTP Verification',
            'title' => 'Mail from Laravel Project',
            'body' => 'Your OTP for verification is: ',
            'otp' => $otp,
        ];
        Mail::to($email)->send(new MailSender($mailData));

        return response()->json(["Success"=>"OTP SENT"]);
    }

    public function otpVerification(Request $req)
    {
        $user_otp = $req->input('otp');
        $actual_otp = Cache::get('otp');

        if ($actual_otp && $user_otp == $actual_otp) {

            return response()->json("verified otp");
        } else {
            return response()->json(['error'=> 'Invalid OTP entered. Please try again.']);
        }
    }


}
