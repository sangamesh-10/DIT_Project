<!DOCTYPE html>
<html>

<head>
    <title>Reset Password</title>
    @include('bootstrap')
    <link rel="stylesheet" href="{{ asset('css/basicStyle.css') }}">
</head>

<body>
    <x-header></x-header>
    <div class="form-container">


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
