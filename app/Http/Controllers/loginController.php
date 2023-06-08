<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class loginController extends Controller
{
    function studentLogin(){
        return view("studentLogin");
    }
}
