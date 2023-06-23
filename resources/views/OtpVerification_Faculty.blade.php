<!DOCTYPE html>
<html>

<head>
    <title>Reset Password</title>
    @include('bootstrap')
    <link rel="stylesheet" href="{{ asset('css/basicStyle.css') }}">

    <style>
        body {
            background-color: #f1f1f1;
            font-family: Arial, sans-serif;
        }

        .verification-form {
            width: 300px;
            margin: auto;
            background-color: #ffffff;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            text-align: center;
        }

        .verification-form h2 {
            font-size: 24px;
            margin-bottom: 20px;
            color: #333333;
        }

        .verification-form label {
            font-size: 16px;
            font-weight: bold;
            display: block;
            margin-bottom: 10px;
            color: #333333;
            text-align: left;
        }

        .verification-form input[type="text"] {
            width: 100%;
            padding: 10px;
            font-size: 16px;
            border: 1px solid #dddddd;
            border-radius: 5px;
            margin-bottom: 20px;
        }

        .verification-form input[type="submit"] {
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
    <x-header></x-header>
    <div class="verification-form">


        <h2>Reset Password</h2>
        <form class='form' method="post" action="/sendOtpFaculty">
            @csrf
            <label for="faculty_id">Faculty ID</label>
            <input type="text" name="faculty_id"><br>
            <input type="submit" name="send_otp" value="Send OTP"><br>
        </form>
        @if (session('error'))
            <div class="alert alert-danger" style="color:red;">
                {{ session('error') }}
            </div>
        @endif
    </div>
    <x-footer></x-footer>
</body>

</html>