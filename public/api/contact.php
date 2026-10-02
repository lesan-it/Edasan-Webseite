<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

function respond(int $status, array $payload): void
{
    http_response_code($status);
    echo json_encode($payload, JSON_UNESCAPED_UNICODE);
    exit;
}

$method = $_SERVER['REQUEST_METHOD'] ?? '';
if ($method === 'GET') {
    respond(200, ['directSend' => function_exists('mail')]);
}
if ($method !== 'POST') {
    header('Allow: GET, POST');
    respond(405, ['error' => 'method_not_allowed']);
}

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origin !== '') {
    $originHost = parse_url($origin, PHP_URL_HOST);
    $requestHost = explode(':', $_SERVER['HTTP_HOST'] ?? '')[0];
    if (!is_string($originHost) || strcasecmp($originHost, $requestHost) !== 0) {
        respond(403, ['error' => 'forbidden']);
    }
}
if (stripos($_SERVER['CONTENT_TYPE'] ?? '', 'application/json') !== 0) {
    respond(415, ['error' => 'invalid_request']);
}
if ((int) ($_SERVER['CONTENT_LENGTH'] ?? 0) > 8192) {
    respond(413, ['error' => 'too_large']);
}

$raw = file_get_contents('php://input', false, null, 0, 8193);
if ($raw === false || strlen($raw) > 8192) {
    respond(413, ['error' => 'too_large']);
}
$data = json_decode($raw, true);
if (!is_array($data)) {
    respond(400, ['error' => 'invalid_request']);
}

$name = is_string($data['name'] ?? null) ? trim($data['name']) : '';
$email = is_string($data['email'] ?? null) ? trim($data['email']) : '';
$business = is_string($data['business'] ?? null) ? trim($data['business']) : '';
$message = is_string($data['message'] ?? null) ? trim($data['message']) : '';
if (!empty($data['website'])) {
    respond(200, ['ok' => true]);
}
if ($name === '' || strlen($name) > 300 || strlen($email) > 254 || !filter_var($email, FILTER_VALIDATE_EMAIL)
    || strlen($business) > 360 || $message === '' || strlen($message) > 6000) {
    respond(400, ['error' => 'invalid_fields']);
}

// Limit repeated submissions from one address without storing form contents.
$ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$limitFile = sys_get_temp_dir() . '/edasan_contact_' . hash('sha256', $ip);
$handle = @fopen($limitFile, 'c+');
if ($handle !== false) {
    if (flock($handle, LOCK_EX)) {
        $history = stream_get_contents($handle) ?: '';
        $now = time();
        $hits = array_values(array_filter(array_map('intval', explode(',', $history)), static fn (int $at): bool => $at > $now - 3600));
        if (count($hits) >= 5 || (!empty($hits) && end($hits) > $now - 20)) {
            flock($handle, LOCK_UN);
            fclose($handle);
            respond(429, ['error' => 'too_many_requests']);
        }
        $hits[] = $now;
        rewind($handle);
        ftruncate($handle, 0);
        fwrite($handle, implode(',', $hits));
        fflush($handle);
        flock($handle, LOCK_UN);
    }
    fclose($handle);
}

$sender = 'info@edasan.ch';
$subject = '=?UTF-8?B?' . base64_encode('Neue Anfrage über die Edasan Website') . '?=';
$body = "Name: {$name}\nE-Mail: {$email}\nUnternehmen: " . ($business !== '' ? $business : '–')
    . "\n\nAnliegen:\n{$message}\n";
$headers = [
    'From' => "Edasan Website <{$sender}>",
    'Reply-To' => $email,
    'Content-Type' => 'text/plain; charset=UTF-8',
    'Content-Transfer-Encoding' => '8bit',
];

if (!@mail($sender, $subject, $body, $headers, '-f' . $sender)) {
    error_log('Edasan contact form: local mail handoff failed');
    respond(502, ['error' => 'delivery_failed']);
}
respond(200, ['ok' => true]);
