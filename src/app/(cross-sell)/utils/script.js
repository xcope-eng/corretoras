document.addEventListener("DOMContentLoaded", () => {
    const totalClientsEl = document.getElementById("total-clients");
    const suggestionsGeneratedEl = document.getElementById("suggestions-generated");
    const conversionRateEl = document.getElementById("conversion-rate");
    const monthlyGrowthEl = document.getElementById("monthly-growth");
    const clientRecommendationsContainer = document.getElementById("client-recommendations-container");
    const updateSuggestionsBtn = document.getElementById("update-suggestions-btn");

    let allCustomers = [];

    // Fetch customer data
    fetch("./data/customers.json") // Path relative to index.html
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            allCustomers = data;
            updateDashboardSummary(allCustomers);
            displayClientRecommendations(allCustomers);
        })
        .catch(error => {
            console.error("Error fetching customer data:", error);
            clientRecommendationsContainer.innerHTML = "<p>Erro ao carregar dados dos clientes.</p>";
            // Also update summary cards to show error or zeros
            totalClientsEl.textContent = "Erro";
            suggestionsGeneratedEl.textContent = "Erro";
            conversionRateEl.textContent = "Erro";
            monthlyGrowthEl.textContent = "Erro";
        });

    // Update Dashboard Summary Cards
    function updateDashboardSummary(customers) {
        const totalClients = customers.length;
        let totalSuggestions = 0;
        customers.forEach(c => {
            if (c.sugestoes_ia) {
                totalSuggestions += c.sugestoes_ia.length;
            }
        });

        // Placeholder values for conversion and growth as per screenshot
        const conversionRate = 30; // Example
        const monthlyGrowth = 12; // Example

        totalClientsEl.textContent = totalClients;
        suggestionsGeneratedEl.textContent = totalSuggestions;
        conversionRateEl.textContent = `${conversionRate}%`;
        monthlyGrowthEl.textContent = `+${monthlyGrowth}%`;
    }

    // Display Client Recommendation Cards
    function displayClientRecommendations(customers) {
        clientRecommendationsContainer.innerHTML = ""; // Clear existing cards

        const customersWithRecs = customers.filter(c => c.sugestoes_ia && c.sugestoes_ia.length > 0);

        if (customersWithRecs.length === 0) {
            clientRecommendationsContainer.innerHTML = "<p>Nenhum cliente com recomendações para exibir.</p>";
            return;
        }

        customersWithRecs.forEach((customer) => {
            const card = document.createElement("div");
            card.classList.add("client-rec-card");
            card.dataset.clientId = customer.id;

            // Use Picsum Photos for placeholder images based on ID for consistency
            const avatarImgUrl = `https://picsum.photos/seed/${customer.id}/50/50`; // 50x50 for dashboard card
            const avatarPlaceholder = `<div class="avatar-placeholder"><img src="${avatarImgUrl}" alt="${customer.nome_completo.charAt(0)}"></div>`;

            let productsHtml = customer.produtos_atuais.map(p => `<span>${p}</span>`).join("");

            let recommendationsHtml = "<div class=\"recommendations-list\"><h5>Recomendações</h5>";
            customer.sugestoes_ia.forEach((rec, recIndex) => {
                recommendationsHtml += `
                    <div class="recommendation-item" data-rec-id="${customer.id}-${recIndex}">
                        <div class="recommendation-header">
                            <strong>${rec.produto_sugerido}</strong>
                            <span class="recommendation-score">${rec.probabilidade_conversao}%</span>
                        </div>
                        <p>${rec.justificativa}</p>
                        <div class="recommendation-buttons">
                            <button class="accept-btn" data-client-id="${customer.id}" data-rec-index="${recIndex}"><i class="fas fa-check"></i> Aceitar</button>
                            <button class="reject-btn" data-client-id="${customer.id}" data-rec-index="${recIndex}"><i class="fas fa-times"></i> Rejeitar</button>
                        </div>
                    </div>
                `;
            });
            recommendationsHtml += "</div>";

            card.innerHTML = `
                <div class="client-info">
                    ${avatarPlaceholder}
                    <div class="client-details">
                        <h4>${customer.nome_completo}</h4>
                        <p>${customer.idade} anos, ${customer.localizacao}</p> <!-- Assuming location is city/area -->
                        <p class="current-products">${productsHtml || 'Nenhum'}</p>
                    </div>
                    <div class="client-actions">
                        <button class="view-btn" title="Ver Detalhes do Cliente" data-client-id="${customer.id}"><i class="fas fa-eye"></i></button>
                    </div>
                </div>
                ${recommendationsHtml}
            `;
            clientRecommendationsContainer.appendChild(card);
        });

        // Add event listeners after cards are created
        addEventListeners();
    }

    // Add event listeners for buttons
    function addEventListeners() {
        document.querySelectorAll(".accept-btn").forEach(button => {
            button.addEventListener("click", handleRecommendationAction);
        });
        document.querySelectorAll(".reject-btn").forEach(button => {
            button.addEventListener("click", handleRecommendationAction);
        });
        document.querySelectorAll(".view-btn").forEach(button => {
            button.addEventListener("click", handleViewClient);
        });

        if (updateSuggestionsBtn) {
             updateSuggestionsBtn.addEventListener("click", handleUpdateSuggestions);
        }
    }

    // Handle Accept/Reject button clicks
    function handleRecommendationAction(event) {
        const button = event.currentTarget;
        const clientId = button.dataset.clientId;
        const recIndex = parseInt(button.dataset.recIndex);
        const isAccept = button.classList.contains("accept-btn");
        const recommendationItem = button.closest(".recommendation-item");

        console.log(`Action: ${isAccept ? 'Accept' : 'Reject'} for Client ID: ${clientId}, Rec Index: ${recIndex}`);

        // Visually update the card
        if (recommendationItem) {
            recommendationItem.classList.add(isAccept ? "accepted" : "rejected");
            // Optionally remove the other class if switching is allowed (not typical)
            // recommendationItem.classList.remove(isAccept ? "rejected" : "accepted");
        }

        // In a real application, you would send this action to a backend
        // to record the agent's decision and potentially trigger communication.
        alert(`Sugestão ${isAccept ? 'aceite' : 'rejeitada'} (simulação).`);
    }

    // Handle View Client button click (placeholder)
    function handleViewClient(event) {
        const clientId = event.currentTarget.dataset.clientId;
        console.log(`View Client clicked for ID: ${clientId}`);
        alert(`Visualizar detalhes do cliente ${clientId} (funcionalidade não implementada neste protótipo).`);
        // In a full app, this might open a modal or navigate to a client detail page.
    }

     // Handle Update Suggestions button click (placeholder)
    function handleUpdateSuggestions() {
        console.log("Update Suggestions clicked");
        alert("Atualizar sugestões (funcionalidade não implementada neste protótipo).");
        // In a real app, this might re-run the AI logic or fetch fresh suggestions.
    }

});

