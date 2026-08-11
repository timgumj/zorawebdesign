<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

/*
 * Allow the live website and any localhost development port.
 */

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';

$allowedLiveOrigins = [
  'https://zorawebdesign.com',
  'https://www.zorawebdesign.com'
];

$isLocalOrigin = preg_match(
  '#^http://(localhost|127\.0\.0\.1):\d+$#',
  $origin
);

if ($isLocalOrigin || in_array($origin, $allowedLiveOrigins, true)) {
  header('Access-Control-Allow-Origin: ' . $origin);
}

header('Vary: Origin');
header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Headers: Content-Type, Accept');
header('Access-Control-Allow-Methods: POST, OPTIONS');

ini_set('log_errors', '1');
ini_set('error_log', __DIR__ . '/mail-debug.log');

/*
 * Handle the browser's CORS preflight request.
 */
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  http_response_code(204);
  exit;
}

/*
 * Only accept POST requests.
 */
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  http_response_code(405);

  echo json_encode([
    'success' => false,
    'message' => 'Method not allowed'
  ]);

  exit;
}

/*
 * Load PHPMailer.
 */
require __DIR__ . '/PHPMailer/Exception.php';
require __DIR__ . '/PHPMailer/PHPMailer.php';
require __DIR__ . '/PHPMailer/SMTP.php';

/*
 * Read and decode the JSON request.
 */
$rawInput = file_get_contents('php://input');
$data = json_decode($rawInput, true);

if (json_last_error() !== JSON_ERROR_NONE || !is_array($data)) {
  http_response_code(400);

  echo json_encode([
    'success' => false,
    'message' => 'Invalid JSON payload format.'
  ]);

  exit;
}


$formType = isset($data['formType'])
  ? trim((string) $data['formType'])
  : 'contact';

/*
 * Honeypot spam protection.
 */
if (!empty($data['website'])) {
  echo json_encode([
    'success' => true,
    'message' => 'Message received.'
  ]);

  exit;
}

$recaptchaSecretKey = '6LfHvOArAAAAAOeMic_Z7ucO59qi9J8E64XTVon6';

/*
 * Sanitize form fields.
 */

/*
 * Handle website audit lead submissions.
 * This branch exits after processing, so the working contact form below
 * remains unchanged.
 */
