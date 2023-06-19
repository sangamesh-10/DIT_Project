@include('studentHomePage')
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <form action="changeContact" method="post">
        @csrf
        @method('PUT')

        <label for="mobile">New Mobile Number:</label>
        <input type="text" name="mobile" id="mobile">

        <button type="submit">Update Mobile Number</button>
    </form>
</body>
</html>
