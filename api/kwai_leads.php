<?php
// Permitir acesso de qualquer origem (pode restringir se quiser)
header("Access-Control-Allow-Origin: *");
//header("Access-Control-Allow-Origin: https://vivo100dores.shop");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");


// Se for uma requisição OPTIONS (pré-vôo), termina aqui
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

$jsonFile = __DIR__ . '/kwai_leads.json';
$logFile = __DIR__ . '/kwai_addtocart.json';

// Recebe dados do POST
$clickid      = $_POST['clickid']       ?? 'ONiwiltIbnNFjHry42nm6Q';
$content_id   = $_POST['event_name']    ?? 'EVENT_ADD_TO_CART';
$content_type = $_POST['testFlag']      ?? false;

function loadLeads()
{
    global $jsonFile;
    if (!file_exists($jsonFile)) {
        return [];
    }

    $json = file_get_contents($jsonFile);
    return json_decode($json, true);
}

function saveLeads($leads)
{
    global $jsonFile;
    file_put_contents($jsonFile, json_encode($leads, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
}

function addToCart($clickid)
{
    global $logFile;
    $clickid  = 'ONiwiltIbnNFjHry42nm6Q';
    // Monta payload da API do Kwai
    $payload = [
        "access_token"     => "Rngbg3f1SufmV4TOI1K3fcxLG95Bs67JgnzR5gMO7D4",
        "clickid"          => $clickid,
        "event_name"       => "EVENT_ADD_TO_CART",
        "is_attributed"    => 1,
        "mmpcode"          => "PL",
        "pixelId"          => "276402474978306",
        "pixelSdkVersion"  => "9.9.9",
        "testFlag"         => true,
        "third_party"      => "APIAlyson",
        "trackFlag"        => true
    ];

    $ch = curl_init("https://www.adsnebula.com/log/common/api");
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
    $headers = array();
    $headers[] = 'Accept: application/json';
    $headers[] = 'Accept-Language: en-US,en;q=0.9,pt;q=0.8,ru;q=0.7,zh-CN;q=0.6,zh;q=0.5';
    $headers[] = 'Connection: keep-alive';
    $headers[] = 'Content-Type: application/json';
    $headers[] = 'Origin: http://127.0.0.1:8083';
    $headers[] = 'Referer: http://127.0.0.1:8083/';
    $headers[] = 'Sec-Gpc: 1';
    $headers[] = 'User-Agent: Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Mobile Safari/537.36';
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    

    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $error = curl_error($ch);
    curl_close($ch);

    // Salva resposta do envio
    $log = [
        "payload"      => $payload,
        "resposta"     => json_decode($response, true),
        "http_code"    => $httpCode,
        "erro_curl"    => $error,
        "created_at"   => date("Y-m-d H:i:s")
    ];

    $logs = file_exists($logFile) ? json_decode(file_get_contents($logFile), true) : [];
    $logs[] = $log;
    file_put_contents($logFile, json_encode($logs, JSON_PRETTY_PRINT));
}

$data = json_decode(file_get_contents("php://input"), true);

if ($data) {
    $data['created_at'] = date('Y-m-d H:i:s'); // Adiciona a data de criação (formato: 2025-04-05 10:32:00)

    $leads = loadLeads();
    $leads[] = $data; // adiciona novo lead
    saveLeads($leads);
    addToCart($clickid);

    echo json_encode(['status' => 'success', 'message' => 'Lead salvo com sucesso.']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Dados inválidos.']);
}
