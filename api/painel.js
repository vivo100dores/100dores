let leads = [];
let currentPage = 1;
const rowsPerPage = 10;

$(document).ready(function () {
    fetchLeads();

    $("#searchInput, #dataInicio, #dataFim").on("input change", function () {
        currentPage = 1;
        displayTable();
    });
});

function fetchLeads() {
    $.getJSON('leads.php', function (data) {
        leads = data;
        displayTable();
    });
}

function displayTable() {
    let tbody = $("#leadsTable tbody");
    tbody.empty();

    let search = $("#searchInput").val().toLowerCase();
    let dataInicio = $("#dataInicio").val();
    let dataFim = $("#dataFim").val();

    let filteredLeads = leads.filter(item => {
        let createdAt = item.created_at.split(' ')[0];

        let filtroData = (!dataInicio || createdAt >= dataInicio) &&
                         (!dataFim || createdAt <= dataFim);

        let filtroBusca = Object.values(item).some(v => v.toString().toLowerCase().includes(search));

        return filtroData && filtroBusca;
    });

    let start = (currentPage - 1) * rowsPerPage;
    let end = start + rowsPerPage;
    let paginatedItems = filteredLeads.slice(start, end);

    paginatedItems.forEach(lead => {
        tbody.append(`
            <tr>
                <td>${lead.created_at}</td>
                <td>${lead.click_id}</td>
                <td>${lead.campaign_name}</td>
                <td>${lead.adgroup_name}</td>
                <td>${lead.creative_id}</td>
                <td>${lead.placement}</td>
                <td>${lead.os}</td>
                <td>${lead.device_model}</td>
                <td><a href="${lead.base_url}" target="_blank">Link</a></td>
                <td>${lead.url_target}</td>
                <td>${lead.specs}</td>
            </tr>
        `);
    });

    $("#pageInfo").text(`Página ${currentPage} de ${Math.ceil(filteredLeads.length / rowsPerPage)}`);
}

function previousPage() {
    if (currentPage > 1) {
        currentPage--;
        displayTable();
    }
}

function nextPage() {
    let search = $("#searchInput").val().toLowerCase();
    let dataInicio = $("#dataInicio").val();
    let dataFim = $("#dataFim").val();

    let totalRows = leads.filter(item => {
        let createdAt = item.created_at.split(' ')[0];
        return (!dataInicio || createdAt >= dataInicio) &&
               (!dataFim || createdAt <= dataFim) &&
               Object.values(item).some(v => v.toString().toLowerCase().includes(search));
    }).length;

    if (currentPage < Math.ceil(totalRows / rowsPerPage)) {
        currentPage++;
        displayTable();
    }
}

function sortTable(column) {
    leads.sort((a, b) => {
        let valA = Object.values(a)[column] || "";
        let valB = Object.values(b)[column] || "";
        return valA.toString().localeCompare(valB.toString());
    });
    displayTable();
}

function exportCSV() {
    let csv = 'Data,Click ID,Campanha,Adgroup,Criativo,Placement,OS,Device,Base URL,Target,Specs\n';

    leads.forEach(item => {
        csv += `"${item.created_at}","${item.click_id}","${item.campaign_name}","${item.adgroup_name}","${item.creative_id}","${item.placement}","${item.os}","${item.device_model}","${item.base_url}","${item.url_target}","${item.specs}"\n`;
    });

    let hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
    hiddenElement.target = '_blank';
    hiddenElement.download = 'leads.csv';
    hiddenElement.click();
}
