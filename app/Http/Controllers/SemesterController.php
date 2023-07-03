<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\enrolled_student;

class SemesterController extends Controller
{
    public function add(Request $req)
    {
        $object = new enrolled_student;
        $object->year = $req->input('year');
        $object->code = $req->input('code');
        $object->semester = $req->input('semester');
        $object->save();
        return response()->json($object);
    }
    public function get()
    {
        $ans = enrolled_student::all();
        return response()->json($ans);
    }
    public function update(Request $req)
    {
        $year = $req->input('year');
        $code = $req->input('code');

        $object = enrolled_student::where('year', $year)->where('code', $code)->first();
        // return response()->json($object);

        if (!$object) {
            return response()->json(['result' => 'Record not found'], 404);
        }

        $object->semester = $req->input('semester');
        $result = $object->save();

        if ($result) {
            return response()->json($object);
        } else {
            return response()->json(['result' => 'Value not updated'], 500);
        }
    }

    public function delete(Request $req)
    {
        $year = $req->input('year');
        $code = $req->input('code');

        $object = enrolled_student::where('year', $year)->where('code', $code)->first();

        if (!$object) {
            return response()->json(['result' => 'Record not found'], 404);
        }

        $object->delete();

        return response()->json(['result' => 'Record deleted']);
    }
}
