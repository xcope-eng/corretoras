# Modularized HTML Structure

This project is a modularized version of the original single-page application. The structure has been reorganized to use multiple HTML files with proper navigation between pages.

## Structure Overview

- **Individual HTML Pages**: Each section is now its own complete HTML file
  - `index.html` (Dashboard)
  - `clients.html`
  - `insurance.html`
  - `auto-insurance.html`
  - `history.html`
  - `settings.html`
  - `simulation.html`

- **Assets**:
  - `/css/` - Contains all CSS files
  - `/js/` - Contains all JavaScript files
  - `/img/` - Contains all images
  - `/data/` - Contains data models and API simulation

## Key Changes

1. **Navigation**: Converted from JavaScript-based navigation to standard HTML links
   - All sidebar links now use `<a href="...">` to navigate between pages
   - Active page highlighting is handled by page-specific JavaScript

2. **JavaScript Structure**:
   - `main.js` - Core functionality shared across all pages
   - `page-specific.js` - Handles page-specific functionality and active navigation highlighting
   - Data models remain in the `/data/` directory

3. **Shared Components**:
   - Header, sidebar, and footer are consistent across all pages
   - Each page loads the same CSS and JavaScript files

## How to Use

1. Open any HTML file in a web browser to start using the application
2. Navigate between pages using the sidebar links
3. All functionality from the original application is preserved

## Implementation Notes

- Each page is a complete HTML document with proper head and body sections
- Navigation between pages uses standard HTML links
- JavaScript is loaded at the end of each page for optimal performance
- Bootstrap and other dependencies are loaded from CDNs
