<!DOCTYPE html>
<html>

<head>
    <title>OTP Verification</title>
    @include('bootstrap')
    <link rel="stylesheet" href="{{ asset('css/basicStyle.css') }}">
</head>

<body>
    <x-header></x-header>
    <div class="wrapper">
    <div class="form-container">


        <h2>OTP Verification</h2>

        <form class='form' method="post" action="/verifyOtpFaculty">
            @csrf
            <label for="otp" >Enter OTP</label>
            <input type="text" name="otp" placeholder="Enter otp sent to your mail"><br>
            <input type="submit" name="verify_otp" value="Verify OTP">
        </form>
        @if (session('error'))
            <div class="alert alert-danger" style="color:red;">
                {{ session('error') }}
            </div>
        @endif
    </div>
</div>
    <x-footer></x-footer>
</body>

</html>
