<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\loginController;
use App\Http\Controllers\stdRegController;
use App\Http\Controllers\facultyRegController;
use App\Http\Controllers\profilecontroller;

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
})->name('welcome');
Route::view('/profile','profile');
Route::view("/StudentRegistration","studentRegistration");
Route::post("stdRegistration",[stdRegController::class,"stdRegistration"]);

Route::view("/facultyRegistration","facultyRegistration");
Route::post("facultyReg",[facultyRegController::class,"facultyReg"]);

Route::get("profile",[profilecontroller::class,"studentProfile"]);
Route::get("facultyprofile",[profilecontroller::class,"facultyProfile"]);

Route::get('/StudentLogin',[loginController::class,"studentLogin"])->name('studentLogin');
Route::get('/FacultyLogin',[loginController::class,"facultyLogin"])->name('facultyLogin');

Route::post('/verify',[loginController::class,"verify"]);
Route::post('/verifyFaculty',[loginController::class,"verifyFacultyLogin"]);
Route::view('updatePassword','UpdatePassword');
Route::post('/updatePwd',[updationsController::class,"stdPassword"]);
Route::post('/updatePwdFaculty',[updationsController::class,"facultyPassword"]);
// Route::view('/chPassFaculty','UpdatePassword_Faculty');
Route::get('/chPassFaculty',function(){
    return view("UpdatePassword_Faculty");
});

Route::get('studentHomePage', [loginController::class,"studentHomePage"])->name('studentHomePage');

//Route to send otpmail
Route::post('/sendOtp',[MailController::class,'sendOtp']);
Route::post('/sendOtpFaculty',[MailController::class,'sendOtpFaculty']);

// Route to verify otp
Route::post('/verifyOtp',[updationsController::class,'otpVerification']);
Route::post('/verifyOtpFaculty',[updationsController::class,'otpVerificationFaculty']);
Route::view('/otpVerification',"OtpVerification");
Route::view('/otpVerification_2',"OtpVerification_2")->name("otpVerification_2");
Route::view('/otpVerificationFaculty',"OtpVerification_Faculty");
// Route::post('updateContact',[updationsController::class,'updateContact']);

Route::put('/changeContact', [updationsController::class, 'updateContact'])->name('updateContact');
Route::view('/updateContact','updateContact');
//Route to FacultyHomepage
Route::get('/facultyHomePage',function(){
    return view('facultyHomePage');
});

//logout route
Route::get('/logout',[loginController::class,'logout']);



