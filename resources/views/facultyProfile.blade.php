<!DOCTYPE html>
@include('facultyHomePage')
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
    <div class="wrapper">
<div class="container">
    <h1 class="title">Faculty Details</h1>
    <table>
        <tr>
            <th>Faculty ID</th>
            <td>{{$faculty['faculty_id']}}</td>
        </tr>
        <tr>
            <th>Name</th>
            <td>{{$faculty['name']}}</td>
        </tr>
        <tr>
            <th>E-mail</th>
            <td>{{$faculty['email']}}</td>
        </tr>
        <tr>
            <th>Designation</th>
            <td>{{$faculty['designation']}}</td>
        </tr>
    </table>
</div>
</div>
{{-- <x-footer></x-footer> --}}
</body>

