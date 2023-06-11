<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Session;
use App\Mail\MailSender;


use Illuminate\Http\Request;

class MailController extends Controller
{
    public function sendOtp(){
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
        Mail::to('anupamavegesna1331@gmail.com')->send(new MailSender($mailData));
        return view('OtpVerification');
    }
}
