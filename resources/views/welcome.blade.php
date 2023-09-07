<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>HomePage</title>
    @include('bootstrap')
    <link rel="stylesheet" href="{{ asset('css/basicStyle.css') }}">
    <style>
        .login-image {
            display: inline-block;
            margin: 5px;
            width: 300px;
            height: 300px;
            background-color: #f2f2f2;
            background-image: url('path/to/login-image.jpg');
            /* Replace with your image path */
            background-size: cover;
            /* border-radius: 50%; */
            cursor: pointer;
        }

        .linkcontainer {
            display: flex;
            flex: wrap;
            justify-content: space-evenly;
            align-content: center;
            align-items: center;
        }

        .iconcontainer {
            align-items: center;
            border: 2px solid rgb(21, 67, 87);
        }

        .login-image:hover {
            opacity: 0.8;
        }

        .logincaption {
            width: auto;
            background-color: #e87474;
            font-size-adjust: inherit;
            font-size: 20px;
            padding: 5px;
            text-align: center;
            cursor: pointer;
        }

        .logincaption a {
            text-decoration: none;
            color: rgb(26, 29, 30)
        }
    </style>
</head>

<body>
    <x-header></x-header>
    <div class="wrapper">
        {{-- Navbar --}}
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <div class="container-fluid">
                <a class="navbar-brand" href="#">Home</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav">
                        <!-- Empty list to adjust spacing -->
                    </ul>
                </div>
            </div>
        </nav>

        <div class="linkcontainer">
            <div class="iconcontainer">
                <a href="StudentLogin"><img class='login-image' src="{{ asset('images/studenticon.jpg') }}"
                        alt="studenticon"></a>
                <p class="logincaption"><a href="StudentLogin">StudentLogin</a></p>
            </div>
            <div class="iconcontainer">
                <a href="FacultyLogin"><img class="login-image" src="{{ asset('images/facultyicon.jpg') }}"
                        alt="teachericon"></a>
                <p class="logincaption"><a href="FacultyLogin">FacultyLogin</a></p>
            </div>
        </div>
    </div>
    <x-footer></x-footer>
</body>

</html>
