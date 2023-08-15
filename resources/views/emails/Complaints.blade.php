@php
    $user = $mailData['user'];
    $message = $mailData['body'];
@endphp

<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Complaint Raised</title>
</head>
<body>
    <h1>Complaint Raised</h1>
    <p>A complaint has been raised by <strong>{{ $user }}</strong>. Please see the description below.</p>
    <p>{{ htmlspecialchars($message) }}</p>

    @if (!empty($attachments))
        <p>The following attachments were also sent with the complaint:</p>
        @foreach ($attachments as $attachment)
            <p><strong>{{ $attachment['filename'] }}</strong></p>
        @endforeach
    @endif
</body>
</html>
