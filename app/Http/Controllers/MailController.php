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
    public function sendOtp(){

    $student_id=Session::get('faculty_user');
    $student=Student::where("roll_num",$student_id)->first();
    $email=$student->email;

    // Generate a random OTP
    $otp = mt_rand(100000, 999999);

    // Store the OTP in the session for later verification
    Session::put('otp', $otp);

        $mailData = [
            'subject' => 'OTP Verification',
            'title' => 'Mail from Laravel Project',
            'body' => 'this is for testing email using smtp in Laravel',
            'otp' => $otp,
        ];
        Mail::to($email)->send(new MailSender($mailData));
        return view('OtpVerification');
    }
    public function sendOtpFaculty(){

        $faculty_id=Session::get('faculty_user');
        $faculty=Faculty::where("faculty_id",$faculty_id)->first();
        $email=$faculty->email;

        // Generate a random OTP
        $otp = mt_rand(100000, 999999);

        // Store the OTP in the session for later verification
        Session::put('otp', $otp);

            $mailData = [
                'subject' => 'OTP Verification',
                'title' => 'Mail from Laravel Project',
                'body' => 'this is for testing email using smtp in Laravel',
                'otp' => $otp,
            ];
            Mail::to($email)->send(new MailSender($mailData));
            return view('OtpVerification');
        }
}
