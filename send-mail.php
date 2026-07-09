<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require __DIR__ . '/phpmailer/Exception.php';
require __DIR__ . '/phpmailer/PHPMailer.php';
require __DIR__ . '/phpmailer/SMTP.php';

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
  header("Location: index.html");
  exit;
}

$name = htmlspecialchars(trim($_POST["name"] ?? ""));
$email = filter_var(trim($_POST["email"] ?? ""), FILTER_SANITIZE_EMAIL);
$phone = htmlspecialchars(trim($_POST["phone"] ?? ""));
$service = htmlspecialchars(trim($_POST["service"] ?? ""));
$message = htmlspecialchars(trim($_POST["message"] ?? ""));

if (empty($name) || empty($email) || empty($phone) || empty($service) || empty($message)) {
  die("Please fill all required fields.");
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
  die("Invalid email address.");
}

$mail = new PHPMailer(true);

try {
  $mail->isSMTP();
  $mail->Host = 'mail.sterlingdigitalservices.agency';
  $mail->SMTPAuth = true;
  $mail->Username = 'info@sterlingdigitalservices.agency';
  $mail->Password = 'YOUR_EMAIL_PASSWORD';
  $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
  $mail->Port = 587;

  $mail->setFrom('info@sterlingdigitalservices.agency', 'STERLING DIGITAL SERVICES');
  $mail->addAddress('info@sterlingdigitalservices.agency');
  $mail->addReplyTo($email, $name);

  $mail->isHTML(true);
  $mail->Subject = 'New Contact Form Submission - STERLING DIGITAL SERVICES';

  $mail->Body = "
    <h2>New Contact Form Submission</h2>
    <p><strong>Name:</strong> {$name}</p>
    <p><strong>Email:</strong> {$email}</p>
    <p><strong>Phone:</strong> {$phone}</p>
    <p><strong>Service:</strong> {$service}</p>
    <p><strong>Message:</strong><br>{$message}</p>
  ";

  $mail->AltBody = "
    New Contact Form Submission

    Name: {$name}
    Email: {$email}
    Phone: {$phone}
    Service: {$service}
    Message: {$message}
  ";

  $mail->send();

  header("Location: thank-you.html");
  exit;

} catch (Exception $e) {
  echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
}
?>