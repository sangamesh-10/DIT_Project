<!DOCTYPE html>
@include('facultyHomePage')

<html>
<head>
    <title>Update Password</title>
    @include('bootstrap')
    <link rel="stylesheet" href="{{ asset('css/basicStyle.css') }}">

</head>
<body>
    {{-- <x-header></x-header> --}}
    <div class="form-container">
        <h2>Update Password</h2>
        <p class="password-requirements"> * new password should contain at least one capital letter, one number, and be a minimum of 8 characters.</p>
        <form class='form' method="post" action="/updatePwdFaculty">
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
</body>
</html>
