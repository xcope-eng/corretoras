/* Main JavaScript file for the Insurance Broker Platform */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the application
    initApp();
    
    // Set up event listeners
    setupEventListeners();
    
    // Load dashboard data
    loadDashboardData();
});

// Initialize the application
function initApp() {
    // Show dashboard view by default
    showView('dashboard');
    
    // Set active navigation link
    setActiveNavLink('dashboard-link');
    
    // Initialize recent simulations in sidebar
    initRecentSimulations();
}

// Set up event listeners
function setupEventListeners() {
    // Navigation links
    document.getElementById('dashboard-link').addEventListener('click', function(e) {
        e.preventDefault();
        showView('dashboard');
        setActiveNavLink('dashboard-link');
    });
    
    document.getElementById('clients-link').addEventListener('click', function(e) {
        e.preventDefault();
        showView('clients');
        setActiveNavLink('clients-link');
        loadClientsData();
    });
    
    document.getElementById('insurance-link').addEventListener('click', function(e) {
        e.preventDefault();
        showView('insurance');
        setActiveNavLink('insurance-link');
        loadInsurancePoliciesData();
    });
    
    document.getElementById('history-link').addEventListener('click', function(e) {
        e.preventDefault();
        showView('history');
        setActiveNavLink('history-link');
        loadSimulationsHistoryData();
    });
    
    document.getElementById('settings-link').addEventListener('click', function(e) {
        e.preventDefault();
        showView('settings');
        setActiveNavLink('settings-link');
    });
    
    // New simulation button
    document.getElementById('new-simulation-btn').addEventListener('click', function() {
        showClientForm();
    });
    
    // View offers button - CRITICAL FUNCTIONALITY
    document.getElementById('view-offers-btn').addEventListener('click', function(e) {
        e.preventDefault();
        console.log("View Offers button clicked");
        handleClientFormSubmission();
    });
    
    // Travel checkbox
    document.getElementById('travel-planned').addEventListener('change', function() {
        toggleTravelFields(this.checked);
    });
    
    // Filter offers dropdown
    document.getElementById('filter-offers').addEventListener('change', function() {
        filterOffers(this.value);
    });
    
    // Recent simulations in sidebar
    const recentSimLinks = document.querySelectorAll('#recent-simulations .nav-link');
    recentSimLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const clientName = this.getAttribute('data-client');
            const insuranceType = this.getAttribute('data-type');
            loadSavedSimulation(clientName, insuranceType);
        });
    });
    
    // Insurance tabs - ensure Bootstrap tabs work
    const insuranceTabs = document.querySelectorAll('#insurance-tabs button');
    insuranceTabs.forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('data-bs-target'));
            
            // Remove active class from all tabs and panes
            document.querySelectorAll('#insurance-tabs button').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.tab-pane').forEach(p => {
                p.classList.remove('show', 'active');
            });
            
            // Add active class to clicked tab and its pane
            this.classList.add('active');
            target.classList.add('show', 'active');
        });
    });
}

// Show the specified view and hide others
function showView(viewName) {
    console.log("Showing view:", viewName);
    
    // Hide all views
    document.getElementById('dashboard-view').style.display = 'none';
    document.getElementById('clients-view').style.display = 'none';
    document.getElementById('insurance-view').style.display = 'none';
    document.getElementById('history-view').style.display = 'none';
    document.getElementById('settings-view').style.display = 'none';
    document.getElementById('client-form-section').style.display = 'none';
    document.getElementById('insurance-offers-section').style.display = 'none';
    
    // Show the selected view
    if (viewName === 'dashboard') {
        document.getElementById('dashboard-view').style.display = 'block';
    } else if (viewName === 'clients') {
        document.getElementById('clients-view').style.display = 'block';
    } else if (viewName === 'insurance') {
        document.getElementById('insurance-view').style.display = 'block';
    } else if (viewName === 'history') {
        document.getElementById('history-view').style.display = 'block';
    } else if (viewName === 'settings') {
        document.getElementById('settings-view').style.display = 'block';
    } else if (viewName === 'simulation') {
        document.getElementById('client-form-section').style.display = 'block';
    } else if (viewName === 'offers') {
        document.getElementById('client-form-section').style.display = 'block';
        document.getElementById('insurance-offers-section').style.display = 'block';
        console.log("Insurance offers section should now be visible");
    }
}

