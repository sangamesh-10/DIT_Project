<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\SemesterController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AcademicCalendarController;
use App\Http\Controllers\SubjectsController;
use App\Http\Controllers\FacultyController;

use App\Http\Controllers\AuthenticationController;
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

Route::post('addCalendar',[AcademicCalendarController::class,'add']);
Route::get('getCalendar',[AcademicCalendarController::class,'get']);
Route::put('updateCalendar',[AcademicCalendarController::class,'update']);

Route::post('/addSubject',[SubjectsController::class,'add']);
Route::get('/getSubjects',[SubjectsController::class,'get']);

Route::put('/updateSemester',[SemesterController::class,'update']);
Route::delete('/removeSemester',[SemesterController::class,'delete']);


Route::group([

    'middleware' => 'auth:faculty-api',
    'prefix' => 'auth'

], function ($router) {
    Route::post('facultyEntry',[FacultyController::class,'facultyEntry'])->withoutMiddleware('auth:faculty-api');
    Route::post('facultyLogin', [FacultyController::class, 'login'])->name('faculty.login')
    ->withoutMiddleware('auth:faculty-api');
    Route::post('facultyLogout', [FacultyController::class,'logout']);
    Route::post('refresh', [FacultyController::class,'refresh']);
    Route::post('me', [FacultyController::class,'me']);

});

Route::group([
    'middleware' => 'auth:admin-api',
    'prefix' => 'auth'
], function ($router){
    Route::post('adminEntry',[AdminController::class,'adminEntry'])->withoutMiddleware('auth:admin-api');
    Route::post('adminLogin',[AdminController::class,'login'])->name('admin.login')->withoutMiddleware('auth:admin-api');
   //Route::match(['get', 'post'], 'adminLogin', [AdminController::class, 'login'])->name('login');
    Route::post('adminLogout',[AdminController::class,'logout']);
    Route::get('adminMe',[AdminController::class,'me']);
});

Route::post("/addReRegister",[SemesterController::class,'addReRegister']);
Route::get("/getReRegister",[SemesterController::class,'getReRegister']);
Route::delete("/deleteReRegister",[SemesterController::class,'deleteReRegister']);

Route::post('/assignFaculty',[SubjectsController::class,'assignFaculty']);
Route::get('/getAssignedFaculty',[SubjectsController::class,'getAssignedFaculty']);
Route::delete('/deleteAssignment',[SubjectsController::class,'deleteAssignment']);
Route::put('/updateAssignment',[SubjectsController::class,'updateAssignment']);

Route::post("/addStdLogin",[AuthenticationController::class,'addStdLogin']);
Route::put("/updateStdLogin",[AuthenticationController::class,'updateStdLogin']);
Route::delete("/deleteStdLogin",[AuthenticationController::class,'deleteStdLogin']);
Route::post("/addFacLogin",[AuthenticationController::class,'addFacLogin']);
Route::put("/updateFacLogin",[AuthenticationController::class,'updateFacLogin']);
Route::delete("/deleteFacLogin",[AuthenticationController::class,'deleteFacLogin']);
Route::post("/addAdminLogin",[AuthenticationController::class,'addAdminLogin']);
Route::put("/updateAdminLogin",[AuthenticationController::class,'updateAdminLogin']);
Route::delete("/deleteAdminLogin",[AuthenticationController::class,'deleteAdminLogin']);



