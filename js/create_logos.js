// Script to create SVG logos for insurance companies
// This script generates simple SVG logos for the insurance companies in our platform

const fs = require('fs');
const path = require('path');

// Ensure the logos directory exists
const logosDir = path.join(__dirname, '..', 'img', 'logos');
if (!fs.existsSync(logosDir)) {
    fs.mkdirSync(logosDir, { recursive: true });
    console.log(`Created directory: ${logosDir}`);
}

// Insurance company colors
const companyColors = {
    fidelidade: '#ED1C24', // Red
    ageas: '#00A0DF',      // Blue
    allianz: '#003781',    // Dark Blue
    generali: '#E30613',   // Red
    tranquilidade: '#009A44' // Green
};

// Create SVG logo for each company
function createLogo(companyId, color) {
    const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="80" viewBox="0 0 200 80">
    <rect width="100%" height="100%" fill="white"/>
    <rect x="10" y="10" width="180" height="60" rx="5" fill="${color}" opacity="0.1"/>
    <text x="100" y="45" font-family="Arial, sans-serif" font-size="24" font-weight="bold" text-anchor="middle" fill="${color}">${companyId.toUpperCase()}</text>
</svg>`;

    const filePath = path.join(logosDir, `${companyId}.svg`);
    fs.writeFileSync(filePath, svgContent);
    console.log(`Created logo for ${companyId}: ${filePath}`);
}

// Create logos for all companies
Object.entries(companyColors).forEach(([companyId, color]) => {
    createLogo(companyId, color);
});

console.log('All insurance company logos created successfully!');
