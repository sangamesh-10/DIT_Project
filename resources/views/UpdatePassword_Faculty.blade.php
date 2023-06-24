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
    <h3 style="justify-content: center;display:flex">New password should contain atleast one Capital letter,one number and minimum size 8 chars</h3>

    <div class="form-container">
        <h2>Update Password</h2>
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
    {{-- <x-footer></x-footer> --}}
</body>
</html>
