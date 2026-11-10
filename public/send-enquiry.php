<?php
/**
 * Bluehost enquiry handler for WAED Industrial.
 * Requires PHP 7.4+ (Bluehost shared hosting default).
 * Delivers to info@waediic.com with domain From + envelope sender for deliverability.
 */
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('Cache-Control: no-store');

if (($_SERVER['REQUEST_METHOD'] ?? '') === 'OPTIONS') {
  http_response_code(204);
  exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
  http_response_code(405);
  echo json_encode(['ok' => false, 'error' => 'Method not allowed'], JSON_UNESCAPED_UNICODE);
  exit;
}

// Honeypot — bots fill this; humans leave it empty.
if (!empty($_POST['website'])) {
  echo json_encode(['ok' => true], JSON_UNESCAPED_UNICODE);
  exit;
}

$allowedTypes = [
  'General Question',
  'Product Question',
  'Custom Home Brand',
  'Fragrance or Pack Size',
  'Request Product Details',
  'Other',
];

function clean_line($value, $max = 200)
{
  $value = trim(str_replace(["\r", "\n", "\0"], ' ', (string) $value));
  $value = preg_replace('/\s+/', ' ', $value);
  if (!is_string($value)) {
    $value = '';
  }
  if (function_exists('mb_substr')) {
    return mb_substr($value, 0, $max);
  }
  return substr($value, 0, $max);
}

$name = clean_line(isset($_POST['name']) ? $_POST['name'] : '', 120);
$company = clean_line(isset($_POST['company']) ? $_POST['company'] : '', 160);
$country = clean_line(isset($_POST['country']) ? $_POST['country'] : '', 120);
$email = clean_line(isset($_POST['email']) ? $_POST['email'] : '', 180);
$phone = clean_line(isset($_POST['phone']) ? $_POST['phone'] : '', 60);
$enquiryType = clean_line(isset($_POST['enquiryType']) ? $_POST['enquiryType'] : 'General Question', 120);
$message = trim((string) (isset($_POST['message']) ? $_POST['message'] : ''));
$message = str_replace("\0", '', $message);
if (function_exists('mb_substr')) {
  $message = mb_substr($message, 0, 5000);
} else {
  $message = substr($message, 0, 5000);
}

if ($name === '' || $email === '' || $message === '') {
  http_response_code(422);
  echo json_encode(['ok' => false, 'error' => 'Please complete the required fields.'], JSON_UNESCAPED_UNICODE);
  exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
  http_response_code(422);
  echo json_encode(['ok' => false, 'error' => 'Please enter a valid email address.'], JSON_UNESCAPED_UNICODE);
  exit;
}

if (!in_array($enquiryType, $allowedTypes, true)) {
  $enquiryType = 'General Question';
}

// Light rate limit by IP (tmp file, best-effort on shared hosting).
$ip = isset($_SERVER['REMOTE_ADDR']) ? preg_replace('/[^0-9a-fA-F:.]/', '', (string) $_SERVER['REMOTE_ADDR']) : 'unknown';
$rateFile = rtrim(sys_get_temp_dir(), DIRECTORY_SEPARATOR) . DIRECTORY_SEPARATOR . 'waed-enquiry-' . md5($ip) . '.txt';
$now = time();
if (is_file($rateFile)) {
  $last = (int) @file_get_contents($rateFile);
  if ($last > 0 && ($now - $last) < 20) {
    http_response_code(429);
    echo json_encode(['ok' => false, 'error' => 'Please wait a moment before sending another enquiry.'], JSON_UNESCAPED_UNICODE);
    exit;
  }
}
@file_put_contents($rateFile, (string) $now, LOCK_EX);

$to = 'info@waediic.com';
$fromEmail = 'info@waediic.com';
$subject = 'WAED enquiry — ' . $enquiryType;
$body = implode("\n", [
  'New enquiry from the WAED Industrial website',
  '',
  'Full Name: ' . $name,
  'Company Name: ' . $company,
  'Country: ' . $country,
  'Email Address: ' . $email,
  'Phone Number: ' . $phone,
  'Enquiry Type: ' . $enquiryType,
  '',
  'Message / Enquiry Details:',
  $message,
  '',
  'Sent: ' . gmdate('Y-m-d H:i:s') . ' UTC',
  'IP: ' . $ip,
]);

$encodedSubject = '=?UTF-8?B?' . base64_encode($subject) . '?=';
$headers = [
  'MIME-Version: 1.0',
  'Content-Type: text/plain; charset=UTF-8',
  'From: WAED Website <' . $fromEmail . '>',
  'Reply-To: ' . $email,
  'X-Mailer: WAED-Site',
];

// -f sets the envelope sender; required on many Bluehost accounts for inbox delivery.
$sent = @mail($to, $encodedSubject, $body, implode("\r\n", $headers), '-f' . $fromEmail);

if (!$sent) {
  http_response_code(500);
  echo json_encode([
    'ok' => false,
    'error' => 'We could not send your enquiry right now. Please email info@waediic.com directly.',
  ], JSON_UNESCAPED_UNICODE);
  exit;
}

echo json_encode([
  'ok' => true,
  'message' => 'Thank you. Your enquiry has been sent to WAED Industrial.',
], JSON_UNESCAPED_UNICODE);
