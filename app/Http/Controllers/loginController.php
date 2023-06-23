<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use App\Models\students_login;
use App\Models\faculty_login;
use App\Models\Std_softcopie;
use App\Models\student;

class loginController extends Controller
{
    function studentLogin(){
        return view("studentLogin");
    }
    function facultyLogin(){
        return view("facultyLogin");
    }

    public function verify(Request $request)
    {
        $student_id = $request->input('student_id');
        $password = $request->input('password');

        // Fetch the student details by student_id from the model
        $studentLogin = Students_login::where('student_id', $student_id)->first();
        $student = student::where('roll_num', $student_id)->first();
        $softCopies = Std_softcopie::where('roll_num', $student_id)->first();
        // $img=$softCopies->photo;
        if($studentLogin){
            if ($studentLogin->password == $password) {
                Session::put("user",$student_id);
                return $student;
                // return redirect()->route('studentHomePage', ['student' => $student, 'softCopies' => $softCopies]);
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
    // return Session::get('user');
    return view('studentHomePage', compact('student', 'softCopies'));
}

    public function verifyFacultyLogin(Request $req)
{
    $faculty_id = $req->input('faculty_id');
    $password = $req->input('password');

    $faculty = faculty_login::where('faculty_id', $faculty_id)->first();
    //return $faculty;
    //return faculty_login::all();

    if ($faculty) {
        if ($faculty->password == $password) {
            Session::put("faculty_user", $faculty_id);
            return redirect('facultyHomePage');
        } else {
            return redirect()->back()->with('error', 'Invalid password entered. Please try again.');
        }
    } else {
        return redirect()->back()->with('error', 'User not found. Please check the credentials and try again.');
    }
}

public function logout(Request $req){
    Session::flush();
    return redirect()->route('welcome');
}


}