if ($formType === 'audit') {
  $auditName = isset($data['name'])
    ? trim(strip_tags((string) $data['name']))
    : '';

  $auditEmailRaw = isset($data['email'])
    ? trim((string) $data['email'])
    : '';

  $auditEmail = filter_var(
    $auditEmailRaw,
    FILTER_VALIDATE_EMAIL
  );

  $auditPhone = isset($data['phone']) &&
    trim((string) $data['phone']) !== ''
    ? trim(strip_tags((string) $data['phone']))
    : 'Not provided';

  $auditWebsiteUrl = isset($data['websiteUrl'])
    ? trim(strip_tags((string) $data['websiteUrl']))
    : '';


  $acceptedDisclaimer =
    isset($data['acceptedDisclaimer']) &&
    $data['acceptedDisclaimer'] === true;

  $auditSummary =
    isset($data['auditSummary']) &&
    is_array($data['auditSummary'])
    ? $data['auditSummary']
    : [];

  if (
    $auditName === '' ||
    !$auditEmail ||
    $auditWebsiteUrl === ''
  ) {
    http_response_code(400);

    error_log(
      'Audit validation failed. Received data: ' .
        print_r($data, true)
    );

    echo json_encode([
      'success' => false,
      'message' =>
      'Name, email and website URL are required.'
    ]);

    exit;
  }

  if (!$acceptedDisclaimer) {
    http_response_code(400);

    echo json_encode([
      'success' => false,
      'message' =>
      'Please accept the disclaimer before downloading the report.'
    ]);

    exit;
  }

  $auditSubmittedAt = date('c');

  $auditScoreLabels = [
    'overallScore' => 'Overall score',
    'googleScore' => 'Google/PageSpeed score',
    'localScore' => 'Local/technical score',
    'seoScore' => 'SEO score',
    'securityScore' => 'Security score',
    'accessibilityScore' => 'Accessibility score',
    'conversionScore' => 'Conversion score',
    'aiReadinessScore' => 'AI readiness score',
    'grade' => 'Grade'
  ];

  $auditScoreLines = [];

  foreach ($auditScoreLabels as $field => $label) {
    if (
      isset($auditSummary[$field]) &&
      $auditSummary[$field] !== ''
    ) {
      $cleanValue = trim(
        strip_tags((string) $auditSummary[$field])
      );

      $auditScoreLines[] =
        $label . ': ' . $cleanValue;
    }
  }

  $auditLeadRecord = [
    'id' => bin2hex(random_bytes(16)),
    'name' => $auditName,
    'email' => $auditEmail,
    'phone' => $auditPhone,
    'websiteUrl' => $auditWebsiteUrl,

    'acceptedDisclaimer' => true,
    'submittedAt' => $auditSubmittedAt,
    'auditSummary' => $auditSummary
  ];

  /*
   * Save the lead in static/audit-leads/leads.json.
   */
  try {
    $auditLeadsDirectory =
      __DIR__ . '/audit-leads';

    $auditLeadsFile =
      $auditLeadsDirectory . '/leads.json';

    if (!is_dir($auditLeadsDirectory)) {
      mkdir(
        $auditLeadsDirectory,
        0755,
        true
      );
    }

    $existingAuditLeads = [];

    if (file_exists($auditLeadsFile)) {
      $existingJson =
        file_get_contents($auditLeadsFile);

      $decodedLeads =
        json_decode($existingJson, true);

      if (is_array($decodedLeads)) {
        $existingAuditLeads = $decodedLeads;
      }
    }

    $existingAuditLeads[] = $auditLeadRecord;

    file_put_contents(
      $auditLeadsFile,
      json_encode(
        $existingAuditLeads,
        JSON_PRETTY_PRINT |
          JSON_UNESCAPED_SLASHES |
          JSON_UNESCAPED_UNICODE
      ),
      LOCK_EX
    );
  } catch (Throwable $leadStorageError) {
    error_log(
      'AUDIT LEAD STORAGE ERROR: ' .
        $leadStorageError->getMessage()
    );
  }

  $auditMail = new PHPMailer(true);

  try {
    $auditMail->SMTPDebug = 0;

    $auditMail->Debugoutput =
      function ($str, $level) {
        error_log(
          "AUDIT SMTP DEBUG [$level]: $str"
        );
      };

    $auditMail->isSMTP();
    $auditMail->CharSet = 'UTF-8';
    $auditMail->Timeout = 20;

    $auditMail->Host =
      'w01e99cb.kasserver.com';

    $auditMail->SMTPAuth = true;

    $auditMail->Username =
      'info@zorawebdesign.com';

    /*
     * Use the same real SMTP password as the contact form.
     */
    $auditMail->Password =
      'qupili1981AB51()%&';

    $auditMail->SMTPSecure =
      PHPMailer::ENCRYPTION_SMTPS;

    $auditMail->Port = 465;

    $auditMail->setFrom(
      'info@zorawebdesign.com',
      'Zora Web Design'
    );

    $auditMail->Sender =
      'info@zorawebdesign.com';

    $auditMail->addAddress(
      'info@zorawebdesign.com',
      'Zora Web Design'
    );

    $auditMail->addCC(
      'timjay08@gmail.com'
    );

    $auditMail->addReplyTo(
      $auditEmail,
      $auditName
    );

    $auditMail->isHTML(false);

    $auditHost = parse_url(
      $auditWebsiteUrl,
      PHP_URL_HOST
    );

    if (!$auditHost) {
      $auditHost = $auditWebsiteUrl;
    }

    $auditMail->Subject =
      'New Website Audit Lead – ' .
      $auditHost;

    $auditMail->Body =
      "New website audit lead\n\n" .
      "Name: {$auditName}\n" .
      "Email: {$auditEmail}\n" .
      "Phone: {$auditPhone}\n" .
      "Website URL: {$auditWebsiteUrl}\n" .

      "Submission date: {$auditSubmittedAt}\n" .
      "Disclaimer accepted: Yes\n";

    if (!empty($auditScoreLines)) {
      $auditMail->Body .=
        "\nAudit summary\n" .
        implode("\n", $auditScoreLines) .
        "\n";
    }

    $auditMail->send();
    $auditMail->smtpClose();

    echo json_encode([
      'success' => true,
      'emailSent' => true,
      'message' =>
      'Lead submitted and email sent successfully.'
    ]);

    exit;
  } catch (Exception $auditMailError) {
    error_log(
      'AUDIT MAIL TRANSPORT ERROR: ' .
        $auditMail->ErrorInfo
    );

    http_response_code(500);

    echo json_encode([
      'success' => false,
      'emailSent' => false,
      'message' =>
      'Your details could not be emailed. Please try again.'
    ]);

    exit;
  }
}


