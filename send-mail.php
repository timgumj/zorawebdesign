<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;



$isCli = PHP_SAPI === 'cli';

if (!$isCli) {
  $allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:5174',
    'http://localhost:5175',
    'http://localhost:5176',
    'http://localhost:5177',
    'http://localhost:5178',
    'https://zorawebdesign.com',
    'https://www.zorawebdesign.com'
  ];

  $requestOrigin = $_SERVER['HTTP_ORIGIN'] ?? '';

  if (in_array($requestOrigin, $allowedOrigins, true)) {
    header('Access-Control-Allow-Origin: ' . $requestOrigin);
  }

  header('Vary: Origin');
  header('Content-Type: application/json; charset=UTF-8');
  header('Access-Control-Allow-Headers: Content-Type, Accept');
  header('Access-Control-Allow-Methods: POST, OPTIONS');
}

ini_set('log_errors', 1);
ini_set('error_log', __DIR__ . '/mail-debug.log');

function respond_json($status, $payload)
{
  if (PHP_SAPI !== 'cli') {
    http_response_code($status);
  }
  echo json_encode($payload);
  exit;
}

if (!$isCli) {
  if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
  }

  if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    respond_json(405, ["success" => false, "message" => "Method not allowed"]);
  }
}

require __DIR__ . '/PHPMailer/Exception.php';
require __DIR__ . '/PHPMailer/PHPMailer.php';
require __DIR__ . '/PHPMailer/SMTP.php';

$payloadPath = $argv[1] ?? '';
$rawInput = '';

if (!empty($payloadPath) && file_exists($payloadPath)) {
  $rawInput = file_get_contents($payloadPath);
} else {
  $rawInput = file_get_contents('php://input');
}

$data = json_decode($rawInput, true);

if (json_last_error() !== JSON_ERROR_NONE || !$data) {
  respond_json(400, ["success" => false, "message" => "Invalid JSON payload format."]);
}

if (!empty($data['website'])) {
  respond_json(200, ["success" => true, "message" => "Filtered via honeypot interception"]);
}

function env_value($key, $fallback = '')
{
  $value = getenv($key);
  return ($value === false || $value === '') ? $fallback : $value;
}

function build_mailer()
{
  $mail = new PHPMailer(true);
  $mail->SMTPDebug = 0;
  $mail->isSMTP();
  $mail->CharSet = 'UTF-8';
  $mail->Timeout = 20;
  $mail->Host = env_value('SMTP_HOST', 'w01e99cb.kasserver.com');
  $mail->SMTPAuth = true;
  $mail->Username = env_value('SMTP_USER', 'info@zorawebdesign.com');
  $mail->Password   = 'qupili1981AB51()%&';
  $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
  $mail->Port = intval(env_value('SMTP_PORT', '465'));

  if ($mail->Password === '') {
    throw new Exception('SMTP_PASS is missing. Add it to your server environment or .env.');
  }

  return $mail;
}

function clean_text($value, $fallback = '')
{
  $clean = trim(strip_tags((string) $value));
  return $clean !== '' ? $clean : $fallback;
}

