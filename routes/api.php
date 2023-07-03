<?php

use App\Http\Controllers\SemesterController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SubjectsController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/addSubject',[SubjectsController::class,'add']);
Route::get('/getSubjects',[SubjectsController::class,'get']);

Route::put('/updateSemester',[SemesterController::class,'update']);
Route::delete('/removeSemester',[SemesterController::class,'delete']);
