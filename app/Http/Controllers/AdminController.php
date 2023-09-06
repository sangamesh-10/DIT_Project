<?php

namespace App\Http\Controllers;

use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Validator;
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
use App\Models\StudentForm;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Database\QueryException;
use App\Models\faculty_login;
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
    $validationRules = [
        'faculty_id' => 'required|size:4|regex:/^S[0-3][0-9][1-9]$/|unique:faculty,faculty_id',
        'name' => 'required|string|max:255',
        'email' => 'required|email|unique:faculty,email|ends_with:gmail.com,outlook.com,yahoo.com',
        'altEmail' => 'nullable|email|different:email|ends_with:gmail.com,outlook.com,yahoo.com',
        'phoneNo' => 'numeric|digits:10|unique:faculty,phone_num',
        'aadharNo' => 'numeric|digits:12|unique:faculty,aadhar_num',
        'designation' => 'required|string',
        'experience' => 'required|numeric|digits:2',
    ];

    $validator = Validator::make($req->all(), $validationRules);

    if ($validator->fails()) {
        return response()->json(['errors' => $validator->errors()], 422); // 422 Unprocessable Entity
    }

    $object = new faculty;
    $object->faculty_id = $req->faculty_id;
    $object->name = $req->name;
    $object->email = $req->email;
    $object->alt_email = $req->altEmail;
    $object->phone_num = $req->phoneNo;
    $object->aadhar_num = $req->aadharNo;
    $object->designation = $req->designation;
    $object->experience = $req->experience;

    $result = $object->save();
    if ($result) {
        return response()->json($object);
    } else {
        return ['result' => 'operation failed'];
    }
}

public function getFaculty()
{
    $object=faculty::all();
    return response()->json($object);
}
public function studentReg(Request $req)
    {
        $validationRules = [
            'rollNumber' => 'required|size:10|regex:/^[2-9][0-9]031[FD][026B]0[0-9][0-9]$/|unique:students,r',
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:students,email|ends_with:gmail.com,outlook.com,yahoo.com',
            'phoneNo' => 'required|numeric|digits:10|unique:students,phone_num',
            'aadharNo' => 'required|numeric|digits:12|unique:students,aadhar_num',
            'motherName'=>'required|string|max:255',
            'fatherName'=>'required|string|max:255',
            'parentPhNo'=>'required|numeric|digits:10',
            'dob'=>'required|date|before:'.now()->subYears(18)->format('Y-m-d'),
            'permanentAddr'=>'required|string|max:255',
            'presentAddr'=>'required|string|max:255',
            'bloodGroup'=>'required|in:A+,A-,B+,B-,AB+,AB-,O+,O-',
            'caste' => [
                'required',
                'string',
                'max:255',
                Rule::in(array_map('strtolower', ['SC', 'ST', 'BC', 'EWS','OC', 'Other'])),
            ],
            'religion' => [
                'required',
                'string',
                'max:255',
                Rule::in(array_map('strtolower', ['Hindu', 'Muslim', 'Christian', 'Sikh', 'Buddhist', 'Jain', 'Other'])),
            ],
];
        $validator = Validator::make($req->all(), $validationRules);
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422); // 422 Unprocessable Entity
        }
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
public function getStudents()
{
    $object=student::all();
    return response()->json($object);
}
public function uploadAndSaveFiles(Request $req)
{
   $validationRules=[
        'rollNumber'=>'size:10|regex:/^[2-9][0-9]031[FD][026B]0[0-9][0-9]$/',
    ];
    $validator= Validator::make($req->all(),$validationRules);
    if ($validator->fails()) {
        return response()->json(['errors' => $validator->errors()], 422); // 422 Unprocessable Entity
    }
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
public function addForms(Request $req)
{
    try {
        $id = $req->input('id');
        $name = $req->input('name');
        $formFilePath='';

        if ($req->hasFile('formFile')) {
            $formFile = $req->file('formFile');
            $fileExtension = $formFile->getClientOriginalExtension();

            $fileName = $name . '.' . $fileExtension;
            $formFilePath = 'forms/' . $fileName;

            $formFile->move(public_path('forms/'), $fileName);
        }

        // Create a new StudentForm instance
        $studentForm = new StudentForm();
        $studentForm->form_id = $id;
        $studentForm->form_name = $name;
        $studentForm->path = $formFilePath;
        $studentForm->save();

        return response()->json(['message' => 'Form added successfully'], 201);
    } catch (\Exception $e) {
        return response()->json(['error' => 'An error occurred while processing the request'], 500);
    }
}

    public function viewForms(){
        try{
        $forms = StudentForm::all();
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

    public function updateForm(Request $req){
        try {
            $id = $req->input('form_id');
            $name = $req->input('form_name');
            $values = $req->input('form_id')." ".$name;

            $form = StudentForm::where('form_id', $id)->where('form_name', $name)->firstOrFail();

            if ($req->hasFile('new_form_file')) {
                $formFile = $req->file('new_form_file');
                $fileExtension = $formFile->getClientOriginalExtension();

                $fileName = $name . '.' . $fileExtension;
                $form->path = 'forms/' . $fileName;

                $formFile->move(public_path('forms/'), $fileName);
            }

            $form->save();

            return response()->json(['message' => 'Form updated successfully'], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Form not found'.$e->getMessage(),$values], 404);
        } catch (QueryException $e) {
            return response()->json(['error' => 'Database error: ' . $e->getMessage()], 500);
        } catch (\Exception $e) {
            return response()->json(['error' => 'An error occurred while processing the request'], 500);
        }
    }

    public function deleteForm(Request $req)
    {
        try {
            $form_id = $req->input('form_id');
            $form_name = $req->input('form_name');

            $result = StudentForm::where('form_id', $form_id)->where('form_name', $form_name)->delete();
            if ($result === 0) {
                return response()->json(['message' => 'Record not found'], 404);
            }
            return response()->json(['result' => 'Record deleted'], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Record not found'], 404);
        } catch (\Exception $e) {
            return response()->json(['error' => 'An error occurred while processing the request'.$e->getMessage()], 500);
        }
    }
}
