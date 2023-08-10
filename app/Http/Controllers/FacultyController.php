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
use Illuminate\Support\Facades\Validator;
use App\Models\faculty_login;
use Illuminate\Support\Facades\Mail;
use App\Mail\MailSender;
use Illuminate\Support\Facades\Cache;


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
    public function enrolledStudents(Request $req)
    {
        $subject = $req->query('subject_code');
        $subject_code = substr($subject, 0, 2);
        $rollNumCodes = array(
            'MC' => 'F0',
            'CS' => 'D0',
            'SE' => 'D2',
            'CN' => 'D6',
            'DS' => 'DB'
        );
        $rollCode = $rollNumCodes[$subject_code];
        $sem = (int)substr($req->query('subject_code'), 2, 1);
        $year = enrolled_student::where('code', $rollCode)->where('semester', $sem)->value('year');
        $students = student::where('roll_num', 'LIKE', $year . '___' . $rollCode . '%')->pluck('roll_num');
        $reRegistered = re_register::where('subject_code', $subject)->pluck('roll_num');
        $sem = (int) substr($req->query('subject_code'), 2, 1);
        $year = enrolled_student::where('code', $rollCode)->where('semester', $sem)->value('year');
        $students = student::where('roll_num', 'LIKE', $year . '___' . $rollCode . '%')->pluck('roll_num');
        $reRegistered = re_register::where('subject_code', $subject)->pluck('roll_num');
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
                    $attendanceSatisfied->attended += (int)$status;
                    $attendanceSatisfied->total += 1;
                    $attendanceSatisfied->percentage = ($attendanceSatisfied->attended / $attendanceSatisfied->total) * 100;
                    $attendanceSatisfied->save();
                } else {
                    // Create new row
                    $attendanceSatisfied = new attendance_satisfied();
                    $attendanceSatisfied->roll_num = $studentId;
                    $attendanceSatisfied->subject_code = $subjectCode;
                    $attendanceSatisfied->attended = (int)$status;
                    $attendanceSatisfied->total = 1;
                    $attendanceSatisfied->percentage = ($attendanceSatisfied->attended / $attendanceSatisfied->total) * 100;
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
        $user = auth()->guard('faculty-api')->user()->faculty_id;
        $object = new raise_complaint;
        $object->from_id = $user;
        $object->description = $req->input("description");
        $object->date = date('Y-m-d');
        $result = $object->save();
        if ($result) {
            notifications::create([
                'sender_id' => $user,
                'receiver_id' => 'S101',
                'message' => 'I had raised a complaint,please Respond',
            ]);
            return response()->json($object);
        } else {
            return response()->json(['message' => 'could not save data']);
        }
    }

    public function addInternalMarks(Request $req)
    {
        $user = auth()->user()->faculty_id;
        $subject = $req->input('subject_code');
        $subject_code = substr($subject, 0, 2);
        $branchCodes = array(
            'MC' => 'MCA',
            'CS' => 'MTECH-CS',
            'SE' => 'MTECH-SE',
            'CN' => 'MTECH-CNIS',
            'DS' => 'MTECH-DS'
        );
        $sem = 4;
        $students = $req->get('students');
        $today = date('Y-m-d');
        $mid1Date = academic_calendar::where('branch', $branchCodes[$subject_code])->where('semester', $sem)->where('description', 'First Mid term examinations')->value('to_date');
        $mid2Date = academic_calendar::where('branch', $branchCodes[$subject_code])->where('semester', $sem)->where('description', 'Second Mid term examinations')->value('to_date');
        $semStartDate = academic_calendar::where('branch', $branchCodes[$subject_code])->where('semester', $sem)->where('description', 'End semester examinations')->value('from_date');
        if (is_array($students)) {

            if ($today > $mid1Date && $today < $mid2Date) {
                foreach ($students as $studentId => $marks) {
                    $internalMarks = new internal_mark();
                    $internalMarks->roll_num = $studentId;
                    $internalMarks->subject_code = $subject;
                    $internalMarks->mid1 = $marks;
                    $internalMarks->mid2 = null;
                    $internalMarks->save();
                    notifications::create([
                        'sender_id' => $user,
                        'receiver_id' => $studentId,
                        'message' => "Mid1 marks updated for the subject $subject",

                    ]);
                }

                return response()->json(['message' => 'Marks Added successfully']);
            } else {
                if ($today < $semStartDate) {

                    foreach ($students as $studentId => $marks) {
                        $internalMarks = internal_mark::where('roll_num', $studentId)->where('subject_code', $subject)->first();
                        $internalMarks->mid2 = $marks;
                        $internalMarks->save();
                        notifications::create([
                            'sender_id' => $user,
                            'receiver_id' => $studentId,
                            'message' => 'Mid2 marks updated, chuskogalaru',
                        ]);
                    }
                    return response()->json(['message' => 'Marks Added successfully']);
                } else {
                    return response()->json(['message' => 'Can\'t Upload, Sem exams Started']);
                }
            }
        } else {
            // Handle the case where $students is null or not an array
            return response()->json(['error' => 'Invalid student data'], 400);
        }
    }

    public function markAsRead(Request $req)
    {
        $notification = notifications::where('id',$req->input('id'))->first();
        if($notification){

            // Ensure the notification belongs to the current user
            if ($notification->receiver_id !== auth()->user()->faculty_id) {
                abort(403); // Return a forbidden response if the user tries to mark someone else's notification as read
            }
            $notification->update(['is_read' => true]);

            // Redirect back to the notifications index or any other appropriate page
            return response()->json(['message'=>'Marked as read successfully']);
        }
        else{
            return response()->json(['message'=>'Notification Not Found']);

        }
    }
    public function getNotifications()
    {
        $user = auth()->user()->faculty_id;
        $notifications =  notifications::where('receiver_id',$user)->orderBy('created_at', 'desc')->get();

        // Return the notifications as JSON response
        return response()->json(['notifications' => $notifications]);
    }
   public function updateContact(Request $request)
    {

        $request->validate([
            'mobile' => 'required',
        ]);

        $faculty_id = auth()->user()->faculty_id;
        //return $faculty_id;
        $newPhoneNumber = $request->input('mobile');

        $faculty = faculty::where('faculty_id', $faculty_id)->first();

        if ($faculty) {
            $faculty->phone_num = $newPhoneNumber;
            $faculty->save();
        }

        return response()->json(['success'=> 'Contact modified']);
    }
    function updatePassword(Request $req)
    {
        $faculty_id = auth()->user()->faculty_id;
        $new_password = $req->input('new_password');
        $confirm_password = $req->input('confirm_password');

        $rules = [
            'new_password' => 'required|regex:/^(?=.*[A-Z])(?=.*\d).{8,}$/'
        ];

        $validator = Validator::make($req->all(), $rules);

        if ($validator->fails() || $new_password != $confirm_password) {
            return response()->json(['error'=> $validator->errors()]);
        } else {
            $faculty = faculty_login::where('faculty_id', $faculty_id)->first();

            if ($faculty) {
                $faculty->password = Hash::make($new_password);
                $faculty->save();

                return response()->json('true');
            }
        }
    }
    public function sendOtp(Request $req)
    {
        $faculty_id = $req->input("faculty_id");
        $faculty_id= faculty::where("faculty_id", $faculty_id)->first();
        $email = $faculty_id->email;

        // Generate a random OTP
        $otp = mt_rand(100000, 999999);

        Cache::put('otp', $otp, 60);
        // Send the OTP to the client via email
        $mailData = [
            'subject' => 'OTP Verification',
            'title' => 'Mail from Laravel Project',
            'body' => 'Your OTP for verification is: ',
            'otp' => $otp,
        ];
        Mail::to($email)->send(new MailSender($mailData));

        return response()->json(["Success"=>"OTP SENT"]);
    }

    public function otpVerification(Request $req)
    {
        $user_otp = $req->input('otp');
        $actual_otp = Cache::get('otp');

        if ($actual_otp && $user_otp == $actual_otp) {

            return response()->json("verified otp");
        } else {
            return response()->json(['error'=> 'Invalid OTP entered. Please try again.']);
        }
    }
}
