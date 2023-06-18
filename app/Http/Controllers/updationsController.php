<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Session;
use App\Models\faculty_login;
use App\Models\students_login;
use Illuminate\Console\View\Components\Alert;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class updationsController extends Controller
{
    function stdPassword(Request $req)
    {
        $student_id = Session::get('user');
        $new_password = $req->input('new_password');
        $confirm_password = $req->input('confirm_password');

        $rules = [
            'new_password' => 'required|regex:/^(?=.*[A-Z])(?=.*\d).{8,}$/'
        ];

        $validator = Validator::make($req->all(), $rules);

        if ($validator->fails() || $new_password != $confirm_password) {
            return redirect()->back()->with('error', 'Password format is not valid . Please try again.');
        }
        else
        {
            $student = students_login::where('student_id', $student_id)->first();

            if ($student) {
                $student->password = $new_password;
                $student->save();

                return redirect()->route('studentLogin')->with('success', 'Password updated successfully. Please login with your new password.');;;
            }
        }
    }
    function facultyPassword(Request $req)
    {
        $faculty_id = Session::get('user');
        $new_password = $req->input('new_password');
        $confirm_password = $req->input('confirm_password');

        $rules = [
            'new_password' => 'required|regex:/^(?=.*[A-Z])(?=.*\d).{8,}$/'
        ];

        $validator = Validator::make($req->all(), $rules);

        if ($validator->fails() || $new_password != $confirm_password) {
            return redirect()->back()->with('error', 'Password format is not valid . Please try again.');
        }
        else
        {
            $faculty = faculty_login::where('faculty_id', $faculty_id)->first();

            if ($faculty) {
                $faculty->password = $new_password;
                $faculty->save();

                return redirect()->route('facultyLogin')->with('success', 'Password updated successfully. Please login with your new password.');
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
    function otpVerificationFaculty( Request $req){
        $user_otp = $req->input('otp');
        $actual_otp =Session::get('otp');
        if($user_otp==$actual_otp){

            return view('UpdatePassword_Faculty');
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

        $student_id = Session::get('user');
        $student = student::find($student_id);
        $student->phone_num = $request->input('mobile');
        $student->save();

        return redirect()->back()->with('success', 'Mobile number updated successfully!');
    }

}
