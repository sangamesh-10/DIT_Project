<?php

namespace App\Http\Controllers;

use App\Models\academic_calendar;
use App\Models\attendance_satisfied;
use App\Models\daily_attendance;
use App\Models\enrolled_student;
use App\Models\faculty;
use App\Models\internal_mark;
use App\Models\notifications;
use Tymon\JWTAuth\Facades\JWTAuth;
use Carbon\Carbon;
use App\Models\re_register;
use App\Models\student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\raise_complaint;

class FacultyController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:faculty-api');
    }
    public function login(Request $req)
    {
        $credentials = $req->only('faculty_id', 'password');

        if (!$token = auth('faculty-api')->attempt($credentials)) {
            // dd($token);
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        return $this->respondWithToken($token);
    }


    protected function respondWithToken($token)
    {
        $expiration = Carbon::now()->addMinutes(JWTAuth::factory()->getTTL());

        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => $expiration->timestamp,
        ]);
    }

    public function me()
    {
        $faculty_id = auth()->guard('faculty-api')->user()->faculty_id;
        $faculty = faculty::where('faculty_id', $faculty_id)->first();
        // dd($faculty_id);
        return response()->json($faculty);
    }



    public function logout()
    {
        auth()->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }
    public function enrolledStudents(Request $req){
        $subject = $req->query('subject_code');
        $subject_code = substr($subject,0,2);
        $rollNumCodes= array(
            'MC' => 'F0',
            'CS' => 'D0',
            'SE' => 'D2',
            'CN' => 'D6',
            'DS' => 'DB'
        );
        $rollCode = $rollNumCodes[$subject_code];
        $sem = (int)substr($req->query('subject_code'),2,1);
        $year= enrolled_student::where('code',$rollCode)->where('semester',$sem)->value('year');
        $students = student::where('roll_num','LIKE',$year.'___'.$rollCode.'%')->pluck('roll_num');
        $reRegistered = re_register::where('subject_code',$subject)->pluck('roll_num');
        $finalArray = collect($students)->concat($reRegistered)->toArray();
        return response()->json($finalArray);
    }
    public function markAttendance(Request $req)
        {
            $subjectCode = $req->input('subject_code');
            $students = $req->get('students');
            // dd($req->all());
            // Check if $students is not null and is an array
            // return response(gettype($students));
            if (is_array($students)) {
                foreach ($students as $studentId => $status) {
                    $attendance = new daily_attendance();
                    $attendance->roll_num = $studentId;
                    $attendance->subject_code = $subjectCode;
                    $attendance->date = date('Y-m-d');
                    $attendance->status = (int)$status;
                    $attendance->save();

                    $attendanceSatisfied = attendance_satisfied::where('roll_num', $studentId)
                    ->where('subject_code', $subjectCode)
                    ->first();

                if ($attendanceSatisfied) {
                    // Update existing row
                    $attendanceSatisfied->attended+=(int)$status;
                    $attendanceSatisfied->total+=1;
                    $attendanceSatisfied->percentage = ($attendanceSatisfied->attended/$attendanceSatisfied->total)*100;
                    $attendanceSatisfied->save();
                } else {
                    // Create new row
                    $attendanceSatisfied = new attendance_satisfied();
                    $attendanceSatisfied->roll_num = $studentId;
                    $attendanceSatisfied->subject_code = $subjectCode;
                    $attendanceSatisfied->attended = (int)$status;
                    $attendanceSatisfied->total = 1;
                    $attendanceSatisfied->percentage = ($attendanceSatisfied->attended/$attendanceSatisfied->total)*100;
                    $attendanceSatisfied->save();
                }
                }

                return response()->json(['message' => 'Attendance saved successfully']);
            } else {
                // Handle the case where $students is null or not an array
                return response()->json(['error' => 'Invalid student data'], 400);
            }
        }
        public function raiseComplaint(Request $req)
    {
        $user = auth()->guard('faculty-api')->user();
        $object = new raise_complaint;
        $object->from_id= $user->faculty_id;
        $object->description=$req->input("description");
        $object->date=date('Y-m-d');
        $result=$object->save();
        if($result){
        return response()->json($object);
        }
        else{
            return response()->json(['message'=>'could not save data']);
        }
    }

        public function addInternalMarks(Request $req){
            $user = auth()->user()->faculty_id;
            $subject = $req->input('subject_code');
            $subject_code = substr($subject,0,2);
            $branchCodes= array(
                'MC' => 'MCA',
                'CS' => 'MTECH-CS',
                'SE' => 'MTECH-SE',
                'CN' => 'MTECH-CNIS',
                'DS' => 'MTECH-DS'
            );
            $sem = 4;
            $students = $req->get('students');
            $today= date('Y-m-d');
            $mid1Date = academic_calendar::where('branch',$branchCodes[$subject_code])->where('semester',$sem)->where('description','First Mid term examinations')->value('to_date');
            $mid2Date = academic_calendar::where('branch',$branchCodes[$subject_code])->where('semester',$sem)->where('description','Second Mid term examinations')->value('to_date');
            $semStartDate = academic_calendar::where('branch',$branchCodes[$subject_code])->where('semester',$sem)->where('description','End semester examinations')->value('from_date');
            if (is_array($students)) {

                    if($today > $mid1Date && $today < $mid2Date ){
                        foreach ($students as $studentId => $marks) {
                            $internalMarks = new internal_mark();
                            $internalMarks->roll_num = $studentId;
                            $internalMarks->subject_code = $subject;
                            $internalMarks->mid1 = $marks;
                            $internalMarks->mid2 = null;
                            $internalMarks->save();
                            notifications::create([
                                'sender_id'=>$user,
                                'receiver_id'=>$studentId,
                                'message'=>'Mid1 marks updated, chuskogalaru',
                            ]);
                        }

                        return response()->json(['message' => 'Marks Added successfully']);

                    }
                    else{
                        if($today < $semStartDate){

                            foreach ($students as $studentId => $marks) {
                                $internalMarks = internal_mark::where('roll_num',$studentId)->where('subject_code',$subject)->first();
                                $internalMarks->mid2 = $marks;
                                $internalMarks->save();
                                notifications::create([
                                    'sender_id'=>$user,
                                    'receiver_id'=>$studentId,
                                    'message'=>'Mid2 marks updated, chuskogalaru',
                                ]);
                            }
                            return response()->json(['message' => 'Marks Added successfully']);
                        }
                        else{
                            return response()->json(['message' => 'Can\'t Upload, Sem exams Started']);
                        }

                    }
                }

             else {
                // Handle the case where $students is null or not an array
                return response()->json(['error' => 'Invalid student data'], 400);
            }
        }
}
