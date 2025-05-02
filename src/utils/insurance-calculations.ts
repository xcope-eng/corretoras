export type InsuranceType = 'travel' | 'life' | 'health' | 'auto';

interface ClientData {
  name: string;
  age: number;
  gender: string;
  occupation: string;
  income: number;
  destination?: string;
  duration?: number;
  children?: number;
  vehicle?: {
    year: number;
  };
}

export function calculatePremium(basePremium: number, clientData: ClientData, type: InsuranceType): number {
  let multiplier = 1;

  switch (type) {
    case 'auto':
      // Age factor
      if (clientData.age < 25) {
        multiplier *= 1.3; // Higher risk for young drivers
      } else if (clientData.age > 65) {
        multiplier *= 1.2; // Slightly higher risk for elderly drivers
      }

      // Vehicle age factor
      if (clientData.vehicle) {
        const vehicleAge = new Date().getFullYear() - clientData.vehicle.year;
        if (vehicleAge > 10) {
          multiplier *= 1.15; // Older vehicles have higher risk
        } else if (vehicleAge < 3) {
          multiplier *= 0.9; // Newer vehicles have lower risk
        }
      }

      // Income factor (assuming higher income means better maintained vehicle)
      if (clientData.income) {
        if (clientData.income > 50000) {
          multiplier *= 0.95;
        } else if (clientData.income < 20000) {
          multiplier *= 1.1;
        }
      }
      break;

    case 'travel':
      // Age factor
      if (clientData.age) {
        multiplier += (clientData.age - 30) * 0.5;
      }

      // Income factor
      if (clientData.income) {
        const incomeInThousands = clientData.income / 1000;
        multiplier += incomeInThousands * 0.05;
      }

      // Children factor
      if (clientData.children && clientData.children > 0) {
        multiplier += clientData.children * 3;
      }

      // Travel specific factors
      if (clientData.duration) {
        multiplier += clientData.duration * 0.5;
      }

      if (clientData.destination) {
        const expensiveDestinations = ['Estados Unidos', 'Japão', 'Austrália', 'Canadá', 'Suíça'];
        if (expensiveDestinations.some(dest => clientData.destination?.includes(dest))) {
          multiplier *= 1.3;
        }
      }
      break;

    case 'life':
      // Age factor
      if (clientData.age) {
        multiplier += (clientData.age - 30) * 0.5;
      }

      // Income factor
      if (clientData.income) {
        const incomeInThousands = clientData.income / 1000;
        multiplier += incomeInThousands * 0.05;
      }

      // Children factor
      if (clientData.children && clientData.children > 0) {
        multiplier += clientData.children * 3;
      }
      break;

    case 'health':
      // Age factor
      if (clientData.age) {
        multiplier += (clientData.age - 30) * 0.7;
      }

      // Income factor
      if (clientData.income) {
        const incomeInThousands = clientData.income / 1000;
        multiplier += incomeInThousands * 0.03;
      }

      // Children factor
      if (clientData.children && clientData.children > 0) {
        multiplier += clientData.children * 5;
      }
      break;
  }

  return Math.round(basePremium * multiplier);
} 