// Modified main.js for multi-page structure
// This file contains shared functions across all pages

// Load dashboard data
function loadDashboardData() {
    console.log("Loading dashboard data");
    // This would typically fetch data from an API
    // For now, we're using static data
}

// Load clients data
function loadClientsData() {
    console.log("Loading clients data");
    // This would typically fetch data from an API
}

// Load insurance policies data
function loadInsurancePoliciesData() {
    console.log("Loading insurance policies data");
    // This would typically fetch data from an API
}

// Load auto insurance data
function loadAutoInsuranceData() {
    console.log("Loading auto insurance data");
    // This would typically fetch data from an API
}

// Load simulations history data
function loadSimulationsHistoryData() {
    console.log("Loading simulations history data");
    // This would typically fetch data from an API
}

// Initialize recent simulations in sidebar
function initRecentSimulations() {
    console.log("Initializing recent simulations");
    // This would typically fetch data from an API
}

// Load saved simulation
function loadSavedSimulation(clientName, insuranceType) {
    console.log("Loading saved simulation for:", clientName, insuranceType);
    // Redirect to simulation page with parameters
    window.location.href = `simulation.html?client=${encodeURIComponent(clientName)}&type=${encodeURIComponent(insuranceType)}`;
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
            duration: parseInt(document.getElementById('duration')?.value || "0"),
            // Add vehicle data
            vehicle: {
                licensePlate: document.getElementById('license-plate').value || "",
                brand: document.getElementById('car-brand').value || "",
                model: document.getElementById('car-model').value || "",
                year: parseInt(document.getElementById('car-year').value || "2024")
            }
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
        document.getElementById('insurance-offers-section').style.display = 'block';
        
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

        // Process auto insurance offers
        if (offers.auto && offers.auto.length > 0) {
            const autoContainer = document.getElementById('auto-offers-container');
            offers.auto.forEach(offer => {
                const offerElement = createOfferElement(template, offer);
                if (autoContainer) {
                    autoContainer.appendChild(offerElement);
                }
            });
        }
        
        console.log("Offers displayed successfully");
    } catch (error) {
        console.error("Error displaying offers:", error);
    }
}

// Clear offer containers
function clearOfferContainers() {
    const containers = [
        document.getElementById('life-offers-container'),
        document.getElementById('health-offers-container'),
        document.getElementById('travel-offers-container'),
        document.getElementById('auto-offers-container')
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
    // Get all offer cards
    const offerCards = document.querySelectorAll('.offer-card');
    
    // Show all if filter is 'all'
    if (filterValue === 'all') {
        offerCards.forEach(card => {
            card.closest('.col-md-4').style.display = 'block';
        });
        return;
    }
    
    // Filter by price range
    offerCards.forEach(card => {
        const premiumElement = card.querySelector('.premium-value');
        if (premiumElement) {
            const premium = parseFloat(premiumElement.textContent.replace('€', ''));
            
            let show = false;
            if (filterValue === 'low' && premium < 50) {
                show = true;
            } else if (filterValue === 'medium' && premium >= 50 && premium < 80) {
                show = true;
            } else if (filterValue === 'high' && premium >= 80) {
                show = true;
            }
            
            card.closest('.col-md-4').style.display = show ? 'block' : 'none';
        }
    });
}
