<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>FacultyHomepage</title>
    @include('bootstrap')
    <link rel="stylesheet" href="{{ asset('css/basicStyle.css') }}">
</head>

<body>
    <x-header></x-header>

    <div id="mySidenav" class="sidenav">
        <a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a>
        <a href="#">Profile</a>
        <a href="#">Change Password</a>
        <a href="#">Update MobileNumber</a>
        <a href="#"> Add Internal Marks</a>
        <a href="#">Enrolled students</a>
        <a href="#">Mark Attendance</a>
        <a href="#">Raise Complaint</a>
        <a href="#">Send Notification</a>
        <a href="#">Raise Complaint</a>
        <a href="#">Log Out</a>
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
            <div class="student-text">
             <span id="student-name">Welcome Mr.G.Narsimham</span>
            </div>
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
        document.addEventListener("click", function(event) {
            if (!event.target.closest(".sidenav") && !event.target.closest("span[onclick='openNav()']")) {
                closeNav();
            }
        });
    </script>
</body>

</html>
