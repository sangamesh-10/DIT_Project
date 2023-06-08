<html>
    <head>
        <title>Student Login Page</title>

        <style>
            .loginform{
                width: 300px;
    margin:  auto;
    background-color: aqua;
    padding: 30px;
    align-items:center;
    justify-content: center;
    display: flex;

    border-radius: 20px;
    position: absolute;
    left: 40%;
    top:30%;
}
label{
    font-size: 25px;
    font-style:initial;
}


        </style>

    </head>
    <body>
        <div class="loginform">
            <table align="center" >
                <caption style="font-size: 25px;">Login Form</caption>
                <tr>
                    <td><label for="username" name="username">UserName</label></td>
                    <td><input type="text" name="username"></td>
                </tr>
                <tr>
                    <td><label for="password" name="password">Password</label></td>
                    <td><input type="text" name="password"><br><br></td>
                </tr>
                <tr>
                    <td></td>
                    <td><input type="submit" name="submit" value="login"></td>
                </tr>
            </table>

            {{-- <form class='form' method="post" action="">
                <label for="username" name="username">UserName</label>
                <input type="text" name="username"><br><br>
                <label for="password" name="password">Password</label>
                <input type="text" name="password"><br><br>
                <input type="submit" name="submit" value="login">

            </form> --}}
        </div>
    </body>
</html>