/*
 * Handle Website Configurator quote requests.
 * This branch sends the full configuration to Zora Web Design and
 * sends a shorter confirmation email to the potential client.
 */
if ($formType === 'website-configurator') {
  $configLanguage =
    (($data['language'] ?? 'de') === 'en')
    ? 'en'
    : 'de';

  $configName = isset($data['name'])
    ? trim(strip_tags((string) $data['name']))
    : '';

  $configEmailRaw = isset($data['email'])
    ? trim((string) $data['email'])
    : '';

  $configEmail = filter_var(
    $configEmailRaw,
    FILTER_VALIDATE_EMAIL
  );

  $configPhone = isset($data['phone'])
    ? trim(strip_tags((string) $data['phone']))
    : '';

  $configCompany = isset($data['company'])
    ? trim(strip_tags((string) $data['company']))
    : '';

  $configCurrentWebsite = isset($data['currentWebsite'])
    ? trim(strip_tags((string) $data['currentWebsite']))
    : '';

  $configPreferredContact = isset($data['preferredContact'])
    ? trim(strip_tags((string) $data['preferredContact']))
    : '';

  $configComments = isset($data['comments'])
    ? trim(strip_tags((string) $data['comments']))
    : '';

  $configConsent =
    isset($data['consent']) &&
    $data['consent'] === true;

  $selectedPackageId = isset($data['selectedPackage'])
    ? trim(strip_tags((string) $data['selectedPackage']))
    : '';

  $selectedPackageLabel = isset($data['selectedPackageLabel'])
    ? trim(strip_tags((string) $data['selectedPackageLabel']))
    : $selectedPackageId;

  $recommendedPackageLabel = isset($data['recommendedPackageLabel'])
    ? trim(strip_tags((string) $data['recommendedPackageLabel']))
    : '';

  $configSubmittedAt = isset($data['submittedAt'])
    ? trim(strip_tags((string) $data['submittedAt']))
    : date('c');

  $configSourceUrl = isset($data['sourceUrl'])
    ? trim(strip_tags((string) $data['sourceUrl']))
    : '';

  $allowedPackages = [
    'essential',
    'growth',
    'advanced'
  ];

  $allowedContactMethods = [
    'email',
    'phone',
    'either'
  ];

  if (
    $configName === '' ||
    !$configEmail ||
    $configCompany === '' ||
    !in_array(
      $selectedPackageId,
      $allowedPackages,
      true
    ) ||
    !in_array(
      $configPreferredContact,
      $allowedContactMethods,
      true
    )
  ) {
    http_response_code(400);

    echo json_encode([
      'success' => false,
      'message' =>
      $configLanguage === 'en'
        ? 'Please complete all required contact details.'
        : 'Bitte füllen Sie alle Pflichtfelder aus.'
    ]);

    exit;
  }

  if (!$configConsent) {
    http_response_code(400);

    echo json_encode([
      'success' => false,
      'message' =>
      $configLanguage === 'en'
        ? 'Please accept the consent statement.'
        : 'Bitte stimmen Sie der Verarbeitung Ihrer Angaben zu.'
    ]);

    exit;
  }

  if (
    $configPreferredContact === 'phone' &&
    $configPhone === ''
  ) {
    http_response_code(400);

    echo json_encode([
      'success' => false,
      'message' =>
      $configLanguage === 'en'
        ? 'Please provide a phone number.'
        : 'Bitte geben Sie eine Telefonnummer an.'
    ]);

    exit;
  }

  $configuration =
    isset($data['configuration']) &&
    is_array($data['configuration'])
    ? $data['configuration']
    : [];

  $project =
    isset($configuration['project']) &&
    is_array($configuration['project'])
    ? $configuration['project']
    : [];

  $contentAndDesign =
    isset($configuration['contentAndDesign']) &&
    is_array($configuration['contentAndDesign'])
    ? $configuration['contentAndDesign']
    : [];

  $pagesAndStructure =
    isset($configuration['pagesAndStructure']) &&
    is_array($configuration['pagesAndStructure'])
    ? $configuration['pagesAndStructure']
    : [];

  $featuresAndTechnology =
    isset($configuration['featuresAndTechnology']) &&
    is_array($configuration['featuresAndTechnology'])
    ? $configuration['featuresAndTechnology']
    : [];

  $timelineAndSupport =
    isset($configuration['timelineAndSupport']) &&
    is_array($configuration['timelineAndSupport'])
    ? $configuration['timelineAndSupport']
    : [];

  $escapeConfigHtml = function ($value) {
    return htmlspecialchars(
      (string) $value,
      ENT_QUOTES | ENT_SUBSTITUTE,
      'UTF-8'
    );
  };

  $cleanConfigValue = function ($value, $fallback = '') {
    $cleanValue = trim(strip_tags((string) $value));

    return $cleanValue !== ''
      ? $cleanValue
      : $fallback;
  };

  $cleanConfigList = function ($value) {
    if (!is_array($value)) {
      return [];
    }

    $cleanItems = [];

    foreach (array_slice($value, 0, 100) as $item) {
      $cleanItem = trim(strip_tags((string) $item));

      if ($cleanItem !== '') {
        $cleanItems[] = $cleanItem;
      }
    }

    return $cleanItems;
  };

  $formatConfigValue = function (
    $value,
    $emptyText
  ) use (
    $escapeConfigHtml,
    $cleanConfigValue,
    $cleanConfigList
  ) {
    if (is_array($value)) {
      $items = $cleanConfigList($value);

      if (count($items) === 0) {
        return '<span style="color:#777777;">' .
          $escapeConfigHtml($emptyText) .
          '</span>';
      }

      $htmlItems = '';

      foreach ($items as $item) {
        if (filter_var($item, FILTER_VALIDATE_URL)) {
          $renderedItem =
            '<a href="' .
            $escapeConfigHtml($item) .
            '" style="color:#0043ff;text-decoration:underline;">' .
            $escapeConfigHtml($item) .
            '</a>';
        } else {
          $renderedItem = $escapeConfigHtml($item);
        }

        $htmlItems .=
          '<li style="margin:0 0 7px;">' .
          $renderedItem .
          '</li>';
      }

      return
        '<ul style="margin:0;padding-left:18px;">' .
        $htmlItems .
        '</ul>';
    }

    $textValue = $cleanConfigValue($value);

    if ($textValue === '') {
      return '<span style="color:#777777;">' .
        $escapeConfigHtml($emptyText) .
        '</span>';
    }

    if (filter_var($textValue, FILTER_VALIDATE_URL)) {
      return
        '<a href="' .
        $escapeConfigHtml($textValue) .
        '" style="color:#0043ff;text-decoration:underline;">' .
        $escapeConfigHtml($textValue) .
        '</a>';
    }

    return nl2br($escapeConfigHtml($textValue));
  };

  $renderConfigSection = function (
    $title,
    $rows,
    $emptyText
  ) use (
    $escapeConfigHtml,
    $formatConfigValue
  ) {
    $sectionHtml =
      '<section style="' .
      'margin:0 0 24px;' .
      'border:1px solid #dedede;' .
      'background:#ffffff;' .
      '">' .
      '<h2 style="' .
      'margin:0;' .
      'padding:16px 18px;' .
      'border-bottom:1px solid #dedede;' .
      'font-size:16px;' .
      'line-height:1.3;' .
      'color:#111111;' .
      '">' .
      $escapeConfigHtml($title) .
      '</h2>';

    foreach ($rows as $label => $value) {
      $sectionHtml .=
        '<div style="' .
        'padding:14px 18px;' .
        'border-bottom:1px solid #eeeeee;' .
        '">' .
        '<div style="' .
        'margin:0 0 6px;' .
        'font-size:10px;' .
        'font-weight:700;' .
        'letter-spacing:.08em;' .
        'text-transform:uppercase;' .
        'color:#777777;' .
        '">' .
        $escapeConfigHtml($label) .
        '</div>' .
        '<div style="' .
        'font-size:14px;' .
        'line-height:1.55;' .
        'color:#222222;' .
        '">' .
        $formatConfigValue($value, $emptyText) .
        '</div>' .
        '</div>';
    }

    $sectionHtml .= '</section>';

    return $sectionHtml;
  };

  $renderConfigDocument = function (
    $documentLanguage,
    $title,
    $intro,
    $body
  ) use ($escapeConfigHtml) {
    return
      '<!doctype html>' .
      '<html lang="' .
      $escapeConfigHtml($documentLanguage) .
      '">' .
      '<head>' .
      '<meta charset="UTF-8">' .
      '<meta name="viewport" content="width=device-width,initial-scale=1.0">' .
      '<title>' .
      $escapeConfigHtml($title) .
      '</title>' .
      '</head>' .
      '<body style="' .
      'margin:0;' .
      'padding:0;' .
      'background:#f3f3f3;' .
      'font-family:Arial,sans-serif;' .
      'color:#111111;' .
      '">' .
      '<div style="' .
      'max-width:760px;' .
      'margin:0 auto;' .
      'padding:30px 18px 50px;' .
      '">' .
      '<header style="' .
      'padding:26px;' .
      'background:#080808;' .
      'color:#ffffff;' .
      'border-top:4px solid #0043ff;' .
      '">' .
      '<div style="' .
      'margin-bottom:12px;' .
      'font-size:10px;' .
      'font-weight:700;' .
      'letter-spacing:.1em;' .
      'text-transform:uppercase;' .
      'color:#7f98ff;' .
      '">Zora Web Design</div>' .
      '<h1 style="' .
      'margin:0;' .
      'font-size:28px;' .
      'line-height:1.1;' .
      '">' .
      $escapeConfigHtml($title) .
      '</h1>' .
      '<p style="' .
      'margin:14px 0 0;' .
      'font-size:14px;' .
      'line-height:1.65;' .
      'color:#bdbdbd;' .
      '">' .
      $escapeConfigHtml($intro) .
      '</p>' .
      '</header>' .
      '<main style="padding-top:24px;">' .
      $body .
      '</main>' .
      '<footer style="' .
      'padding:18px 0;' .
      'font-size:11px;' .
      'line-height:1.6;' .
      'color:#777777;' .
      '">' .
      'Zora Web Design · Vienna · info@zorawebdesign.com' .
      '</footer>' .
      '</div>' .
      '</body>' .
      '</html>';
  };

  $emptyText =
    $configLanguage === 'en'
    ? 'Not specified'
    : 'Nicht angegeben';

  $ownerContactLabels = [
    'email' => 'E-Mail',
    'phone' => 'Telefon',
    'either' => 'E-Mail oder Telefon'
  ];

  $ownerContactLabel =
    $ownerContactLabels[$configPreferredContact] ??
    $configPreferredContact;

  $ownerBody =
    $renderConfigSection(
      'Kontaktangaben',
      [
        'Name' => $configName,
        'Unternehmen / Organisation' => $configCompany,
        'E-Mail' => $configEmail,
        'Telefon' => $configPhone,
        'Aktuelle Website' => $configCurrentWebsite,
        'Bevorzugter Kontakt' => $ownerContactLabel,
        'Weitere Hinweise' => $configComments,
        'Übermittelt am' => $configSubmittedAt,
        'Quelle' => $configSourceUrl
      ],
      'Nicht angegeben'
    ) .
    $renderConfigSection(
      'Ausgewählter Projektumfang',
      [
        'Ausgewählt' => $selectedPackageLabel,
        'Empfehlung' => $recommendedPackageLabel
      ],
      'Nicht angegeben'
    ) .
    $renderConfigSection(
      'Projektgrundlage',
      [
        'Website-Art' =>
        $project['websiteType'] ?? '',
        'Ziele' =>
        $project['goals'] ?? [],
        'Aktueller Stand' =>
        $project['projectStatus'] ?? ''
      ],
      'Nicht angegeben'
    ) .
    $renderConfigSection(
      'Inhalte und Design',
      [
        'Inhalte' =>
        $contentAndDesign['contentReadiness'] ?? '',
        'Bildmaterial' =>
        $contentAndDesign['visualReadiness'] ?? '',
        'Branding' =>
        $contentAndDesign['brandingReadiness'] ?? '',
        'Designrichtung' =>
        $contentAndDesign['designDirection'] ?? '',
        'Designreferenzen' =>
        $contentAndDesign['designReferences'] ?? [],
        'Unterstützungsbedarf' =>
        $contentAndDesign['supportNeeds'] ?? []
      ],
      'Nicht angegeben'
    ) .
    $renderConfigSection(
      'Seiten und Struktur',
      [
        'Ausgewählte Seiten' =>
        $pagesAndStructure['selectedPages'] ?? [],
        'Individuelle Seiten' =>
        $pagesAndStructure['customPages'] ?? [],
        'Wiederkehrende Detailseiten' =>
        $pagesAndStructure['pageVolume'] ?? ''
      ],
      'Nicht angegeben'
    ) .
    $renderConfigSection(
      'Funktionen und Technik',
      [
        'Ausgewählte Funktionen' =>
        $featuresAndTechnology['selectedFeatures'] ?? [],
        'Website-Sprachen' =>
        $featuresAndTechnology['websiteLanguages'] ?? '',
        'Besondere Integration' =>
        $featuresAndTechnology['customIntegration'] ?? '',
        'Weitere Anforderungen' =>
        $featuresAndTechnology['finalRequirements'] ?? [],
        'Zusätzliche Beschreibung' =>
        $featuresAndTechnology['finalRequirementNote'] ?? ''
      ],
      'Nicht angegeben'
    ) .
    $renderConfigSection(
      'Zeitplan und Betreuung',
      [
        'Projektstart' =>
        $timelineAndSupport['projectStart'] ?? '',
        'Veröffentlichung' =>
        $timelineAndSupport['launchTimeline'] ?? '',
        'Zusammenarbeit' =>
        $timelineAndSupport['collaborationModel'] ?? '',
        'Laufende Betreuung' =>
        $timelineAndSupport['ongoingSupport'] ?? [],
        'Einführung' =>
        $timelineAndSupport['trainingPreference'] ?? '',
        'Weitere Hinweise' =>
        $timelineAndSupport['timelineNote'] ?? ''
      ],
      'Nicht angegeben'
    );

  $ownerEmailHtml = $renderConfigDocument(
    'de',
    'Neue Website-Konfigurator Anfrage',
    'Eine neue vollständige Projektkonfiguration wurde über zorawebdesign.com übermittelt.',
    $ownerBody
  );

  $ownerMail = new PHPMailer(true);

  try {
    $ownerMail->SMTPDebug = 0;

    $ownerMail->Debugoutput = function ($str, $level) {
      error_log(
        "CONFIGURATOR OWNER SMTP DEBUG [$level]: $str"
      );
    };

    $ownerMail->isSMTP();
    $ownerMail->CharSet = 'UTF-8';
    $ownerMail->Timeout = 20;
    $ownerMail->Host = 'w01e99cb.kasserver.com';
    $ownerMail->SMTPAuth = true;
    $ownerMail->Username = 'info@zorawebdesign.com';
    $ownerMail->Password = 'qupili1981AB51()%&';
    $ownerMail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    $ownerMail->Port = 465;

    $ownerMail->setFrom(
      'info@zorawebdesign.com',
      'Zora Web Design'
    );

    $ownerMail->Sender = 'info@zorawebdesign.com';

    $ownerMail->addAddress(
      'info@zorawebdesign.com',
      'Zora Web Design'
    );

    $ownerMail->addCC('timjay08@gmail.com');

    $ownerMail->addReplyTo(
      $configEmail,
      $configName
    );

    $ownerMail->isHTML(true);

    $ownerMail->Subject =
      'Website-Konfigurator – ' .
      $configCompany .
      ' – ' .
      $selectedPackageLabel;

    $ownerMail->Body = $ownerEmailHtml;

    $ownerMail->AltBody =
      "Neue Website-Konfigurator Anfrage\n\n" .
      "Name: {$configName}\n" .
      "Unternehmen: {$configCompany}\n" .
      "E-Mail: {$configEmail}\n" .
      "Telefon: {$configPhone}\n" .
      "Ausgewählter Umfang: {$selectedPackageLabel}\n" .
      "Empfohlener Umfang: {$recommendedPackageLabel}\n";

    $ownerMail->send();
    $ownerMail->smtpClose();
  } catch (Exception $ownerMailError) {
    error_log(
      'CONFIGURATOR OWNER MAIL ERROR: ' .
        $ownerMail->ErrorInfo
    );

    http_response_code(500);

    echo json_encode([
      'success' => false,
      'ownerEmailSent' => false,
      'clientEmailSent' => false,
      'message' =>
      $configLanguage === 'en'
        ? 'Your configuration could not be sent. Please try again.'
        : 'Ihre Konfiguration konnte nicht gesendet werden. Bitte versuchen Sie es erneut.'
    ]);

    exit;
  }

  if ($configLanguage === 'en') {
    $clientContactLabels = [
      'email' => 'Email',
      'phone' => 'Phone',
      'either' => 'Email or phone'
    ];

    $clientContactLabel =
      $clientContactLabels[$configPreferredContact] ??
      $configPreferredContact;

    $clientTitle = 'Your website configuration';

    $clientIntro =
      'Thank you for submitting your project details. Zora Web Design will personally review your configuration and contact you with the next steps.';

    $clientBody = $renderConfigSection(
      'Your request',
      [
        'Selected project scope' => $selectedPackageLabel,
        'Website type' => $project['websiteType'] ?? '',
        'Main goals' => $project['goals'] ?? [],
        'Selected pages' =>
        $pagesAndStructure['selectedPages'] ?? [],
        'Requested features' =>
        $featuresAndTechnology['selectedFeatures'] ?? [],
        'Preferred contact method' => $clientContactLabel
      ],
      'Not specified'
    );

    $clientSubject =
      'We received your website configuration';
  } else {
    $clientContactLabels = [
      'email' => 'E-Mail',
      'phone' => 'Telefon',
      'either' => 'E-Mail oder Telefon'
    ];

    $clientContactLabel =
      $clientContactLabels[$configPreferredContact] ??
      $configPreferredContact;

    $clientTitle = 'Ihre Website-Konfiguration';

    $clientIntro =
      'Vielen Dank für Ihre Projektangaben. Zora Web Design prüft Ihre Konfiguration persönlich und meldet sich mit den nächsten Schritten.';

    $clientBody = $renderConfigSection(
      'Ihre Anfrage',
      [
        'Ausgewählter Projektumfang' => $selectedPackageLabel,
        'Website-Art' => $project['websiteType'] ?? '',
        'Wichtigste Ziele' => $project['goals'] ?? [],
        'Ausgewählte Seiten' =>
        $pagesAndStructure['selectedPages'] ?? [],
        'Gewünschte Funktionen' =>
        $featuresAndTechnology['selectedFeatures'] ?? [],
        'Bevorzugte Kontaktart' => $clientContactLabel
      ],
      'Nicht angegeben'
    );

    $clientSubject =
      'Ihre Website-Konfiguration wurde empfangen';
  }

  $clientEmailHtml = $renderConfigDocument(
    $configLanguage,
    $clientTitle,
    $clientIntro,
    $clientBody
  );

  $clientEmailSent = false;
  $clientMail = new PHPMailer(true);

  try {
    $clientMail->SMTPDebug = 0;

    $clientMail->Debugoutput = function ($str, $level) {
      error_log(
        "CONFIGURATOR CLIENT SMTP DEBUG [$level]: $str"
      );
    };

    $clientMail->isSMTP();
    $clientMail->CharSet = 'UTF-8';
    $clientMail->Timeout = 20;
    $clientMail->Host = 'w01e99cb.kasserver.com';
    $clientMail->SMTPAuth = true;
    $clientMail->Username = 'info@zorawebdesign.com';
    $clientMail->Password = 'qupili1981AB51()%&';
    $clientMail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    $clientMail->Port = 465;

    $clientMail->setFrom(
      'info@zorawebdesign.com',
      'Zora Web Design'
    );

    $clientMail->Sender = 'info@zorawebdesign.com';

    $clientMail->addAddress(
      $configEmail,
      $configName
    );

    $clientMail->addReplyTo(
      'info@zorawebdesign.com',
      'Zora Web Design'
    );

    $clientMail->isHTML(true);
    $clientMail->Subject = $clientSubject;
    $clientMail->Body = $clientEmailHtml;

    $clientMail->AltBody =
      $clientIntro .
      "\n\n" .
      ($configLanguage === 'en'
        ? 'Selected package: '
        : 'Ausgewählter Umfang: ') .
      $selectedPackageLabel;

    $clientMail->send();
    $clientMail->smtpClose();

    $clientEmailSent = true;
  } catch (Exception $clientMailError) {
    error_log(
      'CONFIGURATOR CLIENT MAIL ERROR: ' .
        $clientMail->ErrorInfo
    );
  }

  echo json_encode([
    'success' => true,
    'ownerEmailSent' => true,
    'clientEmailSent' => $clientEmailSent,
    'message' =>
    $configLanguage === 'en'
      ? 'Your configuration was submitted successfully.'
      : 'Ihre Konfiguration wurde erfolgreich übermittelt.'
  ]);

  exit;
}

