<!DOCTYPE html>
@include('studentHomePage')
<html>
<head>
    @include('bootstrap')
    <link rel="stylesheet" href="{{ asset('css/basicStyle.css') }}">

<style>
    body {
        font-family: Arial, sans-serif;
        background-color: #f5f5f5;
    }

    .container {
        /* max-width: 400px; */
        margin:auto;
        padding: 20px;
        background-color: #fff;
        border-radius: 5px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    table {
        border-collapse: collapse;
        width: 100%;
        margin-bottom: 20px;
    }

    table, th, td {
        border: 1px solid #ccc;
        padding: 10px;
    }

    th {
        background-color: #f2f2f2;
        font-weight: bold;
    }

    .title {
        text-align: center;
        font-size: 24px;
        margin-bottom: 20px;
    }
</style>
</head>
<body>
    {{-- <x-header></x-header> --}}
<div class="container">
    <h1 class="title">Student Details</h1>
    <table>
        <tr>
            <th>Roll Number</th>
            <td>{{$students['roll_num']}}</td>
        </tr>
        <tr>
            <th>Name</th>
            <td>{{$students['name']}}</td>
        </tr>
        <tr>
            <th>E-mail</th>
            <td>{{$students['email']}}</td>
        </tr>
        <tr>
            <th>Branch</th>
            <td>{{$education['branch']}}</td>
        </tr>
        <tr>
            <th>Specialization</th>
            <td>{{$education['specialization']}}</td>
        </tr>
        <tr>
            <th>Semester</th>
            <td>{{$education['semester']}}</td>
        </tr>
        <tr>
            <th>Academic Year</th>
            <td>{{$education['academic_year']}}</td>
        </tr>
    </table>
</div>
{{-- <x-footer></x-footer> --}}
</body>

{{-- <table border='5'>
    <tr>
        <td>Roll Number</td>
        <td>{{$students['roll_num']}}</td>
    </tr>
    <tr>
        <td>Name</td>
        <td>{{$students['name']}}</td>
    </tr>
    <tr>
        <td>E-mail</td>
        <td>{{$students['email']}}</td>
    </tr>
</table> --}}

