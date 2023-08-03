<!DOCTYPE html>
@include('studentHomePage')
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Update Password</title>
    <link rel="stylesheet" href="{{ asset('css/basicStyle.css') }}">

    <style>
        .mystyle {
            width:500px;
            margin: auto;
            background-color: rgb(65, 213, 174);
            padding: 20px;
            align-items:center;
            border-radius: 20px;
            /* display: flex;
            justify-content: center;
            align-items: center; */
            height: 450px;
            position:inherit;
            left: 40%;
            top:15%;
        }
    </style>
</head>

<body>
    {{-- <x-header></x-header> --}}
    <h3 style="justify-content: center;display:flex">New password should contain atleast one Capital letter,one number and minnimun size 8 chars</h3>
    <div class="mystyle">
        <form class='form' method="post" action="/updatePwd">
            @csrf
            <label for="currentPwd" name="currentPwd">Current Password : </label>
            <input type="password" name="currentPwd"><br>
            <label for="new_password" name="new_password">New Password : </label>
            <input type="password" name="new_password"><br>
            @error('new_password')
            <span style="color: red;">{{ $message }}</span>
        @enderror
            <input type="submit" name="submit" value="Change"><br>

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