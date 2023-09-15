<?php

namespace App\Http\Controllers;

use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Validator;
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
        $validationRules=[
            'branch'=>'required|String|in:MCA,MTech',
            'semester'=>'required|numeric|between:1,4',
            'description'=>'required|string|max:255',
            'from'=>'required|date-format:Y-m-d',
            'to'=>'date-format:Y-m-d|after:from',
     ];
        $validator=Validator::make($req->all(),$validationRules);
        if($validator->fails()){
            return response()->json(['errors'=> $validator->errors()],422);
        }
        $object = new academic_calendar;
        $object->branch = $req->input("branch");
        $object->semester = $req->input('semester');
        $object->description = $req->input('description');
        $object->from_date = $req->input("from");
        $object->to_date = $req->input("to");
        if ($object->save()) {
            return response()->json('true');
        }
    }
    function get(Request $req)
    {
        $branch=$req->query("branch");
        $sem=$req->query("semester");
        $calendar= academic_calendar::where('branch',$branch)->where("semester",$sem)->get();
        return response()->json($calendar);
    }
    function update(Request $req)
    {
        $validationRules=[
            'branch'=>'required|String|in:MCA,MTECH-CS,MTECH-DS,MTECH-CNIS,MTECH-SE',
            'semester'=>'required|numeric|between:1,4',
            'description'=>'required|string|max:255',
            'from'=>'required|date-format:Y-m-d',
            'to'=>'date-format:Y-m-d|after:from',
        ];
        $validator=Validator::make($req->all(),$validationRules);
        if($validator->fails()){
            return response()->json(['errors'=> $validator->errors()],422);
        }
        $branch = $req->input("branch");
        $semester = $req->input("semester");
        $description = $req->input("description");

        $object = academic_calendar::where([
            ['branch', '=', $branch],
            ['semester', '=', $semester],
            ['description', '=', $description]
        ])->first();

        if ($object) {
            //$object->update(['from_date' => $req->input('from'), 'to_date' => $req->input('to')]);
            $object->from_date = $req->input("from");
            $object->to_date = $req->input("to");
            $object->save();
            return response()->json('true');
        } else {
            return response()->json(['message' => 'Record not found'], 404);
        }
    }
}
