<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>OTP Verification</title>
</head>
<body>
    <h1>OTP Verification</h1>
    <p>Your OTP: {{ $mailData['otp'] }}</p>
    <p>Thanks,</p>
    <p>{{ config('app.name') }}</p>
</body>
</html>