$name = isset($data['name'])
  ? trim(strip_tags((string) $data['name']))
  : '';

$company = isset($data['company']) &&
  trim((string) $data['company']) !== ''
  ? trim(strip_tags((string) $data['company']))
  : 'Not specified';

$emailRaw = isset($data['email'])
  ? trim((string) $data['email'])
  : '';

$email = filter_var($emailRaw, FILTER_VALIDATE_EMAIL);

$telephone = isset($data['telephone']) &&
  trim((string) $data['telephone']) !== ''
  ? trim(strip_tags((string) $data['telephone']))
  : 'Not specified';

$message = isset($data['message'])
  ? trim(strip_tags((string) $data['message']))
  : '';

if ($name === '' || !$email || $message === '') {
  http_response_code(400);

  error_log(
    'Validation failed. Received data: ' .
      print_r($data, true)
  );

  echo json_encode([
    'success' => false,
    'message' => 'Name, email and message are required.'
  ]);

  exit;
}

/*
 * Create and send the email.
 */
$mail = new PHPMailer(true);

try {
  $mail->SMTPDebug = 0;

  $mail->Debugoutput = function ($str, $level) {
    error_log("SMTP DEBUG [$level]: $str");
  };

  $mail->isSMTP();
  $mail->CharSet = 'UTF-8';
  $mail->Timeout = 20;

  $mail->Host = 'w01e99cb.kasserver.com';
  $mail->SMTPAuth = true;
  $mail->Username = 'info@zorawebdesign.com';

  /*
   * Replace this placeholder with the actual mailbox password
   * in your private local/server file.
   */
  $mail->Password = 'qupili1981AB51()%&';

  $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
  $mail->Port = 465;

  $mail->setFrom(
    'info@zorawebdesign.com',
    'Zora Web Design'
  );

  $mail->Sender = 'info@zorawebdesign.com';

  /*
   * Send to the Zora Web Design inbox.
   */
  $mail->addAddress(
    'info@zorawebdesign.com',
    'Zora Web Design'
  );

  /*
   * Also send a copy to Gmail.
   */
  $mail->addCC('timjay08@gmail.com');

  /*
   * Replying to the email will reply directly to the client.
   */
  $mail->addReplyTo($email, $name);

  $mail->isHTML(false);

  $mail->Subject =
    'Neue Kontaktanfrage – ' .
    $name .
    ' – ' .
    date('Y-m-d H:i:s');

  $mail->Body =
    "Neue Kontaktanfrage über zorawebdesign.com\n\n" .
    "Name: {$name}\n" .
    "Unternehmen: {$company}\n" .
    "E-Mail: {$email}\n" .
    "Telefon: {$telephone}\n\n" .
    "Nachricht:\n{$message}\n";

  $mail->send();
  $mail->smtpClose();

  echo json_encode([
    'success' => true,
    'message' => 'Message sent successfully.'
  ]);
} catch (Exception $e) {
  error_log(
    'MAIL TRANSPORT SYSTEM ERROR: ' .
      $mail->ErrorInfo
  );

  http_response_code(500);

  echo json_encode([
    'success' => false,
    'message' => 'Mail delivery error encountered.',
    'debug' => $mail->ErrorInfo
  ]);
}
