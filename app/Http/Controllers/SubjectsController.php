<?php

namespace App\Http\Controllers;
use App\Models\subject;
use Illuminate\Http\Request;

class SubjectsController extends Controller
{
    public function add(Request $req) {
        $object = new subject;
        $object->subject_code = $req->input('subject_code');
        $object->subject_name = $req->input('subject_name');
        $object->L = $req->input('L');
        $object->P = $req->input('P');
        $object->C = $req->input('C');
        $object->save();
        return response()->json($object);

    }
    public function get(Request $req){
        $subjects = subject::all();
        return response()->json($subjects);
    }
}
