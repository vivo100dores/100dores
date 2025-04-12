<!DOCTYPE html>
<html lang="pt-br">
<head>
  <meta charset="UTF-8">
  <title>Painel de Leads - Kwai</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
  <style>
    table th { cursor: pointer; }
  </style>
</head>
<body>
<div class="container py-4">
  <h2 class="mb-4">Painel de Leads - Kwai</h2>

  <div class="row g-3 mb-3">
    <div class="col-md-3">
      <input type="date" id="data_de" class="form-control" placeholder="Data De">
    </div>
    <div class="col-md-3">
      <input type="date" id="data_ate" class="form-control" placeholder="Data Até">
    </div>
    <div class="col-md-4">
      <input type="text" id="search" class="form-control" placeholder="Pesquisar...">
    </div>
    <div class="col-md-2">
      <button onclick="loadLeads()" class="btn btn-primary w-100">Filtrar</button>
    </div>
  </div>

  <div class="mb-3 text-end">
    <a id="exportar" href="#" class="btn btn-success">Exportar CSV</a>
  </div>

  <div class="table-responsive">
    <table class="table table-bordered table-hover">
      <thead>
        <tr id="thead"></tr>
      </thead>
      <tbody id="tbody"></tbody>
    </table>
    <div class="d-flex justify-content-between align-items-center mb-2">
      <div id="total-registros"></div>
      <nav>
        <ul id="pagination" class="pagination mb-0"></ul>
      </nav>
    </div>
  </div>

  <nav>
    <ul class="pagination justify-content-center" id="pagination"></ul>
  </nav>
</div>

<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
<script>
let leads = [], filtered = [], currentPage = 1, perPage = 5, orderBy = '', orderAsc = true;

const columns = ["created_at", "campaign_name", "CampaignID", "adgroup_name", "adSETID", "CreativeID", "pixel_id", "botao", "os", "is_bot", "botd", "device_model", "device_model", "click_id", "base_url", "url_target", "specs"];

function loadLeads() {
  const de = $('#data_de').val();
  const ate = $('#data_ate').val();
  const search = $('#search').val();

  $.getJSON('leads.php', { de, ate }, function(data) {
    leads = data;
    filtered = leads.filter(item => {
      return Object.values(item).some(v => v.toLowerCase().includes(search.toLowerCase()));
    });
    currentPage = 1;
    renderTable();
    $("#exportar").attr("href", `export.php?de=${de}&ate=${ate}`);
  });
}

function renderTable() {
  let data = [...filtered];
  
  if (orderBy) {
    data.sort((a, b) => {
      if (a[orderBy] < b[orderBy]) return orderAsc ? -1 : 1;
      if (a[orderBy] > b[orderBy]) return orderAsc ? 1 : -1;
      return 0;
    });
  }

  const start = (currentPage - 1) * perPage;
  const end = start + perPage;
  const paginated = data.slice(start, end);
  
  $('#thead').html(columns.map(col => `<th onclick="sortTable('${col}')">${col.replace('_', ' ').toUpperCase()}</th>`).join(''));
  $('#tbody').html(paginated.map(lead => `<tr>${columns.map(c => `<td>${lead[c] || ''}</td>`).join('')}</tr>`).join(''));
  document.getElementById('total-registros').innerText = `Exibindo ${start + 1}-${Math.min(end, data.length)} de ${data.length}`;
  renderPagination();

}

function renderPagination() {
  const totalPages = Math.ceil(filtered.length / perPage);
  const pagination = document.getElementById('pagination');
  pagination.innerHTML = '';
  
  const createPageItem = (page, label = page) => `
    <li class="page-item ${page === currentPage ? 'active' : ''}">
      <button class="page-link" onclick="goToPage(${page})">${label}</button>
    </li>
  `;
  
  if (currentPage > 1) pagination.innerHTML += createPageItem(currentPage - 1, '«');

  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pagination.innerHTML += createPageItem(i);
  } else {
    pagination.innerHTML += createPageItem(1);
    if (currentPage > 4) pagination.innerHTML += `<li class="page-item disabled"><span class="page-link">...</span></li>`;
    const startPage = Math.max(2, currentPage - 1);
    const endPage = Math.min(totalPages - 1, currentPage + 1);

    for (let i = startPage; i <= endPage; i++) pagination.innerHTML += createPageItem(i);

    if (currentPage < totalPages - 3) pagination.innerHTML += `<li class="page-item disabled"><span class="page-link">...</span></li>`;
    pagination.innerHTML += createPageItem(totalPages);
  }

  if (currentPage < totalPages) pagination.innerHTML += createPageItem(currentPage + 1, '»');

  /*let html = '';
  for (let i = 1; i <= total; i++) {
    html += `<li class="page-item ${i === currentPage ? 'active' : ''}">
               <a class="page-link" href="#" onclick="currentPage=${i};renderTable();renderPagination();return false;">${i}</a>
             </li>`;
  }
  $('#pagination').html(html);*/
}

function goToPage(page) {
  currentPage = page;
  renderTable();
}

function sortTable(col) {
  orderAsc = orderBy === col ? !orderAsc : true;
  orderBy = col;
  renderTable();
}

$(document).ready(loadLeads);
</script>
</body>
</html>
