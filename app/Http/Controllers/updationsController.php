<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Session;
use App\Models\student;
use Illuminate\Console\View\Components\Alert;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class updationsController extends Controller
{
    function stdPassword(Request $req)
    {
        $username = $req->input('username');
        //$currentPwd = $req->input('currentPwd');
        $new_password = $req->input('new_password');

        $rules = [
            'new_password' => 'required|regex:/^(?=.*[A-Z])(?=.*\d).{8,}$/'
        ];

        $validator = Validator::make($req->all(), $rules);

        if ($validator->fails()) {
            return redirect()->back()->withErrors($validator);
        } else {
            $student = student::where('student_id', $username)->first();

            if ($student) {
                $student->password = $new_password;
                $student->save();

                return "Password updated successfully.";
            }
        }
    }
    function otpVerification(Request $req){
        $user_otp = $req->input('otp');
        $actual_otp =Session::get('otp');
        if($user_otp==$actual_otp){

            return view('UpdatePassword');
        }
        else{
            return redirect()->back()->with('error', 'Invalid OTP entered. Please try again.');
        }
    }

    public function updateContact(Request $request)
    {

        $request->validate([
            'mobile' => 'required',
        ]);
        return view('UpdatePassword');
        // $student_id = Session::get('user');
        // $student = student::find($student_id);
        // $student->phone_num = $request->input('mobile');
        // $student->save();

        // return redirect()->back()->with('success', 'Mobile number updated successfully!');
    }

}
