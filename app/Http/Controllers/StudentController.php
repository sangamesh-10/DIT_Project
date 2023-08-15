<?php

namespace App\Http\Controllers;
use App\Models\notifications;
use App\Models\raise_complaint;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use Carbon\Carbon;
use App\Models\students_login;
use App\Models\student;
use App\Models\enrolled_student;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use App\Mail\MailSender;
use App\Models\attendance_satisfied;
use App\Models\internal_mark;
use Illuminate\Mail\Mailables\Attachment;
use Illuminate\Support\Facades\Cache;



class StudentController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:student-api');
    }
    public function login(Request $req)
    {
        $credentials = $req->only('student_id', 'password');
        $student_id=$req->input('student_id');

        if (!$token = auth('student-api')->attempt($credentials)) {
            // dd($token);
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        return $this->respondWithToken($token,$student_id);

    }
    protected function respondWithToken($token,$student_id)
    {
        $expiration = Carbon::now()->addMinutes(JWTAuth::factory()->getTTL());

        return response()->json([
            'user' => auth()->guard('student-api')->user()->student_id,
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => $expiration->timestamp,
        ]);
    }
    public function me()
    {
        $user = auth()->guard('student-api')->user();
        $loginId = $user->student_id;
        $object=Student::where("roll_num",$loginId)->first();
        return response()->json($object);
    }
public function enrolledStds()
{
    $user = auth()->guard('student-api')->user();
    $loginId = $user->student_id;

    // Fetch the enrolled student details from the "enrolledstudents" table based on the composite key
    $enrolledStudent = enrolled_student::where([
        "year" => substr($loginId, 0, 2),
        "code" => substr($loginId, 5, 2)
    ])->first();

    // If enrolled student details are not found, return an error response
    if (!$enrolledStudent) {
        return response()->json(['error' => 'Enrolled student details not found'], 404);
    }

    // Extract the studying year from the "year" field and compute the batch
    $studyingYear = $enrolledStudent->year;
    $batchPrefix = "20"; // The prefix for the batch
    $batch = $batchPrefix . $studyingYear . "-" . (intval($studyingYear) + 2);

    // Extract the 6th and 7th characters of the login ID
    $sixthCharacter = substr($loginId, 5, 1);
    $seventhCharacter = substr($loginId, 6, 1);

    // Determine the branch and specialization based on the extracted characters
    $branchDescription = '';
    $specialization = '';

    if ($sixthCharacter === 'F') {
        $branchDescription = 'MCA';
        $specialization = 'MCA'; // Specialization for MCA
    } elseif ($sixthCharacter === 'D') {
        $branchDescription = 'Mtech';
        // Determine the specialization based on the 7th character
        switch ($seventhCharacter) {
            case '6':
                $specialization = 'cnis';
                break;
            case 'B':
                $specialization = 'data science';
                break;
            case '2':
                $specialization = 'software engineering';
                break;
            case '0':
                $specialization = 'computer science';
                break;
            default:
                $specialization = 'Unknown Specialization';
                break;
        }
    } else {
        $branchDescription = 'Unknown Branch';
    }

    // Include the batch, branch, specialization, and semester in the response
    return response()->json([
        'batch' => $batch,
        'branch' => $branchDescription,
        'specialization' => $specialization,
        'semester' => $enrolledStudent->semester
    ]);
}

    public function getNotifications()
    {
        $user = auth()->user()->student_id;
        $notifications =  notifications::where('receiver_id',$user)->where('is_read',0)->orderBy('created_at', 'desc')->get();

        // Return the notifications as JSON response
        return response()->json(['notifications' => $notifications]);
    }
    public function logout()
    {
        auth()->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }

    public function raiseComplaint(Request $req)
    {
        try {
            $user = auth()->guard('student-api')->user()->student_id;
            $object = new raise_complaint;
            $object->from_id = $user;
            $object->description = $req->input("description");
            $object->date = date('Y-m-d');

            // Validate and save the complaint
            $result = $object->save();

            if ($result) {
                notifications::create([
                    'sender_id' => $user,
                    'receiver_id' => 'S101',
                    'message' => 'I had raised a complaint,please Respond',
                ]);

                $to_email = 'anupamavegesna1331@gmail.com';
                $subject = 'Complaint Raised';
                $message = 'A complaint has been raised by ' . $user . '. Please see the description below.';
                $message .= "\n\n" . $req->input("description");

                $attachments = [];

                if ($req->hasFile('attachments')) {
                    foreach ($req->file('attachments') as $file) {
                        $filename = $file->getClientOriginalName();
                        $data = file_get_contents($file->getRealPath());

                        $attachments[] = Attachment::fromPath($file)
                            ->as('Report.pdf')
                            ->withMime('application/pdf');
                    }
                }

                $mailData = [
                    'user' => $user,
                    'view' => 'emails.Complaints',
                    'subject' => $subject,
                    'title' => 'Mail from Laravel Project',
                    'body' => $message,
                    'attachments' => $attachments,
                ];

                Mail::to($to_email)->send(new MailSender($mailData));

                return response()->json($object);
            }
        } catch (\Exception $e) {
            // Handle any exceptions that occur
            return response()->json(['error' => 'An error occurred while raising the complaint.'. $e->getMessage()], 500);
        }
    }
    public function markAsRead(Request $req)
    {
        $notification = notifications::where('id',$req->input('id'))->first();
        if($notification){

            // Ensure the notification belongs to the current user
            if ($notification->receiver_id !== auth()->user()->student_id) {
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
    public function setPwd(Request $req)
    {
        $student_id =$req->input('student_id');
        $new_password = $req->input('new_password');
        $confirm_password = $req->input('confirm_password');

        $rules = [
            'new_password' => 'required|regex:/^(?=.*[A-Z])(?=.*\d).{8,}$/'
        ];

        $validator = Validator::make($req->all(), $rules);

        if ($validator->fails() || $new_password != $confirm_password) {
        return response()->json(['error'=> $validator->errors()]);
        } else {
            $student = students_login::where('student_id', $student_id)->first();

            if ($student) {
                $student->password = Hash::make($new_password);
                $student->save();
                return response()->json('true');
            }
        }
    }
    public function updatePwd(Request $req)
    {
        $student_id =auth()->user()->student_id;
        $old_password=$req->input('old_password');
        $new_password = $req->input('new_password');
        $confirm_password = $req->input('confirm_password');

        $rules = [
            'new_password' => 'required|regex:/^(?=.*[A-Z])(?=.*\d).{8,}$/'
        ];

        $validator = Validator::make($req->all(), $rules);

        if ($validator->fails() || $new_password != $confirm_password) {
        return response()->json(['error'=> $validator->errors()]);
        } else {
            $student = students_login::where('student_id', $student_id)->first();
            if (Hash::check($old_password, $student->password)) {
                $student->password = Hash::make($new_password);
                $student->save();
                return response()->json('true');
                //return response()->json(['success'=> 'Password modified']);
            }
            else{
                return response()->json(['Not success'=>'passwords doesnot match']);
            }
        }
    }
    public function updateContact(Request $request)
    {

        $request->validate([
            'mobile' => 'required',
        ]);

        $student_id = auth()->user()->student_id;
        $newPhoneNumber = $request->input('mobile');

        $student = Student::where('roll_num', $student_id)->first();

        if ($student) {
            $student->phone_num = $newPhoneNumber;
            $student->save();
        }

        return response()->json(['success'=> 'Contact modified']);
    }

    public function sendOtp(Request $req)
    {
        $student_id = $req->input("student_id");
        $student = Student::where("roll_num", $student_id)->first();
        $email = $student->email;

        $otp = mt_rand(100000, 999999);

        Cache::put('otp', $otp, 60);
        $mailData = [
            'view' =>'emails.OtpEmail',
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

            return response()->json("true");
        } else {
            return response()->json(['error'=> 'Invalid OTP entered. Please try again.']);
        }
    }


    public function checkMarks(Request $req) {
        $roll_num = $req->query('roll_num');

        $marks = internal_mark::where('roll_num', $roll_num)
            ->join('subjects', 'internal_marks.subject_code', '=', 'subjects.subject_code')
            ->select('internal_marks.subject_code', 'subjects.subject_name', 'internal_marks.mid1', 'internal_marks.mid2')
            ->get();

        if ($marks->count() > 0) {
            return response()->json($marks);
        } else {
            return response()->json(['error' => 'No marks found for the provided roll number'], 404);
        }
    }
    public function checkAttendance(Request $req){
        $roll_num= $req->query('roll_num');
        $attendance=attendance_satisfied::where('roll_num', $roll_num)
        ->join('subjects', 'attendance_satisfied.subject_code', '=', 'subjects.subject_code')
        ->select('attendance_satisfied.subject_code', 'subjects.subject_name', 'attendance_satisfied.attended', 'attendance_satisfied.total','attendance_satisfied.percentage')
        ->get();
        if ($attendance->count() > 0) {
            return response()->json($attendance);
        } else {
            return response()->json(['error' => 'No attendace record found for the provided roll number'], 404);
        }
    }




}
