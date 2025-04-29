// public/insurance-model.js
window.insuranceOfferModel = (function() {
    const insuranceCompanies = {
        // -- same data you already provided --
        // (for brevity, keep the full object you shared here unchanged)
    };

    function calculatePremium(basePremium, clientData, insuranceType) {
        let premium = basePremium;

        if (clientData.age) {
            if (insuranceType === 'life') premium += (clientData.age - 30) * 0.5;
            else if (insuranceType === 'health') premium += (clientData.age - 30) * 0.7;
        }

        if (clientData.income) {
            const incomeInThousands = clientData.income / 1000;
            if (insuranceType === 'life') premium += incomeInThousands * 0.05;
            else if (insuranceType === 'health') premium += incomeInThousands * 0.03;
        }

        if (clientData.children > 0) {
            if (insuranceType === 'life') premium += clientData.children * 3;
            else if (insuranceType === 'health') premium += clientData.children * 5;
        }

        if (insuranceType === 'travel' && clientData.travelPlanned) {
            if (clientData.duration) premium += clientData.duration * 0.5;
            if (clientData.destination) {
                const expensiveDestinations = ['Estados Unidos', 'Japão', 'Austrália', 'Canadá', 'Suíça'];
                if (expensiveDestinations.some(dest => clientData.destination.includes(dest))) {
                    premium *= 1.3;
                }
            }
        }

        return Math.round(premium * 100) / 100;
    }

    function generateOffersForType(clientData, insuranceType) {
        const companies = insuranceCompanies[insuranceType];
        if (!companies || companies.length === 0) return [];

        const selectedCompanies = [];
        const availableCompanies = [...companies];
        const numCompanies = Math.min(3, availableCompanies.length);

        for (let i = 0; i < numCompanies; i++) {
            const randomIndex = Math.floor(Math.random() * availableCompanies.length);
            selectedCompanies.push(availableCompanies.splice(randomIndex, 1)[0]);
        }

        return selectedCompanies.map(company => {
            const randomProductIndex = Math.floor(Math.random() * company.products.length);
            const product = company.products[randomProductIndex];
            const premium = calculatePremium(product.basePremium, clientData, insuranceType);

            return {
                company: company.name,
                companyId: company.id,
                logoPath: company.logoPath,
                product: product.name,
                premium: premium,
                coverages: product.coverages,
                description: product.description,
                contactLink: `#contact-${company.id}`
            };
        });
    }

    function generateAllOffers(clientData) {
        return {
            life: generateOffersForType(clientData, 'life'),
            health: generateOffersForType(clientData, 'health'),
            travel: generateOffersForType(clientData, 'travel')
        };
    }

    return {
        generateAllOffers: generateAllOffers,
        insuranceCompanies: insuranceCompanies
    };
})();
