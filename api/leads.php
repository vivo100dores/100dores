<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$jsonFile = __DIR__ . '/../kwai_leads.json';

$startDate = $_GET['de'] ?? null;
$endDate = $_GET['ate'] ?? null;

if (!file_exists($jsonFile)) {
    echo json_encode([]);
    exit;
}

$data = json_decode(file_get_contents($jsonFile), true);

// Separa os dados válidos
$data = is_array($data) ? $data : [];

if ($startDate && $endDate) {
    $data = array_filter($data, function($lead) use ($startDate, $endDate) {
        return isset($lead['created_at']) && 
               $lead['created_at'] >= $startDate . ' 00:00:00' && 
               $lead['created_at'] <= $endDate . ' 23:59:59';
    });
}

// Ordena por created_at decrescente
usort($data, function($a, $b) {
    return strtotime($b['created_at']) <=> strtotime($a['created_at']);
});

echo json_encode(array_values($data));
exit;
?>
