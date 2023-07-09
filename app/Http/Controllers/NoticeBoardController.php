<?php

namespace App\Http\Controllers;
use App\Models\noticeboard;
use Illuminate\Http\Request;

class NoticeBoardController extends Controller
{
    public function add(Request $req)
    {
        $object = new noticeboard;
        $object->notice_id = $req->input('notice_id');
        $object->description = $req->input('description');
        $object->date = $req->input('date');
        $object->path = $req->input('path');
        $object->save();
        return response()->json($object);
    }
    public function get()
    {
        $ans = noticeboard::all();
        return response()->json($ans);
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
}
