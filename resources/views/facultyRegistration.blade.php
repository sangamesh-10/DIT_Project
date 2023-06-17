<html>
    <head>
        <title>Faculty details</title>
        <script src="faculty_validation.js"></script>
    </head>
    <body bgcolor="B0C4DE">

        <div align="center">
        <h2> Faculty details</h2>
        <form name="faculty" method="post" action="facultyReg">
            @csrf
            <label for="fid" id="fid">Faculty ID : </label>
            <input type="text" name="fid" required><br><br>

            <label for="name" id="name">Name : </label>
            <input type="text" name="name" required><br><br>

            <label for="email" id="email">Email : </label>
            <input type="email" name="email" required><br><br>

            <label for="altemail" id="altemail">Alternate Email : </label>
            <input type="email" name="altemail" required><br><br>

            <label for="phno" id="phno">Phone Number : </label>
            <input type="text" name="phno" required><br><br>

            <label for="Aadharno" id="aadharno">Aadhar Number : </label>
            <input type="text" name="aadharno" required><br><br>

            <label for="desig" id="desig">Designation : </label>
            <input type="text" name="desig" required><br><br>

            <label for="exp" id="exp">Experience : </label>
            <input type="text" name="exp" required><br><br>



            <input type="submit" name="submit">
            <input type="reset" name="reset">
        </div>
        </form>
    </body>
</html>
