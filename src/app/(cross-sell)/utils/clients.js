document.addEventListener("DOMContentLoaded", () => {
    const clientListContainer = document.getElementById("client-list");
    const clientDetailContent = document.getElementById("client-detail-content");
    const clientSearchInput = document.getElementById("client-search");

    let allCustomers = [];

    // Fetch customer data
    fetch("./data/customers.json") // Path relative to clients.html
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            allCustomers = data;
            displayClientList(allCustomers);
        })
        .catch(error => {
            console.error("Error fetching customer data:", error);
            clientListContainer.innerHTML = "<p>Erro ao carregar lista de clientes.</p>";
            clientDetailContent.innerHTML = "<p>Erro ao carregar dados.</p>";
        });

    // Display Client List
    function displayClientList(customers) {
        clientListContainer.innerHTML = ""; // Clear existing list
        if (customers.length === 0) {
            clientListContainer.innerHTML = "<p>Nenhum cliente encontrado.</p>";
            return;
        }

        customers.forEach(customer => {
            const listItem = document.createElement("div");
            listItem.classList.add("client-list-item");
            listItem.dataset.clientId = customer.id;

            // Consistent avatar placeholder (Picsum Photos)
            const avatarImgUrl = `https://picsum.photos/seed/${customer.id}/40/40`; // 40x40 for list item
            const avatarPlaceholder = `<div class="avatar-placeholder"><img src="${avatarImgUrl}" alt="${customer.nome_completo.charAt(0)}"></div>`;

            listItem.innerHTML = `
                ${avatarPlaceholder}
                <div class="client-list-info">
                    <p><strong>${customer.nome_completo}</strong></p>
                    <p>${customer.idade} anos, ${customer.localizacao}</p>
                </div>
            `;
            listItem.addEventListener("click", () => {
                displayClientDetails(customer.id);
                // Highlight selected item
                document.querySelectorAll(".client-list-item.selected").forEach(el => el.classList.remove("selected"));
                listItem.classList.add("selected");
            });
            clientListContainer.appendChild(listItem);
        });
    }

    // Display Client Details
    function displayClientDetails(clientId) {
        const customer = allCustomers.find(c => c.id === clientId);
        if (!customer) {
            clientDetailContent.innerHTML = "<p>Cliente não encontrado.</p>";
            return;
        }

        // Consistent avatar placeholder (Picsum Photos - larger for detail view)
        const avatarImgUrl = `https://picsum.photos/seed/${customer.id}/80/80`; // 80x80 for detail view
        const avatarPlaceholder = `<div class="avatar-placeholder large"><img src="${avatarImgUrl}" alt="${customer.nome_completo.charAt(0)}"></div>`;
        let productsHtml = customer.produtos_atuais.map(p => `<span>${p}</span>`).join("");

        // Basic vehicle info if available (assuming 'Automóvel' implies a car)
        let vehicleInfo = "Não disponível";
        if (customer.produtos_atuais.includes("Automóvel")) {
            // In a real scenario, fetch specific car details if stored
            vehicleInfo = "Seguro Automóvel ativo (detalhes não disponíveis)";
        }

        clientDetailContent.innerHTML = `
            <div class="client-detail-header">
                ${avatarPlaceholder}
                <div>
                    <h4>${customer.nome_completo}</h4>
                    <p>${customer.idade} anos, ${customer.genero}</p>
                    <p>${customer.ocupacao}</p>
                    <p>Localização: ${customer.localizacao}</p>
                </div>
            </div>
            <div class="client-detail-body">
                <div class="detail-section">
                    <h5>Informações Adicionais</h5>
                    <p><strong>Tipo de Habitação:</strong> ${customer.tipo_habitacao}</p>
                    <p><strong>Número de Filhos:</strong> ${customer.numero_filhos}</p>
                    <p><strong>Veículo (Info Seguro Auto):</strong> ${vehicleInfo}</p>
                </div>
                <div class="detail-section">
                    <h5>Produtos Atuais</h5>
                    <p class="current-products">${productsHtml || 'Nenhum'}</p>
                </div>
                 <div class="detail-section">
                    <h5>Histórico (Simplificado)</h5>
                    ${customer.historico_compras && customer.historico_compras.length > 0 ? 
                        customer.historico_compras.map(item => `<p>- ${item.produto} (Adesão: ${item.data_adesao}, Renovações: ${item.renovacoes})</p>`).join("") 
                        : '<p>Sem histórico disponível.</p>'
                    }
                </div>
                <div class="detail-section">
                    <h5>Sugestões IA Pendentes</h5>
                     ${customer.sugestoes_ia && customer.sugestoes_ia.length > 0 ? 
                        customer.sugestoes_ia.map(sug => `<p>- ${sug.produto_sugerido} (${sug.probabilidade_conversao}%) - ${sug.justificativa}</p>`).join("") 
                        : '<p>Nenhuma sugestão pendente.</p>'
                    }
                </div>
            </div>
        `;
    }

    // Client Search/Filter
    clientSearchInput.addEventListener("input", (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredCustomers = allCustomers.filter(customer => 
            customer.nome_completo.toLowerCase().includes(searchTerm) ||
            customer.localizacao.toLowerCase().includes(searchTerm) ||
            customer.id.toString().includes(searchTerm)
        );
        displayClientList(filteredCustomers);
        // Clear details pane when searching
        clientDetailContent.innerHTML = "<p>Selecione um cliente da lista para ver os detalhes.</p>"; 
    });

});

