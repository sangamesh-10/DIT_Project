<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Update Password</title>
    <style>
        .mystyle {
            width:200px;
            margin: auto;
            background-color: rgb(65, 213, 174);
            padding: 20px;
            align-items:center;
            border-radius: 20px;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 150px;
            position: absolute;
            left: 40%;
            top:15%;
        }
    </style>
</head>

<body>
    <h3 style="justify-content: center;display:flex">New password should contain atleast one Capital letter,one number and minnimun size 8 chars</h3>
    <div class="mystyle">
        <form class='form' method="post" action="/updatePwd">
            @csrf
            <label for="username" name="username">Username</label>
            <input type="text" name="username"><br><br>
            <label for="currentPwd" name="currentPwd">Current Password</label>
            <input type="password" name="currentPwd"><br><br>
            <label for="newPwd" name="newPwd">New Password</label>
            <input type="password" name="newPwd"><br><br>
            @error('newPwd')
            <span style="color: red;">{{ $message }}</span>
        @enderror
            <input type="submit" name="submit" value="Change">
        </form>
    </div>
</body>

</html>
