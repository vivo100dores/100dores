<?php
header('Content-Type: text/csv');
header('Content-Disposition: attachment; filename="leads.csv"');

$jsonFile = __DIR__ . '/kwai_leads.json';

$de = $_GET['de'] ?? null;
$ate = $_GET['ate'] ?? null;

$data = file_exists($jsonFile) ? json_decode(file_get_contents($jsonFile), true) : [];

if ($de || $ate) {
    $data = array_filter($data, function($lead) use ($de, $ate) {
        $dataLead = $lead['created_at'] ?? null;
        if (!$dataLead) return false;
        if ($de && $dataLead < $de . ' 00:00:00') return false;
        if ($ate && $dataLead > $ate . ' 23:59:59') return false;
        return true;
    });
}

$output = fopen('php://output', 'w');

$columns = ["created_at", "click_id", "campaign_name", "campaign_id", "adgroup_name", "adgroup_id", "creative_id", "placement", "os", "device_model", "base_url", "url_target", "specs"];
fputcsv($output, $columns);

foreach ($data as $lead) {
    $row = [];
    foreach ($columns as $col) {
        $row[] = $lead[$col] ?? '';
    }
    fputcsv($output, $row);
}

fclose($output);
exit;
?>
