<html>
    <head><title>Student details</title></head>
    <body bgcolor="B0C4DE">


        <div align="center">
        <h2> Student details</h2>
        <form name="std" method="post" action="stdRegistration"  >
        @csrf
            <label for="rno" id="rno">Roll Number : </label>
            <input type="text" name="rno" required><br><br>

            <label for="name" id="name">Name : </label>
            <input type="text" name="name" required><br><br>

            <label for="email" id="email">Email : </label>
            <input type="email" name="email" required><br><br>

            <label for="phno" id="phno">Phone Number : </label>
            <input type="text" name="phno" required><br><br>

            <label for="Aadharno" id="aadharno">Aadhar Number : </label>
            <input type="text" name="aadharno" required><br><br>

            <label for="MotherName" id="mothername">Mother's Name : </label>
            <input type="text" name="mname" required><br><br>

            <label for="FatherName" id="fathername">Father's Name : </label>
            <input type="text" name="fname" required><br><br>

            <label for="parentnum" id="parentphno">Parent Number: </label>
            <input type="text" name="parentphno" required><br><br>

            <label for="dob" id="dob">Date Of Birth : </label>
            <input type="date" name="dob" required><br><br>

            <label for="permanentaddr" id="permanentaddr">permanent Address : </label>
            <textarea rows="5" cols="20" name="permanentaddr" required></textarea><br><br>

            <label for="presentaddr" id="presentaddr">Present Address : </label>
            <textarea rows="5" cols="20" name="presentaddr" required></textarea><br><br>

            <label for="bloodgroup" id="bgroup">Blood Group : </label>
            <input type="text" name="bgroup" required><br><br>

            <label for="caste" id="caste">Caste : </label>
            <input type="text" name="caste" required><br><br>

            <label for="Religion" id="religion">Religion : </label>
            <input type="text" name="religion" required><br><br>

            <input type="submit" name="submit">
            <input type="reset" name="reset">
        </div>
    </form>
    </body>
</html>

