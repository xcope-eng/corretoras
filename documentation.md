# Insurance Broker Platform Documentation

## Overview
The Insurance Broker Platform is an internal web application designed for insurance brokers to streamline the process of comparing insurance offers from different providers. The platform allows brokers to enter client data once and immediately view simulated offers from various insurance companies for life, travel, and health insurance products.

## Features

### Client Data Collection
- Comprehensive form for collecting all relevant client information:
  - Personal information (name, age, gender)
  - Housing information (rented/owned)
  - Family information (marital status, number of children)
  - Professional information (occupation, estimated annual income)
  - Travel information (destination, duration if applicable)

### Insurance Offer Simulation
- Generates simulated offers from multiple insurance companies for three types of insurance:
  - Life insurance
  - Health insurance
  - Travel insurance
- Each offer includes:
  - Company name and logo
  - Product name
  - Monthly premium
  - List of coverages
  - Contact link for further details

### User Interface
- Modern, clean design inspired by B2B SaaS platforms
- Responsive layout that works on desktop and mobile devices
- Dashboard-style interface with sidebar navigation
- Tab-based organization of insurance offers by type
- Filtering capabilities to sort offers by premium or coverage

### History Tracking
- Records recent simulations for quick reference
- Displays simulation history in both sidebar and dedicated table
- Allows reloading previous simulations with a single click

## Technical Architecture

### Frontend
- Pure HTML, CSS, and JavaScript implementation
- Responsive design using Bootstrap 5 framework
- Custom styling with modern UI elements
- Client-side form validation
- Dynamic content generation

### Data Simulation
- Simulated API responses for insurance offers
- Mock data generation based on client information
- Realistic premium calculation algorithms
- Simulated company and product information

### Data Flow
1. User enters client data in the form
2. Form data is validated client-side
3. On submission, client data is processed
4. Simulated API calls generate insurance offers
5. Offers are displayed in the appropriate tabs
6. Simulation is added to history

## Future API Integration

The platform is designed to be easily integrated with real insurance company APIs in the future. Here's how the integration would work:

### API Integration Points

The main integration point is in the `generateSimulatedOffers` function in `main.js`. Currently, this function calls the simulated API in `api_simulation.js`. To integrate with real APIs:

1. Replace the call to `window.apiSimulation.generateSimulatedOffers` with actual API calls
2. Implement authentication for each insurance company API
3. Transform the client data to match each API's expected format
4. Process the API responses to match the platform's expected format

### Example Integration Code

```javascript
// Example of how to integrate with a real insurance company API
async function getRealInsuranceOffers(clientData, insuranceType) {
    // Transform client data to match API expectations
    const apiReadyData = transformClientData(clientData, insuranceType);
    
    // Make API call with proper authentication
    const response = await fetch('https://api.insurance-company.com/offers', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer YOUR_API_KEY'
        },
        body: JSON.stringify(apiReadyData)
    });
    
    // Process API response
    const apiResponse = await response.json();
    
    // Transform API response to match platform's expected format
    return transformApiResponse(apiResponse, insuranceType);
}
```

### Required API Capabilities

For successful integration, each insurance company API should provide:

1. Endpoint for submitting client data and receiving offers
2. Authentication mechanism
3. Detailed offer information including:
   - Product details
   - Premium calculation
   - Coverage information
   - Terms and conditions

### Data Transformation

Each insurance company API will likely have different data formats and requirements. The platform would need:

1. Input transformers to convert platform data to API-specific formats
2. Output transformers to convert API responses to the platform's format
3. Error handling for API-specific error responses

## Deployment

The platform is deployed as a static website and can be accessed at:
[https://qsvzvtoe.manus.space](https://qsvzvtoe.manus.space)

## Development and Maintenance

### Project Structure
```
insurance-broker-platform/
├── css/
│   └── styles.css
├── data/
│   ├── api_simulation.js
│   ├── client_model.js
│   └── insurance_offer_model.js
├── img/
│   └── logos/
│       ├── fidelidade.svg
│       ├── ageas.svg
│       └── ...
├── js/
│   ├── create_logos.js
│   ├── main.js
│   └── test_cases.js
└── index.html
```

### Adding New Insurance Companies

To add new insurance companies to the platform:

1. Add the company to the `mockInsuranceCompanies` array in `insurance_offer_model.js`
2. Create a logo for the company using `create_logos.js`
3. Update the simulated API response logic in `api_simulation.js` if needed

### Modifying the Client Data Form

To add or modify fields in the client data form:

1. Update the HTML form in `index.html`
2. Update the client data model in `client_model.js`
3. Update the form handling logic in `main.js`
4. Update the premium calculation logic in `api_simulation.js`

## Conclusion

The Insurance Broker Platform provides a streamlined way for insurance brokers to compare offers from different providers. While currently using simulated data, the platform is designed to be easily integrated with real insurance company APIs in the future.
