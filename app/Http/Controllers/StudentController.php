<?php

namespace App\Http\Controllers;
use App\Models\daily_attendance;
use Illuminate\Validation\Rule;
use App\Models\notifications;
use App\Models\raise_complaint;
use App\Models\subject;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use Carbon\Carbon;
use App\Models\students_login;
use App\Models\student;
use App\Models\enrolled_student;
use App\Models\re_register;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use App\Mail\MailSender;
use App\Models\attendance_satisfied;
use App\Models\academic_calendar;
use App\Models\FeedbackQuestion;
use App\Models\FeedbackResponse;
use App\Models\FeedbackSubmission;
use App\Models\internal_mark;
use App\Models\Std_softcopie;
use App\Models\StudentForm;
use Illuminate\Database\QueryException;
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
        $validationRules=[
            'student_id'=>'required|regex:/^[2-9][0-9]031[FD][026B]0[0-9][0-9]$/',
            'password'=>'required'
        ];
        $validator=Validator::make($req->all(),$validationRules);

        if($validator->fails()){
            return response()->json(['errors'=>$validator->errors()],422);
        }

        $credentials = $req->only('student_id', 'password');
        //$student_id=$req->input('student_id');

        if (!$token = auth('student-api')->claims(['password' => $credentials['password']])->attempt($credentials)) {
            // dd($token);
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        return $this->respondWithToken($token,$credentials);

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
                $specialization = 'CNIS';
                break;
            case 'B':
                $specialization = 'Data science';
                break;
            case '2':
                $specialization = 'Software engineering';
                break;
            case '0':
                $specialization = 'Computer science';
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
            'new_password'=>'required|min:8|max:16|regex:/^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/',
        ];
        $customMessages = [
            'new_password.regex' => 'The password must contain at least one uppercase letter, one digit, and one special character.',
        ];
        $validator = Validator::make($req->all(), $rules, $customMessages);

        if ($validator->fails() || $new_password != $confirm_password) {
            $errors = $validator->errors();
            if ($new_password != $confirm_password) {
                $errors->add('confirm_password', 'Password and confirmation do not match.');
            }
        return response()->json(['error'=> $errors],422);
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
        $student_id = auth()->user()->student_id;
        $old_password = $req->input('old_password');
        $new_password = $req->input('new_password');
        $confirm_password = $req->input('confirm_password');

        $rules = [
            'new_password'=>'required|min:8|max:16|regex:/^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/',        ];
        $customMessages = [
            'new_password.regex' => 'The password must contain at least one uppercase letter, one digit, and one special character.',
        ];
        $errors=[];
        $validator = Validator::make($req->all(), $rules ,$customMessages);
        if ($validator->fails() || $new_password != $confirm_password) {
            $errors = $validator->errors();
            if ($new_password != $confirm_password) {
                $errors->add('confirm_password', 'Password and confirmation do not match.');
            }
        return response()->json(['error'=> $errors],422);
        }
        else{
        $student = students_login::where('student_id', $student_id)->first();

        if (Hash::check($old_password, $student->password)){
        $student->password = Hash::make($new_password);
        $student->save();
        return response()->json('true');
        }
        else
         {
            $errors['old_password']="Old Password does not match";
            return response()->json(['error' => $errors],422);
            // return response()->json(['Not Success' => 'Old password is incorrect.']);
        }
    }
}
 public function updateContact(Request $request)
    {
        $rules=[ 'mobile' => 'numeric|digits:10'];
        $validator = Validator::make($request->all(), $rules);
        if($validator->fails()){
            return response()->json(['errors'=>$validator->errors()],422);
        }
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
    {   $validationRules=[
        'student_id'=>'required|size:10|regex:/^[2-9][0-9]031[FD][026B]0[0-9][0-9]$/',
    ];
    $validator = Validator::make($req->all(), $validationRules);

    if ($validator->fails()) {
        return response()->json(['error' => $validator->errors()],422);
    }
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
            return response()->json(['error' => ['otp' => 'Invalid OTP entered. Please try again.']], 422);
        }
    }
    public function checkMarks(Request $req) {
        $roll_num = $req->query('roll_num');
        $branch_code = substr($roll_num, 5, 2);
        $sem = enrolled_student::where('year',substr($roll_num,0,2))->where('code',$branch_code)->value('semester');
        $today = date('Y-m-d');
        $branchCodes = array(
            'F0' => 'MCA',
            'D0' => 'MTECH-CS',
            'D2' => 'MTECH-SE',
            'D6' => 'MTECH-CNIS',
            'DB' => 'MTECH-DS'
        );
        $rollNumCodes = array(
           'F0' =>  'MC',
           'D0' =>  'CS',
           'D2' =>  'SE',
           'D6' =>  'CN',
           'DB' =>  'DS'
        );
        $mid2Date = academic_calendar::where('branch', $branchCodes[$branch_code])->where('semester', $sem)->where('description', 'Second Mid term examinations')->value('to_date');

        if ($today > $mid2Date) {
            // Check if all subjects' feedback responses are present for the given roll_num
            $subjects = subject::where('subject_code','LIKE',$rollNumCodes[$branch_code].$sem.'%')->pluck('subject_code');

            foreach ($subjects as $subject_code) {
                $feedback = FeedbackResponse::where('roll_num', $roll_num)
                    ->where('subject_code', $subject_code)
                    ->first();

                if (!$feedback) {
                    return response()->json(['error' => 'Feedback required']);
                }
            }

            // If all feedback is present, return marks
            $marks = internal_mark::where('roll_num', $roll_num)
                ->join('subjects', 'internal_marks.subject_code', '=', 'subjects.subject_code')
                ->select('internal_marks.subject_code', 'subjects.subject_name', 'internal_marks.mid1', 'internal_marks.mid2')
                ->get();

            if ($marks->count() > 0) {
                return response()->json($marks);
            } else {
                return response()->json(['error' => 'No marks found for the provided roll number'], 404);
            }
        } else {
            // If today is before mid2Date, return marks as usual
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
    public function checkAttendanceDayWise(Request $req)
    {
        $subject_code=$req->query('subject_code');
        $roll_num=auth()->user()->student_id;
        $present=daily_attendance::where('roll_num',$roll_num)->where('subject_code',$subject_code)->where('status',1)->pluck('date');
        $absent=daily_attendance::where('roll_num',$roll_num)->where('subject_code',$subject_code)->where('status',0)->pluck('date');
        return response()->json([
            'present' => $present,
            'absent' => $absent,
        ]);
    }
    public function getCalendar()
    {
        $roll_num=auth()->user()->student_id;
        $branchCode=substr($roll_num,5,2);
        $year=substr($roll_num,0,2);
        $rollNumCodes = array(
            'F0' => 'MCA',
            'D0' => 'MTech',
            'D2' => 'MTech',
            'D6' => 'MTech',
            'DB' => 'MTech'
        );
        $branch = $rollNumCodes[$branchCode];
        $sem=enrolled_student::where('code',$branchCode)->where('year',$year)->value('semester');
        //return response()->json($sem);
        $calendar= academic_calendar::where('branch',$branch)->where("semester",$sem)->get();
        return response()->json($calendar);
    }
    public function enrolledSubjects()
    {
        $roll_num=auth()->user()->student_id;
        $branchCode=substr($roll_num,5,2);
        $year=substr($roll_num,0,2);
        $rollNumCodes = array(
            'F0' => 'MC',
            'D0' => 'CS',
            'D2' => 'SE',
            'D6' => 'CN',
            'DB' => 'DS'
        );
        $branch = $rollNumCodes[$branchCode];
        $sem=enrolled_student::where('code',$branchCode)->where('year',$year)->value('semester');
        $subjects=subject::where('subject_code','LIKE',$branch.$sem."%")->pluck('subject_code');
        $reRegistered = re_register::where('roll_num', $roll_num)->pluck('subject_code');
        $finalArray = collect($subjects)->concat($reRegistered)->toArray();
        $subjectNames = subject::whereIn('subject_code', $finalArray)->pluck('subject_name', 'subject_code');



        $responseArray = [];
        foreach ($finalArray as $code) {
            $responseArray[] = [
                'subject_code' => $code,
                'subject_name' => $subjectNames[$code]
            ];
        }

        return response()->json($responseArray);
    }
    public function getAvailableForms(){
        try {
            $student_id = auth()->user()->student_id;
            $year = substr($student_id, 0, 2);
            $code = substr($student_id, 5, 2);

            $sem = enrolled_student::where('year', $year)
                                    ->where('code', $code)
                                    ->value('semester');

            if ($sem === null) {
                return response()->json(['error' => 'Semester information not found for the student'], 404);
            }

            $forms = StudentForm::where('form_id', 'LIKE', '_'.$code.'%')
                ->where(function ($query) use ($sem) {
                    $query->where('form_id', 'LIKE', '%'.$sem)
                          ->orWhere('form_id', 'LIKE', '%0');
                })
                ->get();

            foreach ($forms as $form) {
                $form->path = asset($form->path);
            }

            return response()->json(['data' => $forms], 200);
        } catch (QueryException $e) {
            return response()->json(['error' => 'Database error: ' . $e->getMessage()], 500);
        } catch (\Exception $e) {
            return response()->json(['error' => 'An error occurred while processing the request'], 500);
        }
    }

public function getSoftCopiesUrls(Request $req)
{
    $rollNumber = $req->get('roll_num');
    $softCopies = Std_softcopie::where('roll_num', $rollNumber)->first();

    if (!$softCopies) {
        return response()->json(['error' => 'Soft copies not found'], 404);
    }

    $softCopyUrls = [];

    $softCopyColumns = ['photo', 'aadhar', 'ssc_memo', 'inter_diploma_memo', 'grad_memo', 'transfer', 'provisional', 'community', 'income_ews', 'joining_report', 'allotment_order', 'bonafide_inter', 'bonafide_grad'];

    foreach ($softCopyColumns as $column) {
        if (!empty($softCopies->$column)) {
            $softCopyUrls[$column] = asset($softCopies->$column);
        }
    }

    return response()->json(['softCopies' => $softCopyUrls]);
}
public function requiredFeedbackSubjects(Request $req){
    try {
        $roll_num = auth()->user()->student_id;
        $branch_code = substr($roll_num, 5, 2);
        $sem = enrolled_student::where('year', substr($roll_num, 0, 2))
            ->where('code', $branch_code)
            ->value('semester');

        $rollNumCodes = array(
            'F0' => 'MC',
            'D0' => 'CS',
            'D2' => 'SE',
            'D6' => 'CN',
            'DB' => 'DS'
        );

        $subjects = subject::where('subject_code', 'LIKE', $rollNumCodes[$branch_code] . $sem . '%')->pluck('subject_code');

        $feedbackSubjects = FeedbackResponse::where('roll_num', $roll_num)->pluck('subject_code');

        // Find subjects that are missing feedback responses
        $missingSubjects = $subjects->diff($feedbackSubjects);

        // Get the subject names for the missing subjects
        $missingSubjectNames = subject::whereIn('subject_code', $missingSubjects)
        ->pluck('subject_name', 'subject_code')
        ->toArray();
        // Create an array with subject code and name for missing subjects
        $missingSubjectsArray = [];
        foreach ($missingSubjects as $subjectCode) {
            $missingSubjectsArray[] = [
                'subject_code' => $subjectCode,
                'subject_name' => $missingSubjectNames[$subjectCode],
            ];
        }

        return response()->json($missingSubjectsArray);
    } catch (\Exception $e) {
        return response()->json(['error' => 'An error occurred: ' . $e->getMessage()], 500);
    }
}
public function getFeedbackQuestions()
{
    try {
        // Fetch questions from the FeedbackQuestion model
        $questions = FeedbackQuestion::select('question_number', 'question')->get();

        // Return the questions as JSON response
        return response()->json($questions);
    } catch (\Exception $e) {
        // Handle any exceptions if they occur
        return response()->json(['error' => 'An error occurred: ' . $e->getMessage()], 500);
    }
}
public function submitFeedback(Request $request)
{
    try {
        // Get the user's roll number and subject code from the request
        $rollNum = $request->input('roll_num');
        $subjectCode = $request->input('subject_code');

        // Get the feedback responses from the request
        $responses = $request->input('responses');

        // Merge the roll_num and subject_code into the responses array
        $responses = array_merge($responses, [
            'roll_num' => $rollNum,
            'subject_code' => $subjectCode,
        ]);

        // Store the responses in the FeedbackResponse model
        FeedbackResponse::create($responses);

        // Return a success response
        return response()->json(['message' => 'Feedback submitted successfully']);
    } catch (\Exception $e) {
        // Handle any exceptions if they occur
        return response()->json(['error' => 'An error occurred: ' . $e->getMessage()], 500);
    }
}



}
