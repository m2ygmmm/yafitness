<?php

// Get form data from POST request
$resultsTime = isset($_POST['resultsTime']) ? $_POST['resultsTime'] : '';
$journeyReason = isset($_POST['journeyReason']) ? $_POST['journeyReason'] : '';
$firstName = isset($_POST['firstName']) ? $_POST['firstName'] : '';
$lastName = isset($_POST['lastName']) ? $_POST['lastName'] : '';
$phoneNumber = isset($_POST['phoneNumber']) ? $_POST['phoneNumber'] : '';
$email = isset($_POST['email']) ? $_POST['email'] : '';
$instagramHandle = isset($_POST['instagramHandle']) ? $_POST['instagramHandle'] : '';
$answers = isset($_POST['answers']) ? $_POST['answers'] : [];

// Prepare email content
$subject = "New Questionnaire Submission";
$to = "pinktoaster38@gmail.com"; // Replace with the email where you want to receive the form data

$message = "
    <html>
    <head>
        <title>$subject</title>
    </head>
    <body>
        <p><strong>Results Time:</strong> $resultsTime</p>
        <p><strong>Journey Reason:</strong> $journeyReason</p>
        <p><strong>First Name:</strong> $firstName</p>
        <p><strong>Last Name:</strong> $lastName</p>
        <p><strong>Phone Number:</strong> $phoneNumber</p>
        <p><strong>Email:</strong> $email</p>
        <p><strong>Instagram Handle:</strong> $instagramHandle</p>
        <p><strong>Answers:</strong></p>
        <ul>";

foreach ($answers as $answer) {
    $message .= "<li>$answer</li>";
}

$message .= "
        </ul>
    </body>
    </html>
";

// Set email headers
$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-Type: text/html; charset=UTF-8" . "\r\n";
$headers .= "From: $email" . "\r\n";
$headers .= "Reply-To: $email" . "\r\n";

// Send email
if (mail($to, $subject, $message, $headers)) {
    echo "Success";
} else {
    echo "Error";
}

?>
