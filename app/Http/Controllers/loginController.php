<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use App\Models\Student;

class loginController extends Controller
{
    function studentLogin(){
        return view("studentLogin");
    }

    public function verify(Request $request)
    {
        $student_id = $request->input('student_id');
        $password = $request->input('password');

        // Fetch the student details by student_id from the model
        $student = Student::where('student_id', $student_id)->first();

        if($student){
            if ($student->password == $password) {
                Session::put("user",$student_id);
                return redirect('studentHomePage');
            } else {
                return redirect()->back()->with('error', 'Invalid Password entered. Please try again.');
            }

        }
        else{
            return "student not found";
        }
    }


}
