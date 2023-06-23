<!DOCTYPE html>
@include('studentHomePage')
<html>
<head>
    <title>Update Password</title>
    @include('bootstrap')
    <link rel="stylesheet" href="{{ asset('css/basicStyle.css') }}">

    <style>
        body {
            background-color: #f1f1f1;
            font-family: Arial, sans-serif;
        }

        .update-password-form {
            width: 300px;
            margin: auto;
            background-color: #ffffff;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            text-align: center;
        }

        .update-password-form h2 {
            font-size: 24px;
            margin-bottom: 20px;
            color: #333333;
        }

        .update-password-form label {
            font-size: 16px;
            font-weight: bold;
            display: block;
            margin-bottom: 10px;
            color: #333333;
            text-align: left;
        }

        .update-password-form input[type="password"] {
            width: 100%;
            padding: 10px;
            font-size: 16px;
            border: 1px solid #dddddd;
            border-radius: 5px;
            margin-bottom: 20px;
        }

        .update-password-form input[type="submit"] {
            width: 100%;
            padding: 10px;
            font-size: 16px;
            background-color: #4CAF50;
            color: #ffffff;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }
    </style>
</head>
<body>
    {{-- <x-header></x-header> --}}
    <h3 style="justify-content: center;display:flex">New password should contain atleast one Capital letter,one number and minimum size 8 chars</h3>

    <div class="update-password-form">
        <h2>Update Password</h2>
        <form class='form' method="post" action="/updatePwd">
            @csrf
            <label for="new_password" name="new_password">New Password</label>
            <input type="password" name="new_password">
            <label for="confirm_password" name="confirm_password">Confirm Password</label>
            <input type="password" name="confirm_password">
            <input type="submit" name="submit" value="Update Password">
            @error('new_password')
            <span style="color: red;">{{ $message }}</span>
        @enderror
        </form>
        @if (session('error'))
        <div class="alert alert-danger" style="color:red;">
            {{ session('error') }}
        </div>
    @endif
    </div>
    {{-- <x-footer></x-footer> --}}
</body>
</html>
