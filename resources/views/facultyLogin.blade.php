<!DOCTYPE html>
<html>

<head>
    <title>Faculty Login Page</title>
    @include('bootstrap')
    <style>
        body {
            background-color: #f1f1f1;
            font-family: Arial, sans-serif;
        }

        .loginform {
            width: 300px;
            margin: auto;
            background-color: #ffffff;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            text-align: center;
        }

        .loginform h2 {
            font-size: 24px;
            margin-bottom: 20px;
            color: #333333;
        }

        .loginform label {
            font-size: 16px;
            font-weight: bold;
            display: block;
            margin-bottom: 10px;
            color: #333333;
            text-align: left;
        }

        .loginform input[type="text"],
        .loginform input[type="password"] {
            width: 100%;
            padding: 10px;
            font-size: 16px;
            border: 1px solid #dddddd;
            border-radius: 5px;
            margin-bottom: 20px;
        }

        .loginform input[type="submit"] {
            width: 100%;
            padding: 10px;
            font-size: 16px;
            background-color: #4CAF50;
            color: #ffffff;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }

        .loginform .forgot-password {
            font-size: 14px;
            color: #333333;
            margin-top: 10px;
        }
    </style>
</head>

<body>
    <x-header></x-header>
    <div class="loginform">
        @if ($message = session('success'))
            <div class="alert alert-success">
                {{ $message }}
            </div>
        @endif
        <h2>Login Form</h2>
        <form class='form' method="post" action="verifyFaculty">
            @csrf
            <label for="faculty_id" name="username">Username</label>
            <input type="text" name="faculty_id"><br><br>
            <label for="password" name="password">Password</label>
            <input type="password" name="password"><br><br>
            {{ session()->start() }}
            <input type="submit" name="submit" value="Login"><br><br>
        </form>
        <a class="forgot-password" href="/otpVerificationFaculty">Forgot Password?</a><br><br>
        @if (session('error'))
            <div class="alert alert-danger" style="color:red;">
                {{ session('error') }}
                {{ session()->forget('error') }}

            </div>
        @endif
    </div>
    <x-footer></x-footer>
</body>

</html>
