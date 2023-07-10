<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\academic_calendar;

class AcademicCalendarController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:admin-api');
    }
    function add(Request $req)
    {
        $object = new academic_calendar;
        $object->branch = $req->input("branch");
        $object->semester = $req->input('semester');
        $object->description = $req->input('description');
        $object->from_date = $req->input("from");
        $object->to_date = $req->input("to");
        $object->save();
        return response()->json($object);
    }
    function get()
    {
        $object = academic_calendar::all();
        return response()->json($object);
    }
    function update(Request $req)
    {
        $branch = $req->input("branch");
        $semester = $req->input("semester");
        $description = $req->input("description");

        $object = academic_calendar::where([
            ['branch', '=', $branch],
            ['semester', '=', $semester],
            ['description', '=', $description]
        ])->first();

        if ($object)
        {
            //$object->update(['from_date' => $req->input('from'), 'to_date' => $req->input('to')]);
            $object->from_date=$req->input("from");
            $object->to_date=$req->input("to");
            $object->save();
            return response()->json(['message' => 'Record Updated'], 200);
        }
        else {
            return response()->json(['message' => 'Record not found'], 404);
        }
    }
}
