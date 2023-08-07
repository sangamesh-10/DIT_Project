<?php

namespace App\Http\Controllers;

use App\Models\enrolled_student;
use App\Models\noticeboard;
use App\Models\notifications;
use App\Models\re_register;
use App\Models\student;
use Illuminate\Http\Request;

class NoticeBoardController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:admin-api');
    }
    public function add(Request $req)
    {
        $req->validate([
            'notice_id' => 'required',
            'description' => 'required',
            'file' => 'required|mimes:pdf|max:2048', // PDF file, max size 2MB
        ]);
        if ($req->hasFile('file')) {
            $file = $req->file('file');
            $fileName = $req->description . '.' . $file->getClientOriginalExtension();
            $filePath = 'noticeBoard/' . $fileName;

            $file->move(public_path('noticeBoard'), $fileName);
            $object = new noticeboard;
            $object->notice_id = $req->input('notice_id');
            $object->description = $req->input('description');
            $object->date = date('Y-m-d');
            $object->path = $filePath;
            $result = $object->save();
        }
        if($result){
            // NoticeBoardController::sendNotifications($object->notice_id,$object->description);
            return response()->json(['message'=>'NoticeBoard  Updated']);
        }
        else{
            return response()->json(['message'=>'NoticeBoard not Updated'],500);
        }
    }
    public function get(Request $req)
    {

         $perPage = $req->query('perPage', 10);

        $notices = noticeboard::paginate($perPage);
        foreach ($notices as $notice) {
            $notice->path = asset($notice->path);
        }

        return response()->json(['data' => $notices]);
    }
    public function update(Request $req)
    {

        $notice_id = $req->input('notice_id');
        $description = $req->input('description');
        $date = $req->input('date');

        $object = noticeboard::where('notice_id', $notice_id)->where('description', $description)->where('date', $date)->first();
        // return response()->json($object);

        if (!$object) {
            return response()->json(['result' => 'Record not found'], 404);
        }

        $object->path = $req->input('path');
        $result = $object->save();

        if ($result) {
            return response()->json($object);
        } else {
            return response()->json(['result' => 'Value not updated'], 500);
        }
    }

    public function delete(Request $req)
    {
        $notice_id = $req->input('notice_id');
        $description = $req->input('description');
        $date = $req->input('date');

        $object = noticeboard::where('notice_id', $notice_id)->where('description', $description)->where('date', $date)->first();

        if (!$object) {
            return response()->json(['result' => 'Record not found'], 404);
        }

        $object->delete();

        return response()->json(['result' => 'Record deleted']);
    }

    public function sendNotifications($notice_id,$notice_description){
        $user = auth()->user()->admin_id;
        $notice_code = substr($notice_id,0,1);
        if($notice_code === 'C'){
            $students = student::pluck('roll_num')->toArray();
            foreach($students as $student_id){
                notifications::create([
                    'sender_id' => $user,
                    'receiver_id' => $student_id,
                    'message' => 'Notice Board Update aindi, chuskogalaru',
                ]);
            }
        }
        else{
            $branch = substr($notice_id,1,2);
            $sem = substr($notice_id,3,1);
            $year = enrolled_student::where('code',$branch)->where('semester',$sem)->value('year');
            $students = student::where('roll_num', 'LIKE', $year . '___' . $branch . '%')->pluck('roll_num');
            $rollNumCodes = array(
                'F0'  =>  'MC',
                'D0'  =>  'CS',
                'D2'  =>  'SE',
                'D6'  =>  'CN',
                'DB'  =>  'DS'
            );
            $reRegistered = re_register::where('subject_code','LIKE',$rollNumCodes[$branch].$sem.'%')->pluck('roll_num');
            $finalArray = collect($students)->concat($reRegistered)->toArray();
            foreach($finalArray as $student_id){
                notifications::create([
                    'sender_id' => $user,
                    'receiver_id' => $student_id,
                    'message' => 'Notice Board Updated. '.$notice_description,
                ]);
            }
        }
    }
}
