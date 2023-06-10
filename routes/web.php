<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\loginController;

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
Route::get('/StudentLogin',[loginController::class,"studentLogin"]);
Route::post('/verify',[loginController::class,"verify"]);
Route::get('/studentHomePage',function(){
    return view('studentHomePage');
});