// Set the active navigation link
function setActiveNavLink(linkId) {
    // Remove active class from all nav links
    const navLinks = document.querySelectorAll('#sidebar .nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
    
    // Add active class to the selected link
    document.getElementById(linkId).classList.add('active');
}

// Show the client form for a new simulation
function showClientForm() {
    showView('simulation');
    
    // Reset form
    document.getElementById('client-data-form').reset();
    
    // Hide travel fields
    toggleTravelFields(false);
    
    // Hide offers section if it was visible
    document.getElementById('insurance-offers-section').style.display = 'none';
}

// Toggle travel fields based on checkbox
function toggleTravelFields(show) {
    const travelFields = document.querySelectorAll('.travel-info');
    travelFields.forEach(field => {
        field.style.display = show ? 'block' : 'none';
    });
}

// Handle client form submission - CRITICAL FUNCTIONALITY
function handleClientFormSubmission() {
    console.log("Form submission handler triggered");
    
    try {
        // Get form data with fallbacks to ensure values exist
        const clientData = {
            name: document.getElementById('name').value || "Cliente Teste",
            age: parseInt(document.getElementById('age').value || "35"),
            gender: document.getElementById('gender').value || "male",
            housingType: document.getElementById('housing-type').value || "owned",
            maritalStatus: document.getElementById('marital-status').value || "married",
            children: parseInt(document.getElementById('children').value || "0"),
            occupation: document.getElementById('occupation').value || "Engenheiro",
            income: parseInt(document.getElementById('income').value || "45000"),
            travelPlanned: document.getElementById('travel-planned').checked,
            destination: document.getElementById('destination')?.value || "",
            duration: parseInt(document.getElementById('duration')?.value || "0")
        };
        
        console.log("Client data:", clientData);
        
        // Update client name display
        const clientNameDisplay = document.querySelector('#client-name-display span');
        if (clientNameDisplay) {
            clientNameDisplay.textContent = clientData.name;
        }
        
        // Get client risk profile
        const riskProfile = window.apiSimulation.getClientRiskProfile(clientData);
        
        // Generate insurance offers
        const offers = window.apiSimulation.generateSimulatedOffers(clientData, riskProfile);
        
        // Display offers
        displayInsuranceOffers(offers);
        
        // Show offers section
        showView('offers');
        
        // Manually activate the life insurance tab
        const lifeTab = document.getElementById('life-tab');
        if (lifeTab) {
            lifeTab.click();
        }
        
        console.log("Offers section should be visible now");
        
    } catch (error) {
        console.error("Error in form submission:", error);
        alert("Ocorreu um erro ao processar o formulário. Por favor tente novamente.");
    }
    
    return false; // Prevent form submission
}

// Display insurance offers - CRITICAL FUNCTIONALITY
function displayInsuranceOffers(offers) {
    console.log("Displaying insurance offers");
    
    try {
        // Clear existing offers
        clearOfferContainers();
        
        // Get offer template
        const template = document.getElementById('insurance-offer-template');
        if (!template) {
            console.error("Offer template not found");
            return;
        }
        
        // Process life insurance offers
        if (offers.life && offers.life.length > 0) {
            const lifeContainer = document.getElementById('life-offers-container');
            offers.life.forEach(offer => {
                const offerElement = createOfferElement(template, offer);
                if (lifeContainer) {
                    lifeContainer.appendChild(offerElement);
                }
            });
        }
        
        // Process health insurance offers
        if (offers.health && offers.health.length > 0) {
            const healthContainer = document.getElementById('health-offers-container');
            offers.health.forEach(offer => {
                const offerElement = createOfferElement(template, offer);
                if (healthContainer) {
                    healthContainer.appendChild(offerElement);
                }
            });
        }
        
        // Process travel insurance offers
        if (offers.travel && offers.travel.length > 0) {
            const travelContainer = document.getElementById('travel-offers-container');
            offers.travel.forEach(offer => {
                const offerElement = createOfferElement(template, offer);
                if (travelContainer) {
                    travelContainer.appendChild(offerElement);
                }
            });
        }
        
        console.log("Offers displayed successfully");
    } catch (error) {
        console.error("Error displaying offers:", error);
        alert("Ocorreu um erro ao exibir as ofertas. Por favor tente novamente.");
    }
}

// Clear offer containers
function clearOfferContainers() {
    const containers = [
        document.getElementById('life-offers-container'),
        document.getElementById('health-offers-container'),
        document.getElementById('travel-offers-container')
    ];
    
    containers.forEach(container => {
        if (container) {
            container.innerHTML = '';
        }
    });
}

// Create an offer element from template
function createOfferElement(template, offer) {
    try {
        // Clone the template
        const offerElement = template.content.cloneNode(true);
        
        // Set company logo
        const logoElement = offerElement.querySelector('.company-logo');
        if (logoElement) {
            logoElement.src = offer.logoPath;
            logoElement.alt = `${offer.company} Logo`;
        }
        
        // Set company name
        const companyNameElement = offerElement.querySelector('.company-name');
        if (companyNameElement) {
            companyNameElement.textContent = offer.company;
        }
        
        // Set product name
        const productNameElement = offerElement.querySelector('.product-name');
        if (productNameElement) {
            productNameElement.textContent = offer.product;
        }
        
        // Set premium
        const premiumValueElement = offerElement.querySelector('.premium-value');
        if (premiumValueElement) {
            premiumValueElement.textContent = `€${offer.premium.toFixed(2)}`;
        }
        
        // Set coverages
        const coveragesList = offerElement.querySelector('.coverages-list');
        if (coveragesList && offer.coverages) {
            offer.coverages.forEach(coverage => {
                const li = document.createElement('li');
                li.textContent = coverage;
                coveragesList.appendChild(li);
            });
        }
        
        // Set contact link
        const contactLinkElement = offerElement.querySelector('.contact-link');
        if (contactLinkElement) {
            contactLinkElement.href = offer.contactLink || `#contact-${offer.companyId}`;
        }
        
        // Set description if available
        const descriptionElement = offerElement.querySelector('.product-description');
        if (descriptionElement && offer.description) {
            descriptionElement.textContent = offer.description;
        }
        
        // Set recommended badge visibility
        const recommendedBadge = offerElement.querySelector('.badge');
        if (recommendedBadge) {
            // Show badge only for the first offer in each category
            recommendedBadge.style.display = 'inline-block';
        }
        
        return offerElement;
    } catch (error) {
        console.error("Error creating offer element:", error);
        // Return a simple div with error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'col-md-4 mb-4';
        errorDiv.innerHTML = `
            <div class="card offer-card h-100">
                <div class="card-body">
                    <h5>${offer.company}</h5>
                    <p>${offer.product}</p>
                    <div class="premium-container">
                        <div class="premium-value">€${offer.premium.toFixed(2)}</div>
                        <div class="premium-period">por mês</div>
                    </div>
                </div>
            </div>
        `;
        return errorDiv;
    }
}

// Filter offers based on selected filter
function filterOffers(filterValue) {
    // Get all offer containers
    const offerContainers = [
        document.getElementById('life-offers-container'),
        document.getElementById('health-offers-container'),
        document.getElementById('travel-offers-container')
    ];
    
    // Apply filter to each container
    offerContainers.forEach(container => {
        if (!container) return;
        
        const offers = Array.from(container.children);
        
        if (filterValue === 'premium-asc') {
            // Sort by premium (ascending)
            offers.sort((a, b) => {
                const premiumA = parseFloat(a.querySelector('.premium-value')?.textContent.replace('€', '') || '0');
                const premiumB = parseFloat(b.querySelector('.premium-value')?.textContent.replace('€', '') || '0');
                return premiumA - premiumB;
            });
        } else if (filterValue === 'premium-desc') {
            // Sort by premium (descending)
            offers.sort((a, b) => {
                const premiumA = parseFloat(a.querySelector('.premium-value')?.textContent.replace('€', '') || '0');
                const premiumB = parseFloat(b.querySelector('.premium-value')?.textContent.replace('€', '') || '0');
                return premiumB - premiumA;
            });
        } else if (filterValue === 'coverage') {
            // Sort by number of coverages
            offers.sort((a, b) => {
                const coveragesA = a.querySelectorAll('.coverages-list li')?.length || 0;
                const coveragesB = b.querySelectorAll('.coverages-list li')?.length || 0;
                return coveragesB - coveragesA;
            });
        }
        
        // Reorder the offers in the container
        offers.forEach(offer => {
            container.appendChild(offer);
        });
    });
}

// Load a saved simulation
function loadSavedSimulation(clientName, insuranceType) {
    console.log("Loading saved simulation:", clientName, insuranceType);
    
    try {
        // Set client name display
        const clientNameDisplay = document.querySelector('#client-name-display span');
        if (clientNameDisplay) {
            clientNameDisplay.textContent = clientName;
        }
        
        // Show offers section
        showView('offers');
        
        // Activate the appropriate tab
        let tabToClick = document.getElementById('life-tab');
        if (insuranceType === 'health') {
            tabToClick = document.getElementById('health-tab');
        } else if (insuranceType === 'travel') {
            tabToClick = document.getElementById('travel-tab');
        }
        
        if (tabToClick) {
            tabToClick.click();
        }
        
        // Generate simulated offers for the client
        const clientData = { name: clientName, age: 35 };
        const riskProfile = window.apiSimulation.getClientRiskProfile(clientData);
        const offers = window.apiSimulation.generateSimulatedOffers(clientData, riskProfile);
        
        // Display offers
        displayInsuranceOffers(offers);
    } catch (error) {
        console.error("Error loading saved simulation:", error);
        alert("Ocorreu um erro ao carregar a simulação. Por favor tente novamente.");
    }
}

// Initialize recent simulations in sidebar
function initRecentSimulations() {
    try {
        // Get sample simulations
        const simulations = [
            { id: 1, client: "João Silva", date: "05/04/2025", type: "life", bestOffer: "Fidelidade Vida Mais", premium: 45.75, status: "completed" },
            { id: 2, client: "Maria Santos", date: "03/04/2025", type: "health", bestOffer: "Ageas Médis Premium", premium: 78.50, status: "completed" },
            { id: 3, client: "António Ferreira", date: "01/04/2025", type: "travel", bestOffer: "Allianz Global Travel", premium: 32.25, status: "completed" }
        ];
        
        // Get recent simulations container
        const container = document.getElementById('recent-simulations');
        if (!container) {
            console.error("Recent simulations container not found");
            return;
        }
        
        // Clear existing items
        container.innerHTML = '';
        
        // Add simulation items
        simulations.forEach(simulation => {
            const li = document.createElement('li');
            li.className = 'nav-item';
            
            const a = document.createElement('a');
            a.className = 'nav-link';
            a.href = '#';
            a.setAttribute('data-client', simulation.client);
            a.setAttribute('data-type', simulation.type);
            
            const i = document.createElement('i');
            i.className = 'bi bi-file-earmark-text';
            
            a.appendChild(i);
            a.appendChild(document.createTextNode(` ${simulation.client} - ${getInsuranceTypeText(simulation.type)}`));
            
            a.addEventListener('click', function(e) {
                e.preventDefault();
                loadSavedSimulation(simulation.client, simulation.type);
            });
            
            li.appendChild(a);
            container.appendChild(li);
        });
    } catch (error) {
        console.error("Error initializing recent simulations:", error);
    }
}

// Get insurance type text
function getInsuranceTypeText(type) {
    if (type === 'life') {
        return 'Vida';
    } else if (type === 'health') {
        return 'Saúde';
    } else if (type === 'travel') {
        return 'Viagem';
    }
    return type;
}

// Load dashboard data
function loadDashboardData() {
    try {
        // Dashboard statistics
        const stats = {
            totalClients: 127,
            totalClientsGrowth: 12,
            activePolicies: 215,
            activePoliciesGrowth: 5,
            pendingRenewals: 14,
            pendingRenewalsGrowth: -3,
            monthlyRevenue: 12450,
            monthlyRevenueGrowth: 8.5,
            popularInsurers: [
                { name: "Fidelidade", policies: 68, percentage: 32 },
                { name: "Ageas", policies: 52, percentage: 24 },
                { name: "Generali", policies: 43, percentage: 20 },
                { name: "Allianz", policies: 31, percentage: 14 },
                { name: "Tranquilidade", policies: 21, percentage: 10 }
            ],
            insuranceTypeDistribution: [
                { type: "Vida", quantity: 87, percentage: 40 },
                { type: "Saúde", quantity: 76, percentage: 35 },
                { type: "Viagem", quantity: 52, percentage: 25 }
            ]
        };
        
        // Update statistics cards
        updateStatCard(1, stats.totalClients, stats.totalClientsGrowth, stats.totalClientsGrowth >= 0);
        updateStatCard(2, stats.activePolicies, stats.activePoliciesGrowth, stats.activePoliciesGrowth >= 0);
        updateStatCard(3, stats.pendingRenewals, Math.abs(stats.pendingRenewalsGrowth), stats.pendingRenewalsGrowth >= 0);
        updateStatCard(4, `${stats.monthlyRevenue.toLocaleString()} €`, stats.monthlyRevenueGrowth, stats.monthlyRevenueGrowth >= 0);
        
        // Update popular insurers table
        updatePopularInsurersTable(stats.popularInsurers);
        
        // Update insurance type distribution table
        updateInsuranceTypeTable(stats.insuranceTypeDistribution);
        
        // Update recent simulations table
        updateRecentSimulationsTable();
    } catch (error) {
        console.error("Error loading dashboard data:", error);
    }
}

// Update statistics card
function updateStatCard(index, value, growth, isPositive) {
    const card = document.querySelector(`.stats-card:nth-child(${index})`);
    if (!card) return;
    
    const valueElement = card.querySelector('.stats-value');
    if (valueElement) {
        valueElement.textContent = value;
    }
    
    const trendElement = card.querySelector('.stats-trend');
    if (trendElement) {
        trendElement.innerHTML = `
            <i class="bi bi-arrow-${isPositive ? 'up' : 'down'}"></i> ${growth}% este mês
        `;
        trendElement.className = `stats-trend ${isPositive ? 'positive' : 'negative'}`;
    }
}

// Update popular insurers table
function updatePopularInsurersTable(insurers) {
    const table = document.querySelector('#dashboard-view #popular-insurers table tbody');
    if (!table) return;
    
    table.innerHTML = '';
    
    insurers.forEach(insurer => {
        const tr = document.createElement('tr');
        
        const tdName = document.createElement('td');
        const nameDiv = document.createElement('div');
        nameDiv.className = 'd-flex align-items-center';
        
        const colorDiv = document.createElement('div');
        colorDiv.style.width = '12px';
        colorDiv.style.height = '12px';
        colorDiv.style.borderRadius = '50%';
        colorDiv.style.marginRight = '8px';
        
        // Set color based on insurer name
        if (insurer.name === 'Fidelidade') {
            colorDiv.style.backgroundColor = '#ED1C24';
        } else if (insurer.name === 'Ageas') {
            colorDiv.style.backgroundColor = '#00A0DF';
        } else if (insurer.name === 'Generali') {
            colorDiv.style.backgroundColor = '#E30613';
        } else if (insurer.name === 'Allianz') {
            colorDiv.style.backgroundColor = '#003781';
        } else if (insurer.name === 'Tranquilidade') {
            colorDiv.style.backgroundColor = '#009A44';
        }
        
        nameDiv.appendChild(colorDiv);
        nameDiv.appendChild(document.createTextNode(insurer.name));
        tdName.appendChild(nameDiv);
        
        const tdPolicies = document.createElement('td');
        tdPolicies.textContent = insurer.policies;
        
        const tdPercentage = document.createElement('td');
        tdPercentage.textContent = `${insurer.percentage}%`;
        
        tr.appendChild(tdName);
        tr.appendChild(tdPolicies);
        tr.appendChild(tdPercentage);
        
        table.appendChild(tr);
    });
}

// Update insurance type distribution table
function updateInsuranceTypeTable(types) {
    const table = document.querySelector('#dashboard-view .card:nth-child(6) table tbody');
    if (!table) return;
    
    table.innerHTML = '';
    
    types.forEach(type => {
        const tr = document.createElement('tr');
        
        const tdType = document.createElement('td');
        const typeDiv = document.createElement('div');
        typeDiv.className = 'd-flex align-items-center';
        
        const colorDiv = document.createElement('div');
        colorDiv.style.width = '12px';
        colorDiv.style.height = '12px';
        colorDiv.style.borderRadius = '50%';
        colorDiv.style.marginRight = '8px';
        
        // Set color based on insurance type
        if (type.type === 'Vida') {
            colorDiv.style.backgroundColor = '#4f46e5';
        } else if (type.type === 'Saúde') {
            colorDiv.style.backgroundColor = '#10b981';
        } else if (type.type === 'Viagem') {
            colorDiv.style.backgroundColor = '#f59e0b';
        }
        
        typeDiv.appendChild(colorDiv);
        typeDiv.appendChild(document.createTextNode(type.type));
        tdType.appendChild(typeDiv);
        
        const tdQuantity = document.createElement('td');
        tdQuantity.textContent = type.quantity;
        
        const tdPercentage = document.createElement('td');
        tdPercentage.textContent = `${type.percentage}%`;
        
        tr.appendChild(tdType);
        tr.appendChild(tdQuantity);
        tr.appendChild(tdPercentage);
        
        table.appendChild(tr);
    });
}

// Update recent simulations table
function updateRecentSimulationsTable() {
    const simulations = [
        { id: 1, client: "João Silva", date: "05/04/2025", type: "life", bestOffer: "Fidelidade Vida Mais", premium: 45.75, status: "completed" },
        { id: 2, client: "Maria Santos", date: "03/04/2025", type: "health", bestOffer: "Ageas Médis Premium", premium: 78.50, status: "completed" },
        { id: 3, client: "António Ferreira", date: "01/04/2025", type: "travel", bestOffer: "Allianz Global Travel", premium: 32.25, status: "completed" }
    ];
    
    const table = document.querySelector('#dashboard-view #recent-simulations-table table tbody');
    if (!table) return;
    
    table.innerHTML = '';
    
    simulations.forEach(simulation => {
        const tr = document.createElement('tr');
        
        const tdClient = document.createElement('td');
        tdClient.textContent = simulation.client;
        
        const tdDate = document.createElement('td');
        tdDate.textContent = simulation.date;
        
        const tdType = document.createElement('td');
        tdType.textContent = getInsuranceTypeText(simulation.type);
        
        const tdBestOffer = document.createElement('td');
        tdBestOffer.textContent = simulation.bestOffer;
        
        const tdPremium = document.createElement('td');
        tdPremium.textContent = `${simulation.premium.toFixed(2)} €/mês`;
        
        const tdActions = document.createElement('td');
        const viewBtn = document.createElement('button');
        viewBtn.className = 'btn btn-sm btn-outline-primary';
        viewBtn.textContent = 'Ver';
        viewBtn.addEventListener('click', function() {
            loadSavedSimulation(simulation.client, simulation.type);
        });
        tdActions.appendChild(viewBtn);
        
        tr.appendChild(tdClient);
        tr.appendChild(tdDate);
        tr.appendChild(tdType);
        tr.appendChild(tdBestOffer);
        tr.appendChild(tdPremium);
        tr.appendChild(tdActions);
        
        table.appendChild(tr);
    });
}

// Load clients data
function loadClientsData() {
    try {
        // Sample clients
        const clients = [
            { name: "João Silva", email: "joao.silva@email.com", phone: "+351 912 345 678", age: 42, occupation: "Engenheiro", policies: 2, status: "active" },
            { name: "Maria Santos", email: "maria.santos@email.com", phone: "+351 923 456 789", age: 35, occupation: "Médica", policies: 3, status: "active" },
            { name: "António Ferreira", email: "antonio.ferreira@email.com", phone: "+351 934 567 890", age: 28, occupation: "Professor", policies: 1, status: "active" },
            { name: "Sofia Oliveira", email: "sofia.oliveira@email.com", phone: "+351 945 678 901", age: 39, occupation: "Advogada", policies: 2, status: "active" },
            { name: "Pedro Costa", email: "pedro.costa@email.com", phone: "+351 956 789 012", age: 45, occupation: "Empresário", policies: 4, status: "active" }
        ];
        
        // Get clients table
        const clientsTable = document.querySelector('#clients-view .table tbody');
        if (!clientsTable) return;
        
        // Clear existing rows
        clientsTable.innerHTML = '';
        
        // Add client rows
        clients.forEach(client => {
            const tr = document.createElement('tr');
            
            // Client info cell
            const tdInfo = document.createElement('td');
            const clientInfo = document.createElement('div');
            clientInfo.className = 'client-info';
            
            const avatar = document.createElement('div');
            avatar.className = 'client-avatar';
            avatar.textContent = client.name.charAt(0);
            
            const infoDiv = document.createElement('div');
            
            const name = document.createElement('p');
            name.className = 'client-name';
            name.textContent = client.name;
            
            const email = document.createElement('p');
            email.className = 'client-email';
            email.textContent = client.email;
            
            infoDiv.appendChild(name);
            infoDiv.appendChild(email);
            
            clientInfo.appendChild(avatar);
            clientInfo.appendChild(infoDiv);
            
            tdInfo.appendChild(clientInfo);
            
            // Contact cell
            const tdContact = document.createElement('td');
            tdContact.textContent = client.phone;
            
            // Age cell
            const tdAge = document.createElement('td');
            tdAge.textContent = client.age;
            
            // Occupation cell
            const tdOccupation = document.createElement('td');
            tdOccupation.textContent = client.occupation;
            
            // Policies cell
            const tdPolicies = document.createElement('td');
            tdPolicies.textContent = client.policies;
            
            // Status cell
            const tdStatus = document.createElement('td');
            const statusBadge = document.createElement('span');
            statusBadge.className = 'status-badge status-active';
            statusBadge.textContent = 'Ativo';
            tdStatus.appendChild(statusBadge);
            
            // Actions cell
            const tdActions = document.createElement('td');
            
            const viewBtn = document.createElement('button');
            viewBtn.className = 'btn btn-sm btn-outline-primary me-1';
            viewBtn.innerHTML = '<i class="bi bi-eye"></i>';
            
            const editBtn = document.createElement('button');
            editBtn.className = 'btn btn-sm btn-outline-secondary';
            editBtn.innerHTML = '<i class="bi bi-pencil"></i>';
            
            tdActions.appendChild(viewBtn);
            tdActions.appendChild(editBtn);
            
            // Add cells to row
            tr.appendChild(tdInfo);
            tr.appendChild(tdContact);
            tr.appendChild(tdAge);
            tr.appendChild(tdOccupation);
            tr.appendChild(tdPolicies);
            tr.appendChild(tdStatus);
            tr.appendChild(tdActions);
            
            // Add row to table
            clientsTable.appendChild(tr);
        });
    } catch (error) {
        console.error("Error loading clients data:", error);
    }
}

// Load insurance policies data
function loadInsurancePoliciesData() {
    try {
        // Sample policies
        const policies = [
            { client: "João Silva", type: "life", company: "Fidelidade", product: "Vida Mais", premium: 45.75, validUntil: "05/04/2026", status: "active" },
            { client: "João Silva", type: "health", company: "Ageas", product: "Médis Premium", premium: 78.50, validUntil: "03/04/2026", status: "active" },
            { client: "Maria Santos", type: "life", company: "Allianz", product: "Life Premium", premium: 52.30, validUntil: "15/05/2026", status: "active" },
            { client: "Maria Santos", type: "health", company: "Fidelidade", product: "Multicare Plus", premium: 85.20, validUntil: "10/06/2026", status: "active" },
            { client: "Maria Santos", type: "travel", company: "Tranquilidade", product: "Travel Safe", premium: 32.25, validUntil: "01/07/2026", status: "active" },
            { client: "António Ferreira", type: "travel", company: "Allianz", product: "Global Travel", premium: 30.00, validUntil: "20/05/2026", status: "active" },
            { client: "Sofia Oliveira", type: "life", company: "Generali", product: "Vida Total", premium: 48.60, validUntil: "12/08/2026", status: "active" },
            { client: "Sofia Oliveira", type: "health", company: "Generali", product: "Health Complete", premium: 72.40, validUntil: "12/08/2026", status: "active" },
            { client: "Pedro Costa", type: "life", company: "Fidelidade", product: "Vida Essencial", premium: 38.25, validUntil: "25/09/2026", status: "active" },
            { client: "Pedro Costa", type: "health", company: "Ageas", product: "Médis Básico", premium: 45.30, validUntil: "25/09/2026", status: "active" },
            { client: "Pedro Costa", type: "travel", company: "Fidelidade", product: "World Travel", premium: 28.50, validUntil: "25/09/2026", status: "active" },
            { client: "Pedro Costa", type: "travel", company: "Ageas", product: "Travel Plus", premium: 25.75, validUntil: "25/09/2026", status: "active" }
        ];
        
        // Get policies table
        const policiesTable = document.querySelector('#insurance-view .table tbody');
        if (!policiesTable) return;
        
        // Clear existing rows
        policiesTable.innerHTML = '';
        
        // Add policy rows
        policies.forEach(policy => {
            const tr = document.createElement('tr');
            
            // Client cell
            const tdClient = document.createElement('td');
            tdClient.textContent = policy.client;
            
            // Type cell
            const tdType = document.createElement('td');
            tdType.textContent = getInsuranceTypeText(policy.type);
            
            // Company cell
            const tdCompany = document.createElement('td');
            tdCompany.textContent = policy.company;
            
            // Product cell
            const tdProduct = document.createElement('td');
            tdProduct.textContent = policy.product;
            
            // Premium cell
            const tdPremium = document.createElement('td');
            tdPremium.textContent = `€${policy.premium.toFixed(2)}/mês`;
            
            // Validity cell
            const tdValidity = document.createElement('td');
            tdValidity.textContent = policy.validUntil;
            
            // Status cell
            const tdStatus = document.createElement('td');
            const statusBadge = document.createElement('span');
            statusBadge.className = 'status-badge status-active';
            statusBadge.textContent = 'Ativo';
            tdStatus.appendChild(statusBadge);
            
            // Actions cell
            const tdActions = document.createElement('td');
            
            const viewBtn = document.createElement('button');
            viewBtn.className = 'btn btn-sm btn-outline-primary me-1';
            viewBtn.innerHTML = '<i class="bi bi-eye"></i>';
            
            const editBtn = document.createElement('button');
            editBtn.className = 'btn btn-sm btn-outline-secondary';
            editBtn.innerHTML = '<i class="bi bi-pencil"></i>';
            
            tdActions.appendChild(viewBtn);
            tdActions.appendChild(editBtn);
            
            // Add cells to row
            tr.appendChild(tdClient);
            tr.appendChild(tdType);
            tr.appendChild(tdCompany);
            tr.appendChild(tdProduct);
            tr.appendChild(tdPremium);
            tr.appendChild(tdValidity);
            tr.appendChild(tdStatus);
            tr.appendChild(tdActions);
            
            // Add row to table
            policiesTable.appendChild(tr);
        });
    } catch (error) {
        console.error("Error loading insurance policies data:", error);
    }
}

// Load simulations history data
function loadSimulationsHistoryData() {
    try {
        // Sample simulations
        const simulations = [
            { id: 1, client: "João Silva", date: "05/04/2025", type: "life", bestOffer: "Fidelidade Vida Mais", premium: 45.75, status: "completed" },
            { id: 2, client: "Maria Santos", date: "03/04/2025", type: "health", bestOffer: "Ageas Médis Premium", premium: 78.50, status: "completed" },
            { id: 3, client: "António Ferreira", date: "01/04/2025", type: "travel", bestOffer: "Allianz Global Travel", premium: 32.25, status: "completed" },
            { id: 4, client: "Sofia Oliveira", date: "28/03/2025", type: "life", bestOffer: "Generali Vida Total", premium: 48.60, status: "completed" },
            { id: 5, client: "Pedro Costa", date: "25/03/2025", type: "health", bestOffer: "Fidelidade Multicare Plus", premium: 85.20, status: "completed" },
            { id: 6, client: "Ana Rodrigues", date: "20/03/2025", type: "travel", bestOffer: "Tranquilidade Travel Safe", premium: 32.25, status: "completed" },
            { id: 7, client: "Carlos Martins", date: "18/03/2025", type: "life", bestOffer: "Allianz Life Premium", premium: 52.30, status: "completed" },
            { id: 8, client: "Marta Alves", date: "15/03/2025", type: "health", bestOffer: "Generali Health Complete", premium: 72.40, status: "completed" },
            { id: 9, client: "Rui Sousa", date: "10/03/2025", type: "travel", bestOffer: "Fidelidade World Travel", premium: 28.50, status: "completed" },
            { id: 10, client: "Teresa Gomes", date: "05/03/2025", type: "life", bestOffer: "Ageas Vida Protect", premium: 42.00, status: "completed" }
        ];
        
        // Get simulations table
        const simulationsTable = document.querySelector('#history-view .table tbody');
        if (!simulationsTable) return;
        
        // Clear existing rows
        simulationsTable.innerHTML = '';
        
        // Add simulation rows
        simulations.forEach(simulation => {
            const tr = document.createElement('tr');
            
            // ID cell
            const tdId = document.createElement('td');
            tdId.textContent = simulation.id;
            
            // Client cell
            const tdClient = document.createElement('td');
            tdClient.textContent = simulation.client;
            
            // Date cell
            const tdDate = document.createElement('td');
            tdDate.textContent = simulation.date;
            
            // Type cell
            const tdType = document.createElement('td');
            tdType.textContent = getInsuranceTypeText(simulation.type);
            
            // Best offer cell
            const tdBestOffer = document.createElement('td');
            tdBestOffer.textContent = simulation.bestOffer;
            
            // Premium cell
            const tdPremium = document.createElement('td');
            tdPremium.textContent = `€${simulation.premium.toFixed(2)}/mês`;
            
            // Status cell
            const tdStatus = document.createElement('td');
            const statusBadge = document.createElement('span');
            
            if (simulation.status === 'completed') {
                statusBadge.className = 'status-badge status-active';
                statusBadge.textContent = 'Concluído';
            } else {
                statusBadge.className = 'status-badge status-pending';
                statusBadge.textContent = 'Pendente';
            }
            
            tdStatus.appendChild(statusBadge);
            
            // Actions cell
            const tdActions = document.createElement('td');
            
            const viewBtn = document.createElement('button');
            viewBtn.className = 'btn btn-sm btn-outline-primary';
            viewBtn.textContent = 'Ver';
            viewBtn.addEventListener('click', function() {
                loadSavedSimulation(simulation.client, simulation.type);
            });
            
            tdActions.appendChild(viewBtn);
            
            // Add cells to row
            tr.appendChild(tdId);
            tr.appendChild(tdClient);
            tr.appendChild(tdDate);
            tr.appendChild(tdType);
            tr.appendChild(tdBestOffer);
            tr.appendChild(tdPremium);
            tr.appendChild(tdStatus);
            tr.appendChild(tdActions);
            
            // Add row to table
            simulationsTable.appendChild(tr);
        });
    } catch (error) {
        console.error("Error loading simulations history data:", error);
    }
}
