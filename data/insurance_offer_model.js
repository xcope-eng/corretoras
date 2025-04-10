// Insurance Offer Model
// This file contains the data models and functions for generating insurance offers

window.insuranceOfferModel = (function() {
    // Insurance companies data
    const insuranceCompanies = {
        life: [
            {
                id: "fidelidade",
                name: "Fidelidade",
                logoPath: "img/logos/fidelidade.svg",
                products: [
                    {
                        name: "Vida Mais",
                        basePremium: 45,
                        coverages: ["Morte", "Invalidez", "Doenças Graves", "Hospitalização"],
                        description: "Seguro de vida completo com coberturas extensivas para toda a família."
                    },
                    {
                        name: "Vida Essencial",
                        basePremium: 35,
                        coverages: ["Morte", "Invalidez"],
                        description: "Proteção essencial para garantir o futuro da sua família."
                    }
                ]
            },
            {
                id: "ageas",
                name: "Ageas",
                logoPath: "img/logos/ageas.svg",
                products: [
                    {
                        name: "Vida Protect",
                        basePremium: 42,
                        coverages: ["Morte", "Invalidez", "Doenças Graves"],
                        description: "Proteção financeira para si e para a sua família em caso de imprevistos."
                    },
                    {
                        name: "Vida Completo",
                        basePremium: 50,
                        coverages: ["Morte", "Invalidez", "Doenças Graves", "Hospitalização", "Desemprego"],
                        description: "A solução mais completa para proteger o seu futuro e o da sua família."
                    }
                ]
            },
            {
                id: "allianz",
                name: "Allianz",
                logoPath: "img/logos/allianz.svg",
                products: [
                    {
                        name: "Life Premium",
                        basePremium: 48,
                        coverages: ["Morte", "Invalidez", "Doenças Graves", "Hospitalização"],
                        description: "Seguro de vida premium com coberturas extensivas e assistência personalizada."
                    },
                    {
                        name: "Life Basic",
                        basePremium: 32,
                        coverages: ["Morte", "Invalidez"],
                        description: "Proteção básica a um preço acessível."
                    }
                ]
            },
            {
                id: "generali",
                name: "Generali",
                logoPath: "img/logos/generali.svg",
                products: [
                    {
                        name: "Vida Total",
                        basePremium: 46,
                        coverages: ["Morte", "Invalidez", "Doenças Graves", "Hospitalização"],
                        description: "Proteção total para você e sua família com coberturas abrangentes."
                    }
                ]
            },
            {
                id: "tranquilidade",
                name: "Tranquilidade",
                logoPath: "img/logos/tranquilidade.svg",
                products: [
                    {
                        name: "Vida Tranquila",
                        basePremium: 40,
                        coverages: ["Morte", "Invalidez", "Doenças Graves"],
                        description: "Seguro de vida que oferece tranquilidade para o seu futuro."
                    }
                ]
            }
        ],
        health: [
            {
                id: "ageas",
                name: "Ageas",
                logoPath: "img/logos/ageas.svg",
                products: [
                    {
                        name: "Médis Premium",
                        basePremium: 75,
                        coverages: ["Hospitalização", "Consultas", "Exames", "Medicamentos", "Dental"],
                        description: "Plano de saúde premium com cobertura completa para toda a família."
                    },
                    {
                        name: "Médis Básico",
                        basePremium: 45,
                        coverages: ["Hospitalização", "Consultas", "Exames"],
                        description: "Plano de saúde básico com cobertura essencial a preço acessível."
                    }
                ]
            },
            {
                id: "fidelidade",
                name: "Fidelidade",
                logoPath: "img/logos/fidelidade.svg",
                products: [
                    {
                        name: "Multicare Plus",
                        basePremium: 80,
                        coverages: ["Hospitalização", "Consultas", "Exames", "Medicamentos", "Dental", "Oftalmologia"],
                        description: "O plano de saúde mais completo do mercado com acesso à rede Multicare."
                    },
                    {
                        name: "Multicare Essencial",
                        basePremium: 50,
                        coverages: ["Hospitalização", "Consultas", "Exames"],
                        description: "Cobertura essencial de saúde com acesso à rede Multicare."
                    }
                ]
            },
            {
                id: "generali",
                name: "Generali",
                logoPath: "img/logos/generali.svg",
                products: [
                    {
                        name: "Health Complete",
                        basePremium: 72,
                        coverages: ["Hospitalização", "Consultas", "Exames", "Medicamentos", "Dental"],
                        description: "Plano de saúde completo com acesso a uma vasta rede de prestadores."
                    },
                    {
                        name: "Health Basic",
                        basePremium: 42,
                        coverages: ["Hospitalização", "Consultas", "Exames"],
                        description: "Plano de saúde básico com cobertura essencial."
                    }
                ]
            },
            {
                id: "allianz",
                name: "Allianz",
                logoPath: "img/logos/allianz.svg",
                products: [
                    {
                        name: "Health Premium",
                        basePremium: 85,
                        coverages: ["Hospitalização", "Consultas", "Exames", "Medicamentos", "Dental", "Oftalmologia", "Fisioterapia"],
                        description: "O plano de saúde mais abrangente com cobertura internacional."
                    }
                ]
            },
            {
                id: "tranquilidade",
                name: "Tranquilidade",
                logoPath: "img/logos/tranquilidade.svg",
                products: [
                    {
                        name: "Saúde Tranquila",
                        basePremium: 65,
                        coverages: ["Hospitalização", "Consultas", "Exames", "Medicamentos"],
                        description: "Plano de saúde completo com atendimento personalizado."
                    }
                ]
            }
        ],
        travel: [
            {
                id: "allianz",
                name: "Allianz",
                logoPath: "img/logos/allianz.svg",
                products: [
                    {
                        name: "Global Travel",
                        basePremium: 30,
                        coverages: ["Assistência Médica", "Bagagem", "Cancelamento", "Atrasos", "Responsabilidade Civil"],
                        description: "Seguro de viagem global com cobertura completa para qualquer destino."
                    },
                    {
                        name: "Europe Travel",
                        basePremium: 20,
                        coverages: ["Assistência Médica", "Bagagem", "Cancelamento"],
                        description: "Seguro de viagem para destinos europeus com cobertura essencial."
                    }
                ]
            },
            {
                id: "fidelidade",
                name: "Fidelidade",
                logoPath: "img/logos/fidelidade.svg",
                products: [
                    {
                        name: "World Travel",
                        basePremium: 28,
                        coverages: ["Assistência Médica", "Bagagem", "Cancelamento", "Atrasos"],
                        description: "Seguro de viagem mundial com coberturas abrangentes."
                    },
                    {
                        name: "Basic Travel",
                        basePremium: 18,
                        coverages: ["Assistência Médica", "Bagagem"],
                        description: "Seguro de viagem básico com coberturas essenciais."
                    }
                ]
            },
            {
                id: "tranquilidade",
                name: "Tranquilidade",
                logoPath: "img/logos/tranquilidade.svg",
                products: [
                    {
                        name: "Travel Safe",
                        basePremium: 32,
                        coverages: ["Assistência Médica", "Bagagem", "Cancelamento", "Atrasos", "Responsabilidade Civil", "Atividades Desportivas"],
                        description: "O seguro de viagem mais completo, incluindo cobertura para atividades desportivas."
                    }
                ]
            },
            {
                id: "ageas",
                name: "Ageas",
                logoPath: "img/logos/ageas.svg",
                products: [
                    {
                        name: "Travel Plus",
                        basePremium: 25,
                        coverages: ["Assistência Médica", "Bagagem", "Cancelamento", "Atrasos"],
                        description: "Seguro de viagem completo com assistência 24/7 em qualquer parte do mundo."
                    }
                ]
            },
            {
                id: "generali",
                name: "Generali",
                logoPath: "img/logos/generali.svg",
                products: [
                    {
                        name: "Travel Complete",
                        basePremium: 27,
                        coverages: ["Assistência Médica", "Bagagem", "Cancelamento", "Atrasos"],
                        description: "Seguro de viagem completo com assistência personalizada."
                    }
                ]
            }
        ]
    };

    // Calculate premium based on client data
    function calculatePremium(basePremium, clientData, insuranceType) {
        let premium = basePremium;
        
        // Age factor
        if (clientData.age) {
            if (insuranceType === 'life') {
                premium += (clientData.age - 30) * 0.5;
            } else if (insuranceType === 'health') {
                premium += (clientData.age - 30) * 0.7;
            }
        }
        
        // Income factor
        if (clientData.income) {
            const incomeInThousands = clientData.income / 1000;
            if (insuranceType === 'life') {
                premium += incomeInThousands * 0.05;
            } else if (insuranceType === 'health') {
                premium += incomeInThousands * 0.03;
            }
        }
        
        // Children factor
        if (clientData.children && clientData.children > 0) {
            if (insuranceType === 'life') {
                premium += clientData.children * 3;
            } else if (insuranceType === 'health') {
                premium += clientData.children * 5;
            }
        }
        
        // Travel specific factors
        if (insuranceType === 'travel' && clientData.travelPlanned) {
            if (clientData.duration) {
                premium += clientData.duration * 0.5;
            }
            
            if (clientData.destination) {
                // Higher premium for certain destinations
                const expensiveDestinations = ['Estados Unidos', 'Japão', 'Austrália', 'Canadá', 'Suíça'];
                if (expensiveDestinations.some(dest => clientData.destination.includes(dest))) {
                    premium *= 1.3;
                }
            }
        }
        
        // Round to 2 decimal places
        return Math.round(premium * 100) / 100;
    }

    // Generate offers for a specific insurance type
    function generateOffersForType(clientData, insuranceType) {
        const companies = insuranceCompanies[insuranceType];
        
        if (!companies || companies.length === 0) {
            return [];
        }
        
        // Select 3 random companies (or fewer if not enough)
        const selectedCompanies = [];
        const availableCompanies = [...companies];
        
        const numCompanies = Math.min(3, availableCompanies.length);
        
        for (let i = 0; i < numCompanies; i++) {
            const randomIndex = Math.floor(Math.random() * availableCompanies.length);
            selectedCompanies.push(availableCompanies.splice(randomIndex, 1)[0]);
        }
        
        // Generate offers for each selected company
        return selectedCompanies.map(company => {
            // Select a random product from the company
            const randomProductIndex = Math.floor(Math.random() * company.products.length);
            const product = company.products[randomProductIndex];
            
            // Calculate premium based on client data
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

    // Generate all insurance offers
    function generateAllOffers(clientData) {
        return {
            life: generateOffersForType(clientData, 'life'),
            health: generateOffersForType(clientData, 'health'),
            travel: generateOffersForType(clientData, 'travel')
        };
    }

    // Public API
    return {
        generateAllOffers: generateAllOffers,
        insuranceCompanies: insuranceCompanies
    };
})();
