<?php
/**
 * FAOGI SERVICES – Formular-Mailer für all-inkl.com (Shared Hosting, PHP).
 *
 * Nimmt JSON-POSTs von Kontaktformular und Service-Rechner entgegen und
 * verschickt sie per PHP mail() an die FAOGI-Postfachadresse.
 *
 * ============================ KONFIGURATION ============================
 * Vor dem Live-Gang anpassen (TODO):
 *  - $EMPFAENGER : echte Zieladresse (Postfach, an das Anfragen gehen sollen)
 *  - $ABSENDER   : Absenderadresse AUF DER EIGENEN DOMAIN. all-inkl lehnt
 *                  fremde Absender (z.B. @gmail.com) ab. Beispiel:
 *                  noreply@faogi-services.de
 * =======================================================================
 */

$EMPFAENGER = 'info@faogi-services.de';       // TODO: echte Zieladresse
$ABSENDER   = 'noreply@faogi-services.de';    // TODO: Absender auf eigener Domain

header('Content-Type: application/json; charset=utf-8');

// Nur POST erlauben.
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Methode nicht erlaubt.']);
    exit;
}

// JSON-Body einlesen (Fallback auf Formular-POST).
$raw  = file_get_contents('php://input');
$data = json_decode($raw, true);
if (!is_array($data)) {
    $data = $_POST;
}

// Honeypot: echte Nutzer füllen das versteckte Feld nicht aus.
if (!empty($data['website'])) {
    // Spam still verwerfen, aber "Erfolg" melden, damit Bots nichts lernen.
    echo json_encode(['success' => true]);
    exit;
}

// Hilfsfunktion: Wert holen & säubern.
function field($data, $key) {
    return isset($data[$key]) ? trim((string) $data[$key]) : '';
}

$type    = field($data, 'type') ?: 'Anfrage';
$name    = field($data, 'name');
$email   = field($data, 'email');
$phone   = field($data, 'phone');
$address = field($data, 'address');
$summary = field($data, 'summary');

// Pflichtfelder prüfen.
$errors = [];
if ($name === '')  $errors[] = 'Name fehlt';
if ($email === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) $errors[] = 'Gültige E-Mail fehlt';

if ($errors) {
    http_response_code(422);
    echo json_encode(['success' => false, 'error' => implode(', ', $errors)]);
    exit;
}

// Header-Injection verhindern (keine Zeilenumbrüche in Kopffeldern).
$name  = str_replace(["\r", "\n"], ' ', $name);
$email = str_replace(["\r", "\n"], ' ', $email);

// Preisinfo (optional, aus dem Rechner).
$priceLine = '';
if (isset($data['priceMin'], $data['priceMax']) && $data['priceMin'] !== null && $data['priceMax'] !== null) {
    $priceLine = 'Preisindikation: ' . intval($data['priceMin']) . ' € – ' . intval($data['priceMax']) . " €\n";
}

// Betreff & Body zusammenbauen.
$subject = 'FAOGI – ' . $type . ' von ' . $name;

$body  = "Neue Anfrage über die Website (" . $type . ")\n";
$body .= "============================================\n\n";
$body .= "Name:     " . $name . "\n";
$body .= "E-Mail:   " . $email . "\n";
if ($phone !== '')   $body .= "Telefon:  " . $phone . "\n";
if ($address !== '') $body .= "Adresse:  " . $address . "\n";
$body .= $priceLine;
$body .= "\n";
if ($summary !== '') {
    $body .= "Details / Nachricht:\n";
    $body .= "--------------------------------------------\n";
    $body .= $summary . "\n";
}
$body .= "\n--------------------------------------------\n";
$body .= "Gesendet am " . date('d.m.Y H:i') . " Uhr\n";

// Mail-Header. Absender auf eigener Domain, Antwort an den Interessenten.
$headers  = 'From: FAOGI SERVICES <' . $ABSENDER . ">\r\n";
$headers .= 'Reply-To: ' . $name . ' <' . $email . ">\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

$ok = @mail($EMPFAENGER, '=?UTF-8?B?' . base64_encode($subject) . '?=', $body, $headers);

if ($ok) {
    echo json_encode(['success' => true]);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'E-Mail konnte nicht versendet werden.']);
}
