/* Page-specific JavaScript functions */

// Set active navigation link based on current page
document.addEventListener('DOMContentLoaded', function() {
    // Get current page filename
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // Set active class on corresponding navigation link
    const navLinks = document.querySelectorAll('#sidebar .nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
    
    // Initialize page-specific content
    initPageContent(currentPage);
});

// Initialize page-specific content
function initPageContent(page) {
    console.log("Initializing page:", page);
    
    switch(page) {
        case 'index.html':
            loadDashboardData();
            break;
        case 'clients.html':
            loadClientsData();
            break;
        case 'insurance.html':
            loadInsurancePoliciesData();
            break;
        case 'auto-insurance.html':
            loadAutoInsuranceData();
            break;
        case 'history.html':
            loadSimulationsHistoryData();
            break;
        case 'settings.html':
            // No specific data loading needed for settings
            break;
    }
    
    // Set up event listeners for the current page
    setupPageEventListeners(page);
}

// Set up event listeners specific to each page
function setupPageEventListeners(page) {
    console.log("Setting up event listeners for:", page);
    
    // Common event listeners across pages
    if (document.getElementById('new-simulation-btn')) {
        document.getElementById('new-simulation-btn').addEventListener('click', function() {
            window.location.href = 'simulation.html';
        });
    }
    
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
    
    // Page-specific event listeners
    switch(page) {
        case 'simulation.html':
            // Travel checkbox
            if (document.getElementById('travel-planned')) {
                document.getElementById('travel-planned').addEventListener('change', function() {
                    toggleTravelFields(this.checked);
                });
            }
            
            // View offers button
            if (document.getElementById('view-offers-btn')) {
                document.getElementById('view-offers-btn').addEventListener('click', function(e) {
                    e.preventDefault();
                    console.log("View Offers button clicked");
                    handleClientFormSubmission();
                });
            }
            
            // Filter offers dropdown
            if (document.getElementById('filter-offers')) {
                document.getElementById('filter-offers').addEventListener('change', function() {
                    filterOffers(this.value);
                });
            }
            
            // Insurance tabs
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
            break;
    }
}
