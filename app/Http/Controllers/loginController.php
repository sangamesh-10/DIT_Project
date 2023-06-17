<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use App\Models\Student;
use App\Models\Std_softcopie;

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
        $softCopies = Std_softcopie::where('roll_num', $student_id)->first();
        $img=$softCopies->photo;
        if($student){
            if ($student->password == $password) {
                Session::put("user",$student_id);

                return redirect()->route('studentHomePage', ['student' => $student, 'softCopies' => $softCopies]);
            } else {
                return redirect()->back()->with('error', 'Invalid Password entered. Please try again.');
            }

        }
        else{
            return "student not found";
        }
    }
    public function studentHomePage(Request $request)
{
    $student = $request->route('student');
    $softCopies = $request->route('softCopies');

    return view('studentHomePage', compact('student', 'softCopies'));
}



}
