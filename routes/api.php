<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\SemesterController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AcademicCalendarController;
use App\Http\Controllers\SubjectsController;
use App\Http\Controllers\FacultyController;
use App\Http\Controllers\NoticeBoardController;


use App\Http\Controllers\AuthenticationController;
use App\Http\Controllers\StudentController;
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



Route::group([

    'middleware' => 'auth:faculty-api',
    'prefix' => 'auth'

], function ($router) {
    Route::post('facultyLogin', [FacultyController::class, 'login'])->name('faculty.login')
    ->withoutMiddleware('auth:faculty-api');
    Route::post('facultyLogout', [FacultyController::class,'logout']);
    Route::post('me', [FacultyController::class,'me']);
    Route::get('getFacultySubjects',[SubjectsController::class,'facultySubjects'])->withoutMiddleware('auth:admin-api');
    Route::get('getEnrolledStudents',[FacultyController::class,'enrolledStudents']);
    Route::post('markAttendance',[FacultyController::class,'markAttendance']);
    Route::post('addInternalMarks',[FacultyController::class,'addInternalMarks']);
    Route::put('facultyMarkAsRead',[FacultyController::class,'markAsRead']);
    Route::get('getFacultyNotifications',[FacultyController::class,'getNotifications']);


    Route::post('raiseComplaintFaculty',[FacultyController::class,'raiseComplaint']);

    Route::put('updatePwdFaculty',[FacultyController::class,'updatePassword']);
    Route::put('updateContactFaculty',[FacultyController::class,'updateContact']);

    Route::post('sendOTPFaculty',[FacultyController::class,"sendOtp"]);
    Route::post('otpVerifyFaculty',[FacultyController::class,"otpVerification"]);


});

Route::group([
    'middleware' => 'auth:admin-api',
    'prefix' => 'auth'
], function ($router){
    Route::post('adminEntry',[AdminController::class,'adminEntry'])->withoutMiddleware('auth:admin-api');
    Route::post('adminLogin',[AdminController::class,'login'])->name('admin.login')->withoutMiddleware('auth:admin-api');
    Route::post('adminLogout',[AdminController::class,'logout']);
    Route::get('adminMe',[AdminController::class,'me']);

    Route::post('addSubjects',[SubjectsController::class,'add'])->withoutMiddleware('auth:faculty-api');
    Route::get('/getSubjects',[SubjectsController::class,'get'])->withoutMiddleware('auth:faculty-api');

    Route::post('/addSemester',[SemesterController::class,'add']);
    Route::get('/getSemester',[SemesterController::class,'get']);
    Route::put('/updateSemester',[SemesterController::class,'update']);
    Route::delete('/removeSemester',[SemesterController::class,'delete']);

    Route::post("/addReRegister",[SemesterController::class,'addReRegister']);
    Route::get("/getReRegister",[SemesterController::class,'getReRegister']);
    Route::delete("/deleteReRegister",[SemesterController::class,'deleteReRegister']);

    Route::post('/assignFaculty',[SubjectsController::class,'assignFaculty'])->withoutMiddleware('auth:faculty-api');
    Route::get('/getAssignedFaculty',[SubjectsController::class,'getAssignedFaculty'])->withoutMiddleware('auth:faculty-api');
    Route::delete('/deleteAssignment',[SubjectsController::class,'deleteAssignment'])->withoutMiddleware('auth:faculty-api');
    Route::put('/updateAssignment',[SubjectsController::class,'updateAssignment'])->withoutMiddleware('auth:faculty-api');

    Route::post("/addStdLogin",[AuthenticationController::class,'addStdLogin']);
    Route::put("/updateStdLogin",[AuthenticationController::class,'updateStdLogin']);
    Route::delete("/deleteStdLogin",[AuthenticationController::class,'deleteStdLogin']);

    Route::post("/addFacLogin",[AuthenticationController::class,'addFacLogin']);
    Route::put("/updateFacLogin",[AuthenticationController::class,'updateFacLogin']);
    Route::delete("/deleteFacLogin",[AuthenticationController::class,'deleteFacLogin']);

    Route::post('addCalendar',[AcademicCalendarController::class,'add']);
    Route::get('getCalendar',[AcademicCalendarController::class,'get']);
    Route::put('updateCalendar',[AcademicCalendarController::class,'update']);

    Route::post('addNotice',[NoticeBoardController::class,'add']);
    Route::get('getNotice',[NoticeBoardController::class,'get']);
    Route::put('updateNotice',[NoticeBoardController::class,'update']);
    Route::delete('deleteNotice',[NoticeBoardController::class,'delete']);

    Route::get('getComplaints',[AdminController::class,'getComplaints']);
    Route::delete('deleteComplaint',[AdminController::class,'deleteComplaint']);

    Route::post("facultyRegistration",[AdminController::class,'facultyReg']);
    Route::get("facultyDetails",[AdminController::class,'getFaculty']);

    Route::post("studentRegistration",[AdminController::class,'studentReg']);
    Route::get("studentsDetails",[AdminController::class,'getStudents']);
});


// Route::post("/addAdminLogin",[AuthenticationController::class,'addAdminLogin']);
// Route::put("/updateAdminLogin",[AuthenticationController::class,'updateAdminLogin']);
// Route::delete("/deleteAdminLogin",[AuthenticationController::class,'deleteAdminLogin']);

Route::group([

    'middleware' => 'auth:student-api',
    'prefix' => 'auth'

], function ($router) {
    Route::post('studentLogin', [StudentController::class, 'login'])->name('student.login')
    ->withoutMiddleware('auth:student-api');
    Route::post('studentLogout', [StudentController::class,'logout']);
    Route::get('studentMe', [StudentController::class,'me']);
    Route::get('getStudentNotifications',[StudentController::class,'getNotifications']);
    Route::put('studentMarkAsRead',[StudentController::class,'markAsRead']);

    Route::post('raiseComplaintStudent',[StudentController::class,'raiseComplaint']);

    Route::put('updatePwdStd',[StudentController::class,'updatePwd']);
    Route::put('updateContactStd',[StudentController::class,'updateContact']);

    Route::post('sendOTPStd',[StudentController::class,"sendOtp"]);
    Route::post('otpVerifyStd',[StudentController::class,"otpVerification"]);

});

