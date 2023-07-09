<?php

use App\Http\Controllers\SemesterController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AcademicCalendarController;
use App\Http\Controllers\SubjectsController;
use App\Http\Controllers\FacultyController;

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

Route::post('add',[AcademicCalendarController::class,'add']);
Route::get('get',[AcademicCalendarController::class,'get']);
Route::put('update',[AcademicCalendarController::class,'update']);

Route::post('/addSubject',[SubjectsController::class,'add']);
Route::get('/getSubjects',[SubjectsController::class,'get']);

Route::put('/updateSemester',[SemesterController::class,'update']);
Route::delete('/removeSemester',[SemesterController::class,'delete']);


Route::group([

    'middleware' => 'auth:faculty-api',
    'prefix' => 'auth'

], function ($router) {
    Route::post('facultyEntry',[FacultyController::class,'facultyEntry']);
    Route::post('facultyLogin',[FacultyController::class,'login'])->name("login");
    Route::post('facultyLogout', [FacultyController::class,'logout']);
    Route::post('refresh', [FacultyController::class,'refresh']);
    Route::post('me', [FacultyController::class,'me']);

});
