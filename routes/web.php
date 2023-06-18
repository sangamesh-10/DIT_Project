<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\loginController;
use App\Http\Controllers\stdRegController;
use App\Http\Controllers\facultyRegController;

use App\Http\Controllers\MailController;
use App\Http\Controllers\updationsController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});
Route::view("/StudentRegistration","studentRegistration");
Route::post("stdRegistration",[stdRegController::class,"stdRegistration"]);

Route::view("/facultyRegistration","facultyRegistration");
Route::post("facultyReg",[facultyRegController::class,"facultyReg"]);

Route::get('/StudentLogin',[loginController::class,"studentLogin"])->name('studentLogin');
Route::get('/FacultyLogin',[loginController::class,"facultyLogin"])->name('facultyLogin');

Route::post('/verify',[loginController::class,"verify"]);
Route::post('/verifyFaculty',[loginController::class,"verifyFacultyLogin"]);

Route::post('/updatePwd',[updationsController::class,"stdPassword"]);
Route::post('/updatePwdFaculty',[updationsController::class,"facultyPassword"]);
Route::view("/changePwd","changePassword_std");

Route::get('studentHomePage', [loginController::class,"studentHomePage"])->name('studentHomePage');

//Route to send otpmail
Route::post('/sendOtp',[MailController::class,'sendOtp']);
Route::post('/sendOtpFaculty',[MailController::class,'sendOtpFaculty']);

// Route to verify otp
Route::post('/verifyOtp',[updationsController::class,'otpVerification']);
Route::post('/verifyOtpFaculty',[updationsController::class,'otpVerificationFaculty']);
Route::view('/otpVerification',"OtpVerification");
Route::view('/otpVerificationFaculty',"OtpVerification_Faculty");
// Route::post('updateContact',[updationsController::class,'updateContact']);

//Route to FacultyHomepage
Route::get('/facultyHomePage',function(){
    return view('facultyHomePage');
});

Route::put('updateContact', [updationsController::class, 'updateContact'])->name('updateContact');


