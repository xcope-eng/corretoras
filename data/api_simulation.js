// API Simulation for Insurance Broker Platform
// This file simulates API calls to insurance companies

window.apiSimulation = (function() {
    // Simulate API call to get insurance offers
    function generateSimulatedOffers(clientData, riskProfile) {
        console.log("Generating simulated offers for client:", clientData);
        
        // Sample insurance offers
        const offers = {
            life: [
                {
                    company: "Fidelidade",
                    product: "Vida Mais",
                    description: "Seguro de vida com cobertura completa",
                    premium: 45.75,
                    coverages: ["Morte", "Invalidez", "Doenças Graves", "Desemprego"],
                    logoPath: "img/logos/fidelidade.svg"
                },
                {
                    company: "Ageas",
                    product: "Vida Protect",
                    description: "Proteção para toda a família",
                    premium: 52.30,
                    coverages: ["Morte", "Invalidez", "Doenças Graves"],
                    logoPath: "img/logos/ageas.svg"
                },
                {
                    company: "Allianz",
                    product: "Vida Segura",
                    description: "Seguro de vida flexível e abrangente",
                    premium: 48.90,
                    coverages: ["Morte", "Invalidez", "Doenças Graves", "Acidentes"],
                    logoPath: "img/logos/allianz.svg"
                }
            ],
            health: [
                {
                    company: "Ageas",
                    product: "Médis Premium",
                    description: "Cobertura de saúde premium",
                    premium: 78.50,
                    coverages: ["Consultas", "Exames", "Internamentos", "Medicamentos"],
                    logoPath: "img/logos/ageas.svg"
                },
                {
                    company: "Fidelidade",
                    product: "Multicare Plus",
                    description: "Plano de saúde completo",
                    premium: 85.20,
                    coverages: ["Consultas", "Exames", "Internamentos", "Medicamentos", "Dentista"],
                    logoPath: "img/logos/fidelidade.svg"
                },
                {
                    company: "Allianz",
                    product: "Saúde Vital",
                    description: "Proteção de saúde essencial",
                    premium: 72.40,
                    coverages: ["Consultas", "Exames", "Internamentos", "Dentista"],
                    logoPath: "img/logos/allianz.svg"
                }
            ],
            travel: [
                {
                    company: "Allianz",
                    product: "Global Travel",
                    description: "Seguro de viagem internacional",
                    premium: 32.25,
                    coverages: ["Cancelamento", "Assistência", "Bagagem", "Acidentes"],
                    logoPath: "img/logos/allianz.svg"
                },
                {
                    company: "Fidelidade",
                    product: "Travel Care",
                    description: "Proteção completa em viagem",
                    premium: 35.80,
                    coverages: ["Cancelamento", "Assistência", "Bagagem", "Acidentes", "Saúde"],
                    logoPath: "img/logos/fidelidade.svg"
                },
                {
                    company: "Tranquilidade",
                    product: "Viagem Segura",
                    description: "Seguro de viagem abrangente",
                    premium: 29.90,
                    coverages: ["Cancelamento", "Assistência", "Bagagem", "Saúde"],
                    logoPath: "img/logos/tranquilidade.svg"
                }
            ],
            auto: [
                {
                    company: "Fidelidade",
                    product: "Auto Total",
                    description: "Cobertura completa para o seu automóvel",
                    premium: 65.90,
                    coverages: ["Danos Próprios", "Responsabilidade Civil", "Assistência em Viagem", "Vidros", "Roubo", "Incêndio"],
                    logoPath: "img/logos/fidelidade.svg"
                },
                {
                    company: "Ageas",
                    product: "Auto Premium",
                    description: "Proteção premium para o seu veículo",
                    premium: 72.50,
                    coverages: ["Danos Próprios", "Responsabilidade Civil", "Assistência em Viagem", "Vidros", "Roubo", "Incêndio"],
                    logoPath: "img/logos/ageas.svg"
                },
                {
                    company: "Allianz",
                    product: "Auto Plus",
                    description: "Seguro automóvel com coberturas adicionais",
                    premium: 68.75,
                    coverages: ["Danos Próprios", "Responsabilidade Civil", "Assistência em Viagem", "Vidros", "Roubo", "Incêndio"],
                    logoPath: "img/logos/allianz.svg"
                }
            ]
        };
        
        return offers;
    }
    
    // Create fallback offers in case the main generation fails
    function createFallbackOffers(clientData) {
        console.log("Creating fallback offers due to API simulation error");
        
        const baseLifePremium = 40 + (clientData.age ? clientData.age * 0.5 : 20);
        const baseHealthPremium = 60 + (clientData.age ? clientData.age * 0.7 : 30);
        const baseTravelPremium = 25 + (clientData.duration ? clientData.duration * 2 : 10);
        
        return {
            life: [
                {
                    company: "Fidelidade",
                    companyId: "fidelidade",
                    logoPath: "img/logos/fidelidade.svg",
                    product: "Vida Mais",
                    premium: baseLifePremium,
                    coverages: ["Morte", "Invalidez", "Doenças Graves"],
                    description: "Seguro de vida completo com coberturas extensivas para toda a família.",
                    contactLink: "#contact-fidelidade"
                },
                {
                    company: "Ageas",
                    companyId: "ageas",
                    logoPath: "img/logos/ageas.svg",
                    product: "Vida Protect",
                    premium: baseLifePremium * 0.9,
                    coverages: ["Morte", "Invalidez"],
                    description: "Proteção financeira para si e para a sua família em caso de imprevistos.",
                    contactLink: "#contact-ageas"
                },
                {
                    company: "Allianz",
                    companyId: "allianz",
                    logoPath: "img/logos/allianz.svg",
                    product: "Life Premium",
                    premium: baseLifePremium * 1.2,
                    coverages: ["Morte", "Invalidez", "Doenças Graves", "Hospitalização"],
                    description: "Seguro de vida premium com coberturas extensivas e assistência personalizada.",
                    contactLink: "#contact-allianz"
                }
            ],
            health: [
                {
                    company: "Ageas",
                    companyId: "ageas",
                    logoPath: "img/logos/ageas.svg",
                    product: "Médis Premium",
                    premium: baseHealthPremium,
                    coverages: ["Hospitalização", "Consultas", "Exames", "Medicamentos"],
                    description: "Plano de saúde premium com cobertura completa para toda a família.",
                    contactLink: "#contact-ageas"
                },
                {
                    company: "Fidelidade",
                    companyId: "fidelidade",
                    logoPath: "img/logos/fidelidade.svg",
                    product: "Multicare Plus",
                    premium: baseHealthPremium * 1.1,
                    coverages: ["Hospitalização", "Consultas", "Exames", "Medicamentos", "Dental"],
                    description: "O plano de saúde mais completo do mercado com acesso à rede Multicare.",
                    contactLink: "#contact-fidelidade"
                },
                {
                    company: "Generali",
                    companyId: "generali",
                    logoPath: "img/logos/generali.svg",
                    product: "Health Complete",
                    premium: baseHealthPremium * 0.95,
                    coverages: ["Hospitalização", "Consultas", "Exames"],
                    description: "Plano de saúde completo com acesso a uma vasta rede de prestadores.",
                    contactLink: "#contact-generali"
                }
            ],
            travel: [
                {
                    company: "Allianz",
                    companyId: "allianz",
                    logoPath: "img/logos/allianz.svg",
                    product: "Global Travel",
                    premium: baseTravelPremium,
                    coverages: ["Assistência Médica", "Bagagem", "Cancelamento"],
                    description: "Seguro de viagem global com cobertura completa para qualquer destino.",
                    contactLink: "#contact-allianz"
                },
                {
                    company: "Fidelidade",
                    companyId: "fidelidade",
                    logoPath: "img/logos/fidelidade.svg",
                    product: "World Travel",
                    premium: baseTravelPremium * 0.9,
                    coverages: ["Assistência Médica", "Bagagem"],
                    description: "Seguro de viagem mundial com coberturas abrangentes.",
                    contactLink: "#contact-fidelidade"
                },
                {
                    company: "Tranquilidade",
                    companyId: "tranquilidade",
                    logoPath: "img/logos/tranquilidade.svg",
                    product: "Travel Safe",
                    premium: baseTravelPremium * 1.1,
                    coverages: ["Assistência Médica", "Bagagem", "Cancelamento", "Atrasos"],
                    description: "O seguro de viagem mais completo, incluindo cobertura para atividades desportivas.",
                    contactLink: "#contact-tranquilidade"
                }
            ]
        };
    }
    
    // Simulate API call to get client risk profile
    function getClientRiskProfile(clientData) {
        console.log("Simulating risk profile calculation for client:", clientData.name);
        
        // In a real implementation, this would call an actual risk assessment API
        // For now, we'll calculate a simple risk profile based on client data
        
        const riskProfile = {
            life: calculateLifeRiskScore(clientData),
            health: calculateHealthRiskScore(clientData),
            travel: calculateTravelRiskScore(clientData)
        };
        
        console.log("Calculated risk profile:", riskProfile);
        return riskProfile;
    }
    
    // Calculate life insurance risk score
    function calculateLifeRiskScore(clientData) {
        let riskScore = 50; // Base score
        
        // Age factor
        if (clientData.age) {
            if (clientData.age < 30) {
                riskScore -= 10;
            } else if (clientData.age > 50) {
                riskScore += 15;
            } else if (clientData.age > 40) {
                riskScore += 5;
            }
        }
        
        // Gender factor (simplified)
        if (clientData.gender === 'male') {
            riskScore += 5;
        } else if (clientData.gender === 'female') {
            riskScore -= 5;
        }
        
        // Children factor
        if (clientData.children && clientData.children > 0) {
            riskScore += 5 * Math.min(clientData.children, 3);
        }
        
        // Marital status factor
        if (clientData.maritalStatus === 'married') {
            riskScore += 5;
        }
        
        // Normalize score between 0-100
        return Math.max(0, Math.min(100, riskScore));
    }
    
    // Calculate health insurance risk score
    function calculateHealthRiskScore(clientData) {
        let riskScore = 50; // Base score
        
        // Age factor
        if (clientData.age) {
            if (clientData.age < 30) {
                riskScore -= 15;
            } else if (clientData.age > 60) {
                riskScore += 25;
            } else if (clientData.age > 40) {
                riskScore += 10;
            }
        }
        
        // Gender factor (simplified)
        if (clientData.gender === 'male') {
            riskScore += 2;
        } else if (clientData.gender === 'female') {
            riskScore += 3;
        }
        
        // Children factor
        if (clientData.children && clientData.children > 0) {
            riskScore += 3 * Math.min(clientData.children, 3);
        }
        
        // Normalize score between 0-100
        return Math.max(0, Math.min(100, riskScore));
    }
    
    // Calculate travel insurance risk score
    function calculateTravelRiskScore(clientData) {
        let riskScore = 50; // Base score
        
        // Age factor
        if (clientData.age) {
            if (clientData.age < 25) {
                riskScore += 10; // Young travelers tend to take more risks
            } else if (clientData.age > 65) {
                riskScore += 15; // Elderly travelers have higher medical risks
            }
        }
        
        // Destination factor (simplified)
        if (clientData.destination) {
            const highRiskDestinations = ['Estados Unidos', 'Japão', 'Austrália', 'Canadá', 'Suíça'];
            if (highRiskDestinations.some(dest => clientData.destination.includes(dest))) {
                riskScore += 15;
            }
        }
        
        // Duration factor
        if (clientData.duration) {
            if (clientData.duration > 30) {
                riskScore += 20;
            } else if (clientData.duration > 14) {
                riskScore += 10;
            }
        }
        
        // Normalize score between 0-100
        return Math.max(0, Math.min(100, riskScore));
    }
    
    // Public API
    return {
        generateSimulatedOffers: generateSimulatedOffers,
        getClientRiskProfile: getClientRiskProfile
    };
})();
