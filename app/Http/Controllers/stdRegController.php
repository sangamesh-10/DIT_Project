<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use App\Models\student;
// use Validator;

class stdRegController extends Controller
{
    function stdRegistration(Request $req)
    {
        $student=new student;
        $student->roll_num=$req->rno;
        $student->name=$req->name;
        $student->email=$req->email;
        $student->phone_num=$req->phno;
        $student->aadhar_num=$req->aadharno;
        $student->mother_name=$req->mname;
        $student->father_name=$req->fname;
        $student->parent_num=$req->parentphno;
        $student->dob=$req->dob;
        $student->permanent_addr=$req->permanentaddr;
        $student->present_addr=$req->presentaddr;
        $student->blood_group=$req->bgroup;
        $student->caste=$req->caste;
        $student->religion=$req->religion;

        $result=$student->save();
        if($result)
        {
            return['result'=>'data has been saved'];
        }
        else
        {
            return['result'=>'operation failed'];
        }

            // $rules=["roll_num"=>"",
            //         "email"=>"/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/",
            //         "phone_num"=>" /^\d{10}$/"];
            // $validator=Validator::make($req->all(),$rules);
            $validator = Validator::make($req->all(), [
                'rno' => 'required|regex:/^\d{5}[A-Z]\d{4}$/',
                'name' => 'required|string|regex:/^[A-Za-z\s]+$/|max:255',
                'email' => 'required|email|max:255',
                'phno' => 'required|numeric|digits:10',
                'aadharno' => 'required|numeric|digits:12',
                'mname' => 'required|string|regex:/^[A-Za-z\s]+$/|max:255',
                'fname' => 'required|string|regex:/^[A-Za-z\s]+$/|max:255',
                'parentphno' => 'required|numeric|digits:10',
                'dob' => 'required|date|Before::now()->subYears(18)',
                'permanentaddr' => 'required|string',
                'presentaddr' => 'required|string',
                'bgroup' => 'required|string|max:255',
                'caste' => 'required|string|max:255',
                'religion' => 'required|string|max:255',
            ]);


            if($validator->fails())
            {
                return redirect('studentRegistration')->WithErrors($validator);
            }
            else
            {
            return["Hello"];
            }
    }
}
