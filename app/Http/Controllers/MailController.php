<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Session;
use App\Mail\MailSender;
use App\Models\student;
use App\Models\faculty;


use Illuminate\Http\Request;

class MailController extends Controller
{
    public function sendOtp(Request $req){

    $student_id=$req->input("roll_num");
    //return $student_id;
    $student=Student::where("roll_num",$student_id)->first();
    $email=$student->email;

    // Generate a random OTP
    $otp = mt_rand(100000, 999999);

    // Store the OTP in the session for later verification
    Session::put('otp', $otp);
    Session::put('user',$student_id);

        $mailData = [
            'subject' => 'OTP Verification',
            'title' => 'Mail from Laravel Project',
            'body' => 'this is for testing email using smtp in Laravel',
            'otp' => $otp,
        ];
        Mail::to($email)->send(new MailSender($mailData));
        return redirect()->route('otpVerification_2');
    }
    public function sendOtpFaculty(Request $req){

        $faculty_id=$req->input("faculty_id");
        $faculty=Faculty::where("faculty_id",$faculty_id)->first();
        $email=$faculty->email;
        // Generate a random OTP
        $otp = mt_rand(100000, 999999);

        // Store the OTP in the session for later verification
        Session::put('otp', $otp);
        Session::put('user',$faculty_id);

            $mailData = [
                'subject' => 'OTP Verification',
                'title' => 'Mail from Laravel Project',
                'body' => 'this is for testing email using smtp in Laravel',
                'otp' => $otp,
            ];
            Mail::to($email)->send(new MailSender($mailData));
            return view('OtpVerification_Faculty_2');
        }
}
