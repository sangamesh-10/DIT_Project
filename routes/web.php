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
Route::get('/StudentLogin',[loginController::class,"studentLogin"]);
Route::post('/verify',[loginController::class,"verify"]);
Route::post('/updatePwd',[updationsController::class,"stdPassword"]);
Route::view("/changePwd","changePassword_std");
Route::get('/studentHomePage',function(){
    return view('studentHomePage');
});
//Route to send otpmail
Route::get('/sendOtp',[MailController::class,'sendOtp']);
// Route to verify otp
Route::post('/verifyOtp',[updationsController::class,'otpVerification']);