if (!empty($data['type']) && $data['type'] === 'audit-lead') {
  $name = clean_text($data['name'] ?? '', 'Client');
  $email = filter_var(trim($data['email'] ?? ''), FILTER_VALIDATE_EMAIL);
  $phone = clean_text($data['phone'] ?? '', 'Not provided');
  $websiteUrl = clean_text($data['websiteUrl'] ?? '', 'Not provided');
  $competitorUrl = clean_text($data['competitorUrl'] ?? '', 'Not provided');
  $reportPath = trim($data['reportPath'] ?? '');
  $notifyEmail = filter_var(trim($data['notifyEmail'] ?? env_value('LEAD_NOTIFY_EMAIL', 'info@zorawebdesign.com')), FILTER_VALIDATE_EMAIL);
  $secondNotifyEmail = filter_var(trim($data['secondNotifyEmail'] ?? env_value('LEAD_NOTIFY_EMAIL_2', 'timjay08@gmail.com')), FILTER_VALIDATE_EMAIL);
  $fromEmail = env_value('SMTP_USER', 'info@zorawebdesign.com');

  if (!$email) {
    respond_json(400, ["success" => false, "message" => "Valid client email is required."]);
  }

  $clientSubject = clean_text($data['clientSubject'] ?? '', 'Your website audit PDF report');
  $clientText = trim($data['clientText'] ?? "Hi {$name},\n\nThank you for requesting your website audit.\n\nYour full PDF report is attached.\n\nWebsite checked: {$websiteUrl}\n\nBest regards,\nJulius\nZora Web Design");

  $adminSubject = clean_text($data['adminSubject'] ?? '', 'New website audit lead');
  $adminText = trim($data['adminText'] ?? "New website audit lead\n\nName: {$name}\nEmail: {$email}\nPhone: {$phone}\nWebsite URL: {$websiteUrl}\nCompetitor URL: {$competitorUrl}");

  try {
    $clientMail = build_mailer();
    $clientMail->setFrom($fromEmail, 'Zora Web Design');
    $clientMail->Sender = $fromEmail;
    $clientMail->addAddress($email, $name);
    $clientMail->addReplyTo($fromEmail, 'Zora Web Design');
    $clientMail->isHTML(false);
    $clientMail->Subject = $clientSubject;
    $clientMail->Body = $clientText;

    if (!empty($reportPath) && file_exists($reportPath)) {
      $clientMail->addAttachment($reportPath, 'website-audit-report.pdf');
    }

    $clientMail->send();
    $clientMail->smtpClose();

    $adminMail = build_mailer();
    $adminMail->setFrom($fromEmail, 'Zora Web Design');
    $adminMail->Sender = $fromEmail;
    $adminMail->addAddress($notifyEmail ?: 'info@zorawebdesign.com', 'Zora Web Design');
    if ($secondNotifyEmail) {
      $adminMail->addCC($secondNotifyEmail);
    }
    $adminMail->addReplyTo($email, $name);
    $adminMail->isHTML(false);
    $adminMail->Subject = $adminSubject;
    $adminMail->Body = $adminText;

    if (!empty($reportPath) && file_exists($reportPath)) {
      $adminMail->addAttachment($reportPath, 'website-audit-report.pdf');
    }

    $adminMail->send();
    $adminMail->smtpClose();

    respond_json(200, ["success" => true, "message" => "Audit client and lead notification emails sent."]);
  } catch (Exception $e) {
    error_log('AUDIT MAIL ERROR: ' . $e->getMessage());
    respond_json(500, ["success" => false, "message" => "Audit report email could not be sent."]);
  }
}



$name = clean_text($data['name'] ?? '');
$company = clean_text($data['company'] ?? '', 'Not specified');
$email = filter_var(trim($data['email'] ?? ''), FILTER_VALIDATE_EMAIL);
$telephone = clean_text($data['telephone'] ?? '', 'Not specified');
$message = clean_text($data['message'] ?? '');

if (!$name || !$email || !$message) {
  error_log('Validation rule break. Current structure trace: ' . print_r($data, true));
  respond_json(400, ["success" => false, "message" => "Required context input missing"]);
}

try {
  $mail = build_mailer();
  $fromEmail = env_value('SMTP_USER', 'info@zorawebdesign.com');
  $contactNotifyEmail = env_value('CONTACT_NOTIFY_EMAIL', 'timjay08@gmail.com');

  $mail->setFrom($fromEmail, 'Zora Web Design');
  $mail->Sender = $fromEmail;
  $mail->addAddress($contactNotifyEmail);
  $mail->addReplyTo($email, $name);
  $mail->isHTML(false);
  $mail->Subject = 'Contact Form Inquiry ' . date('Y-m-d H:i:s');
  $mail->Body = "New contact message received via zorawebdesign.com\n\n"
    . "Name: $name\n"
    . "Company: $company\n"
    . "Email: $email\n"
    . "Phone: $telephone\n\n"
    . "Message:\n$message\n";

  $mail->send();
  $mail->smtpClose();

  respond_json(200, ["success" => true, "message" => "Message sent cleanly."]);
} catch (Exception $e) {
  error_log('MAIL TRANSPORT SYSTEM ERROR: ' . $e->getMessage());
  respond_json(500, ["success" => false, "message" => "Mail delivery error encountered."]);
}
