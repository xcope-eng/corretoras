// Client data model
window.clientModel = {
    // Default client data
    defaultClient: {
        name: "João Silva",
        age: 42,
        gender: "male",
        housingType: "owned",
        maritalStatus: "married",
        children: 2,
        occupation: "Engenheiro",
        income: 45000,
        travelPlanned: false,
        destination: "",
        duration: 0,
        carmodel: "",
        carValue: 0,
    },
    
    // Validate client data
    validateClientData: function(clientData) {
        const errors = [];
        
        if (!clientData.name || clientData.name.trim() === "") {
            errors.push("Nome é obrigatório");
        }
        
        if (!clientData.age || clientData.age < 18 || clientData.age > 100) {
            errors.push("Idade deve ser entre 18 e 100 anos");
        }
        
        if (!clientData.gender || !["male", "female", "other"].includes(clientData.gender)) {
            errors.push("Género é obrigatório");
        }
        
        if (!clientData.housingType || !["rented", "owned"].includes(clientData.housingType)) {
            errors.push("Tipo de habitação é obrigatório");
        }
        
        if (!clientData.maritalStatus || !["single", "married", "divorced", "widowed"].includes(clientData.maritalStatus)) {
            errors.push("Estado civil é obrigatório");
        }
        
        if (clientData.children === undefined || clientData.children < 0) {
            errors.push("Número de filhos deve ser 0 ou mais");
        }
        
        if (!clientData.occupation || clientData.occupation.trim() === "") {
            errors.push("Ocupação profissional é obrigatória");
        }
        
        if (!clientData.income || clientData.income < 0) {
            errors.push("Rendimento anual estimado é obrigatório");
        }
        
        if (clientData.travelPlanned) {
            if (!clientData.destination || clientData.destination.trim() === "") {
                errors.push("Destino de viagem é obrigatório quando tem viagem planeada");
            }
            
            if (!clientData.duration || clientData.duration < 1) {
                errors.push("Duração de viagem deve ser pelo menos 1 dia");
            }
        }
        
        return {
            isValid: errors.length === 0,
            errors: errors
        };
    },
    
    // Get client risk profile based on client data
    getClientRiskProfile: function(clientData) {
        let riskScore = 50; // Base risk score
        
        // Age factor
        if (clientData.age < 25) {
            riskScore += 15;
        } else if (clientData.age < 40) {
            riskScore += 5;
        } else if (clientData.age > 60) {
            riskScore += 10;
        }
        
        // Housing factor
        if (clientData.housingType === "owned") {
            riskScore -= 5;
        }
        
        // Marital status factor
        if (clientData.maritalStatus === "married") {
            riskScore -= 5;
        }
        
        // Children factor
        if (clientData.children > 0) {
            riskScore += (clientData.children * 3);
        }
        
        // Income factor
        if (clientData.income < 20000) {
            riskScore += 10;
        } else if (clientData.income > 50000) {
            riskScore -= 10;
        }
        
        // Normalize risk score between 0 and 100
        riskScore = Math.max(0, Math.min(100, riskScore));
        
        // Determine risk profile
        let riskProfile;
        if (riskScore < 30) {
            riskProfile = "low";
        } else if (riskScore < 70) {
            riskProfile = "medium";
        } else {
            riskProfile = "high";
        }
        
        return {
            score: riskScore,
            profile: riskProfile
        };
    },
    
    // Get sample clients for the platform
    getSampleClients: function() {
        return [
            {
                id: "CLI-001",
                name: "João Silva",
                email: "joao.silva@example.com",
                phone: "+351 912 345 678",
                age: 42,
                gender: "male",
                occupation: "Engenheiro",
                income: 45000,
                policies: 3,
                status: "active"
            },
            {
                id: "CLI-002",
                name: "Maria Santos",
                email: "maria.santos@example.com",
                phone: "+351 923 456 789",
                age: 35,
                gender: "female",
                occupation: "Médica",
                income: 65000,
                policies: 2,
                status: "active"
            },
            {
                id: "CLI-003",
                name: "António Ferreira",
                email: "antonio.ferreira@example.com",
                phone: "+351 934 567 890",
                age: 28,
                gender: "male",
                occupation: "Professor",
                income: 32000,
                policies: 1,
                status: "active"
            },
            {
                id: "CLI-004",
                name: "Sofia Oliveira",
                email: "sofia.oliveira@example.com",
                phone: "+351 945 678 901",
                age: 31,
                gender: "female",
                occupation: "Advogada",
                income: 55000,
                policies: 2,
                status: "active"
            },
            {
                id: "CLI-005",
                name: "Miguel Costa",
                email: "miguel.costa@example.com",
                phone: "+351 956 789 012",
                age: 45,
                gender: "male",
                occupation: "Empresário",
                income: 75000,
                policies: 4,
                status: "active"
            },
            {
                id: "CLI-006",
                name: "Ana Rodrigues",
                email: "ana.rodrigues@example.com",
                phone: "+351 967 890 123",
                age: 29,
                gender: "female",
                occupation: "Designer",
                income: 38000,
                policies: 1,
                status: "active"
            },
            {
                id: "CLI-007",
                name: "Pedro Almeida",
                email: "pedro.almeida@example.com",
                phone: "+351 978 901 234",
                age: 52,
                gender: "male",
                occupation: "Arquiteto",
                income: 60000,
                policies: 3,
                status: "active"
            },
            {
                id: "CLI-008",
                name: "Inês Martins",
                email: "ines.martins@example.com",
                phone: "+351 989 012 345",
                age: 33,
                gender: "female",
                occupation: "Jornalista",
                income: 42000,
                policies: 2,
                status: "active"
            }
        ];
    },
    
    // Get sample policies for the platform
    getSamplePolicies: function() {
        return [
            {
                id: "POL-001",
                client: "João Silva",
                type: "life",
                company: "Fidelidade",
                product: "Vida Essencial",
                premium: 45.20,
                validUntil: "14/10/2025",
                status: "active"
            },
            {
                id: "POL-002",
                client: "João Silva",
                type: "health",
                company: "Ageas",
                product: "Saúde Completo",
                premium: 78.50,
                validUntil: "31/10/2025",
                status: "active"
            },
            {
                id: "POL-003",
                client: "João Silva",
                type: "travel",
                company: "Allianz",
                product: "Viagem Global",
                premium: 32.75,
                validUntil: "09/09/2025",
                status: "active"
            },
            {
                id: "POL-004",
                client: "Maria Santos",
                type: "health",
                company: "Ageas",
                product: "Saúde Premium",
                premium: 92.30,
                validUntil: "19/09/2025",
                status: "active"
            },
            {
                id: "POL-005",
                client: "Maria Santos",
                type: "life",
                company: "Generali",
                product: "Vida Proteção",
                premium: 51.80,
                validUntil: "04/12/2025",
                status: "active"
            },
            {
                id: "POL-006",
                client: "António Ferreira",
                type: "travel",
                company: "Generali",
                product: "Viagem Europa",
                premium: 28.90,
                validUntil: "22/08/2025",
                status: "active"
            },
            {
                id: "POL-007",
                client: "Sofia Oliveira",
                type: "health",
                company: "Fidelidade",
                product: "Saúde Família",
                premium: 105.60,
                validUntil: "15/11/2025",
                status: "active"
            },
            {
                id: "POL-008",
                client: "Sofia Oliveira",
                type: "life",
                company: "Allianz",
                product: "Vida Completo",
                premium: 62.40,
                validUntil: "30/09/2025",
                status: "active"
            },
            {
                id: "POL-009",
                client: "Miguel Costa",
                type: "life",
                company: "Fidelidade",
                product: "Vida Empresário",
                premium: 95.70,
                validUntil: "12/10/2025",
                status: "active"
            },
            {
                id: "POL-010",
                client: "Miguel Costa",
                type: "health",
                company: "Tranquilidade",
                product: "Saúde Total",
                premium: 115.30,
                validUntil: "05/12/2025",
                status: "active"
            }
        ];
    },
    
    // Get sample simulations for the platform
    getSampleSimulations: function() {
        return [
            {
                id: "SIM-001",
                client: "João Silva",
                date: "09/04/2025",
                type: "life",
                bestOffer: "Fidelidade",
                premium: 45.20,
                status: "completed"
            },
            {
                id: "SIM-002",
                client: "Maria Santos",
                date: "08/04/2025",
                type: "health",
                bestOffer: "Ageas",
                premium: 78.50,
                status: "completed"
            },
            {
                id: "SIM-003",
                client: "António Ferreira",
                date: "07/04/2025",
                type: "travel",
                bestOffer: "Generali",
                premium: 32.75,
                status: "completed"
            },
            {
                id: "SIM-004",
                client: "Sofia Oliveira",
                date: "05/04/2025",
                type: "health",
                bestOffer: "Fidelidade",
                premium: 85.40,
                status: "pending"
            },
            {
                id: "SIM-005",
                client: "Miguel Costa",
                date: "03/04/2025",
                type: "life",
                bestOffer: "Allianz",
                premium: 68.90,
                status: "completed"
            },
            {
                id: "SIM-006",
                client: "Ana Rodrigues",
                date: "01/04/2025",
                type: "travel",
                bestOffer: "Tranquilidade",
                premium: 29.80,
                status: "completed"
            },
            {
                id: "SIM-007",
                client: "Pedro Almeida",
                date: "30/03/2025",
                type: "health",
                bestOffer: "Generali",
                premium: 82.60,
                status: "completed"
            },
            {
                id: "SIM-008",
                client: "Inês Martins",
                date: "28/03/2025",
                type: "life",
                bestOffer: "Fidelidade",
                premium: 55.30,
                status: "completed"
            }
        ];
    },
    
    // Get dashboard statistics
    getDashboardStats: function() {
        return {
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
                { type: "Viagem", quantity: 52, percentage: 25 },
                { type: "Automóvel", quantity: 52, percentage: 25 }
            ]
        };
    }
};
