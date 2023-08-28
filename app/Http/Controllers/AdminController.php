<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\admin_login;
use Carbon\Carbon;
use App\Models\raise_complaint;
use App\Models\faculty;
use App\Models\Std_softcopie;
use App\Models\student;
use App\Models\students_login;
use App\Models\faculty_login;
use Illuminate\Support\Facades\Validator;
use App\Models\enrolled_student;


class AdminController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:admin-api');
    }
    public function adminEntry(Request $req)
    {
        $admin = admin_login::create([
            'admin_id' => $req->input('admin_id'),
            'password' => Hash::make($req->input('password'))
        ]);
        if ($admin) {
            return response()->json([$admin, 'status' => true]);
        } else {
            return response()->json(['status' => false]);
        }
    }
    public function login(Request $req)
    {
        $credentials = $req->only('admin_id', 'password');
        ;

        if (!$token = auth('admin-api')->attempt($credentials)) {
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
        return response()->json(auth('admin-api')->user());
    }
    public function logout()
    {
        JWTAuth::invalidate(JWTAuth::getToken());

        return response()->json(['message' => 'Successfully logged out'], 200);
    }
    function updatePassword(Request $req)
    {
        $admin_id = auth()->user()->admin_id;
        $old_password=$req->input("old_password");
        $new_password = $req->input('new_password');
        $confirm_password = $req->input('confirm_password');

        $rules = [
            'new_password' => 'required|regex:/^(?=.*[A-Z])(?=.*\d).{8,}$/'
        ];

        $validator = Validator::make($req->all(), $rules);

        if ($validator->fails() || $new_password != $confirm_password) {
            return response()->json(['error' => $validator->errors()]);
        } else {
            $admin = admin_login::where('admin_id', $admin_id)->first();
            if (Hash::check($old_password, $admin->password)) {
                $admin->password = Hash::make($new_password);
                $admin->save();

                return response()->json('true');
            }
            else{
                return response()->json(['Not success'=>'passwords doesnot match']);
            }
        }
    }
    public function getComplaints()
    {
        $object = raise_complaint::all();
        return response()->json($object);
    }
    public function deleteComplaint(Request $req)
    {
        $id = $req->input('id');
        $object = raise_complaint::where("id", $id);
        if (!$object) {
            return response()->json(["message" => "Record not found"]);
        }
        $result = $object->delete();
        if ($result) {
            return response()->json(["message" => "record deleted"]);
        }
    }
    public function facultyReg(Request $req)
    {
    $object = new faculty;
    $object->faculty_id=$req->faculty_id;
    $object->name=$req->name;
    $object->email=$req->email;
    $object->alt_email=$req->altEmail;
    $object->phone_num=$req->phoneNo;
    $object->aadhar_num=$req->aadharNo;
    $object->designation=$req->designation;
    $object->experience=$req->experience;
    $result=$object->save();
    if($result)
    {
        $facultyLogin=new faculty_login();
        $facultyLogin->faculty_id=$req->faculty_id;
        $facultyLogin->password=Hash::make('Secret123');
        $facultyLogin->save();


        return response()->json($object);
    }
    else
    {
        return['result'=>'operation failed'];
    }

}
public function getFaculty()
{
    $object=faculty::all();
    return response()->json($object);
}
public function studentReg(Request $req)
{
    try {
        $object = new student;
        dd($req->rollNumber);
        $object->roll_num = $req->rollNumber;
        $object->name = $req->name;
        $object->email = $req->email;
        $object->phone_num = $req->phoneNo;
        $object->aadhar_num = $req->aadharNo;
        $object->mother_name = $req->motherName;
        $object->father_name = $req->fatherName;
        $object->parent_num = $req->parentPhNo;
        $object->dob = $req->dob;
        $object->permanent_addr = $req->permanentAddr;
        $object->present_addr = $req->presentAddr;
        $object->blood_group = $req->bloodGroup;
        $object->caste = $req->caste;
        $object->religion = $req->religion;

        $result = $object->save();

        if ($result) {
            // Create directory if not exists
            $directoryPath = public_path('Student_softCopies/' . $req->rollNumber);
            if (!file_exists($directoryPath)) {
                mkdir($directoryPath, 0777, true);
            }

            // Insert row in student_login table
            $studentLogin = new students_login();
            $studentLogin->student_id = $req->rollNumber;
            $studentLogin->password = Hash::make('Dit123'); // You can hash this password for security
            $studentLogin->save();

            return response()->json($object);
        } else {
            return response()->json(['result' => 'operation failed']);
        }
    } catch (\Exception $e) {
        return response()->json(['error' => $e->getMessage()]);
    }
}

public function getStudents(Request $req)
{
    $department=$req->query('department');
    $semester =$req->query('semester');
    switch ($department) {
        case 'MCA':
            $branch = 'F0';
            break;
        case 'Mtech-DS':
            $branch = 'DB';
            break;
        case 'Mtech-CNIS':
            $branch = 'D6';
            break;
        case 'Mtech-SE':
            $branch = 'D2';
            break;
        case 'Mtech-CS':
            $branch = 'D0';
            break;
    }
    $year = enrolled_student::where('code', $branch)->where('semester', $semester)->value('year');
    $students = student::where('roll_num', 'LIKE', $year . '___' . $branch . '%')->get();
    //$object=student::all();
    return response()->json($students);
}
public function uploadAndSaveFiles(Request $req)
{
    try {
        $paths = '';
        $roll_num = $req->input('roll_num');
        $stdSoftCopy = new Std_softcopie();

        // Handle the soft copy columns
        $softCopyColumns = ['photo', 'aadhar', 'ssc_memo', 'inter_diploma_memo', 'grad_memo', 'transfer', 'provisional', 'community', 'income_ews', 'joining_report', 'allotment_order', 'bonafide_inter', 'bonafide_grad'];

        foreach ($softCopyColumns as $column) {
            if ($req->hasFile($column)) {
                $file = $req->file($column);
                $fileExtension = $file->getClientOriginalExtension();
                $fileName = $column . '.' . $fileExtension; // Use column name as filename
                $filePath = 'Student_softCopies/' . $roll_num . '/' . $fileName;

                $file->move(public_path('Student_softCopies/' . $roll_num), $fileName);

                $stdSoftCopy->$column = $filePath;
            }
        }

        $bonafides = $req->file('bonafides');
        // Handle bonafides files
        if (!empty($bonafides)) {
            $bonafidesPaths = [];

            foreach ($bonafides as $index => $bonafide) {
                $bonafideExtension = $bonafide->getClientOriginalExtension();
                $bonafideName = 'bonafide_' . ($index + 1) . '.' . $bonafideExtension;
                $bonafidePath = 'Student_softCopies/' . $roll_num . '/' . $bonafideName;

                $bonafide->move(public_path('Student_softCopies/' . $roll_num), $bonafideName);
                $bonafidesPaths[] = $bonafideName; // Store only the filename

                // Make sure to store the full path in the std_softcopies table
                $stdSoftCopy->$column = public_path($bonafidePath);
            }

            $stdSoftCopy->bonafides = implode('@', $bonafidesPaths);
        } else {
            return response()->json(['message' => 'No bonafides uploaded'], 400);
        }

        // Save the soft copies in the std_softCopies table
        $stdSoftCopy->roll_num = $roll_num;
        $stdSoftCopy->save();

        return response()->json(['message' => 'Soft copies saved successfully']);
    } catch (\Illuminate\Database\QueryException $e) {
        // Handle SQL errors
        return response()->json(['error' => 'An SQL error occurred: ' . $e->getMessage()]);
    } catch (\Exception $e) {
        // Handle other exceptions
        return response()->json(['error' => 'An error occurred while processing the files.']);
    }
}
}
