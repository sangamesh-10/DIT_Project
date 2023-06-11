<?php

namespace App\Http\Controllers;

use App\Models\students_login;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class updationsController extends Controller
{
    function stdPassword(Request $req)
    {
        $username = $req->input('username');
        //$currentPwd = $req->input('currentPwd');
        $newPwd = $req->input('newPwd');

        $rules = [
            'newPwd' => 'required|regex:/^(?=.*[A-Z])(?=.*\d).{8,}$/'
        ];

        $validator = Validator::make($req->all(), $rules);

        if ($validator->fails()) {
            return redirect()->back()->withErrors($validator);
        } else {
            $student = students_login::where('id', $username)->first();

            if ($student) {
                $student->password = $newPwd;
                $student->save();

                return "Password updated successfully.";
            }
        }
    }

}
