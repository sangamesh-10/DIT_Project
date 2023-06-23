<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>StudentHomepage</title>
    @include('bootstrap')
    <link rel="stylesheet" href="{{ asset('css/basicStyle.css') }}">
</head>

<body>
    <x-header></x-header>

    <div id="mySidenav" class="sidenav">
        <a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a>
        <a href="profile">Profile</a>
        <a href="changePwd">Change Password</a>
        <a href="updateContact">Update MobileNumber</a>
        <a href="#">Internal Marks</a>
        <a href="#">Enrolled subjects</a>
        <a href="#">Attendance</a>
        <a href="#">Raise Complaint</a>
        <a href="logout">Log Out</a>
    </div>

    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
            <ul class="navbar-nav">
                <li class="nav-item">
                    <span style="font-size: 20px; cursor: pointer; color: white" onclick="openNav()">&#9776;
                        Dashboard</span>
                </li>
            </ul>
        </div>
        <div class="student-info">
            <img src='{{ asset('$softCopies->photo') }}' alt="Student Image">
            <div class="student-text">
             <span id="student-name">Welcome,Sangameshwar Gaddam</span>
            </div>
            <h1>{{}}</h1>
        </div>
    </nav>

    <x-footer></x-footer>

    <script>
        let opened= false
        function openNav() {
        if(!opened){
            document.getElementById("mySidenav").style.width = "250px";
            opened=true;

        }
        else{
            document.getElementById("mySidenav").style.width = "0";
            opened=false;
        }
    }
        // document.addEventListener("click", function(event) {
        //     openNav()
        // });
    </script>
</body>

</html>
