document.addEventListener("DOMContentLoaded", () => {
    // Chart instances
    let acceptanceRateChartInstance = null;
    let acceptanceByTypeChartInstance = null;
    let agentPerformanceChartInstance = null;
    let suggestionFrequencyChartInstance = null;

    // DOM Elements for metrics
    const overallConversionRateEl = document.getElementById("overall-conversion-rate");
    const totalSuggestionsEl = document.getElementById("total-suggestions");
    const acceptedSuggestionsEl = document.getElementById("accepted-suggestions");
    const rejectedSuggestionsEl = document.getElementById("rejected-suggestions");

    // Simulated agents for performance tracking
    const agents = ["João Silva", "Maria Santos", "Carlos Pereira", "Ana Costa"];

    // Fetch customer data
    fetch("./data/customers.json") // Path relative to performance.html
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            processPerformanceData(data);
        })
        .catch(error => {
            console.error("Error fetching or processing performance data:", error);
            // Display error messages in metric cards and chart areas
            overallConversionRateEl.textContent = "Erro";
            totalSuggestionsEl.textContent = "Erro";
            acceptedSuggestionsEl.textContent = "Erro";
            rejectedSuggestionsEl.textContent = "Erro";
            document.getElementById("acceptanceRateChart").parentElement.innerHTML = "<p>Erro ao carregar dados para o gráfico.</p>";
            document.getElementById("acceptanceByTypeChart").parentElement.innerHTML = "<p>Erro ao carregar dados para o gráfico.</p>";
            document.getElementById("agentPerformanceChart").parentElement.innerHTML = "<p>Erro ao carregar dados para o gráfico.</p>";
            document.getElementById("suggestionFrequencyChart").parentElement.innerHTML = "<p>Erro ao carregar dados para o gráfico.</p>";
        });

    // Process data and create charts
    function processPerformanceData(customers) {
        let totalSuggestions = 0;
        let acceptedCount = 0;
        let rejectedCount = 0;
        const suggestionsByType = {}; // { "Vida": { suggested: 0, accepted: 0 }, ... }
        const suggestionsByAgent = {}; // { "João Silva": { suggested: 0, accepted: 0 }, ... }
        const suggestionFrequency = {}; // { "Vida": 0, "Saúde": 0, ... }

        // Initialize agent stats
        agents.forEach(agent => {
            suggestionsByAgent[agent] = { suggested: 0, accepted: 0 };
        });

        customers.forEach((customer, index) => {
            // Simulate agent assignment (cyclical)
            const assignedAgent = agents[index % agents.length];

            if (customer.sugestoes_ia && customer.sugestoes_ia.length > 0) {
                customer.sugestoes_ia.forEach(suggestion => {
                    totalSuggestions++;
                    suggestionsByAgent[assignedAgent].suggested++;

                    const product = suggestion.produto_sugerido;
                    suggestionFrequency[product] = (suggestionFrequency[product] || 0) + 1;

                    if (!suggestionsByType[product]) {
                        suggestionsByType[product] = { suggested: 0, accepted: 0 };
                    }
                    suggestionsByType[product].suggested++;

                    // Simulate acceptance based on probability
                    const probability = parseFloat(suggestion.probabilidade_conversao) / 100;
                    const accepted = Math.random() < probability; // Simulate acceptance

                    if (accepted) {
                        acceptedCount++;
                        suggestionsByType[product].accepted++;
                        suggestionsByAgent[assignedAgent].accepted++;
                    } else {
                        rejectedCount++;
                    }
                });
            }
        });

        // Update Metric Cards
        const overallConversion = totalSuggestions > 0 ? ((acceptedCount / totalSuggestions) * 100).toFixed(1) : 0;
        overallConversionRateEl.textContent = `${overallConversion}%`;
        totalSuggestionsEl.textContent = totalSuggestions;
        acceptedSuggestionsEl.textContent = acceptedCount;
        rejectedSuggestionsEl.textContent = rejectedCount;

        // Create Charts
        createAcceptanceRateChart(acceptedCount, rejectedCount);
        createAcceptanceByTypeChart(suggestionsByType);
        createAgentPerformanceChart(suggestionsByAgent);
        createSuggestionFrequencyChart(suggestionFrequency);
    }

    // --- Chart Creation Functions ---

    function createAcceptanceRateChart(accepted, rejected) {
        const ctx = document.getElementById("acceptanceRateChart").getContext("2d");
        if (acceptanceRateChartInstance) acceptanceRateChartInstance.destroy(); // Destroy previous instance if exists
        acceptanceRateChartInstance = new Chart(ctx, {
            type: "doughnut",
            data: {
                labels: ["Aceites", "Rejeitadas"],
                datasets: [{
                    label: "Aceitação Geral",
                    data: [accepted, rejected],
                    backgroundColor: [
                        "rgba(75, 192, 192, 0.6)", // Green
                        "rgba(255, 99, 132, 0.6)"  // Red
                    ],
                    borderColor: [
                        "rgba(75, 192, 192, 1)",
                        "rgba(255, 99, 132, 1)"
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: "top",
                    }
                }
            }
        });
    }

    function createAcceptanceByTypeChart(suggestionsByType) {
        const ctx = document.getElementById("acceptanceByTypeChart").getContext("2d");
        const labels = Object.keys(suggestionsByType);
        const acceptanceRates = labels.map(label => {
            const stats = suggestionsByType[label];
            return stats.suggested > 0 ? (stats.accepted / stats.suggested) * 100 : 0;
        });

        if (acceptanceByTypeChartInstance) acceptanceByTypeChartInstance.destroy();
        acceptanceByTypeChartInstance = new Chart(ctx, {
            type: "bar",
            data: {
                labels: labels,
                datasets: [{
                    label: "Taxa de Aceitação (%)",
                    data: acceptanceRates,
                    backgroundColor: "rgba(54, 162, 235, 0.6)", // Blue
                    borderColor: "rgba(54, 162, 235, 1)",
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            callback: function(value) {
                                return value + "%";
                            }
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });
    }

    function createAgentPerformanceChart(suggestionsByAgent) {
        const ctx = document.getElementById("agentPerformanceChart").getContext("2d");
        const labels = Object.keys(suggestionsByAgent);
        const acceptanceRates = labels.map(label => {
            const stats = suggestionsByAgent[label];
            return stats.suggested > 0 ? (stats.accepted / stats.suggested) * 100 : 0;
        });

        if (agentPerformanceChartInstance) agentPerformanceChartInstance.destroy();
        agentPerformanceChartInstance = new Chart(ctx, {
            type: "bar",
            data: {
                labels: labels,
                datasets: [{
                    label: "Taxa de Aceitação (%)",
                    data: acceptanceRates,
                    backgroundColor: "rgba(255, 159, 64, 0.6)", // Orange
                    borderColor: "rgba(255, 159, 64, 1)",
                    borderWidth: 1
                }]
            },
            options: {
                indexAxis: 'y', // Horizontal bars
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            callback: function(value) {
                                return value + "%";
                            }
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });
    }

    function createSuggestionFrequencyChart(suggestionFrequency) {
        const ctx = document.getElementById("suggestionFrequencyChart").getContext("2d");
        const labels = Object.keys(suggestionFrequency);
        const frequencies = Object.values(suggestionFrequency);

        if (suggestionFrequencyChartInstance) suggestionFrequencyChartInstance.destroy();
        suggestionFrequencyChartInstance = new Chart(ctx, {
            type: "bar",
            data: {
                labels: labels,
                datasets: [{
                    label: "Nº de Sugestões",
                    data: frequencies,
                    backgroundColor: "rgba(153, 102, 255, 0.6)", // Purple
                    borderColor: "rgba(153, 102, 255, 1)",
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });
    }
});

