'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './dashboard.module.css';
import { FaUsers, FaLightbulb, FaCheckCircle, FaChartLine, FaSyncAlt } from 'react-icons/fa';
import customersData from '../../data/customers.json';

interface Customer {
  id: number;
  nome_completo: string;
  produtos_atuais: string[];
  sugestoes_ia: Array<{
    produto_sugerido: string;
    justificativa: string;
    probabilidade_conversao: number;
    status?: string;
  }>;
  ocupacao: string;
}

const DashboardPage = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [metrics, setMetrics] = useState({
    totalClients: 0,
    suggestionsGenerated: 0,
    conversionRate: 0,
    monthlyGrowth: 5.2 // Example static value, replace with real data
  });

  useEffect(() => {
    // Load and process customer data
    const loadCustomerData = () => {
      setCustomers(customersData);
      
      // Calculate metrics
      const totalClients = customersData.length;
      const clientsWithSuggestions = customersData.filter(
        customer => customer.sugestoes_ia && customer.sugestoes_ia.length > 0
      ).length;
      const totalSuggestions = customersData.reduce(
        (acc, customer) => acc + (customer.sugestoes_ia?.length || 0), 
        0
      );
      
      setMetrics({
        totalClients,
        suggestionsGenerated: totalSuggestions,
        conversionRate: (clientsWithSuggestions / totalClients) * 100,
        monthlyGrowth: 5.2 // Example static value
      });
    };

    loadCustomerData();
  }, []);

  const handleUpdateSuggestions = () => {
    // Implement suggestion update logic here
    console.log('Updating suggestions...');
  };

  const handleRecommendationAction = (
    customerId: number,
    suggestionIndex: number,
    isAccept: boolean
  ) => {
    // Update the customers state to reflect the action
    setCustomers(prevCustomers => {
      return prevCustomers.map(customer => {
        if (customer.id === customerId) {
          // Create a deep copy of the customer's suggestions
          const updatedSuggestions = customer.sugestoes_ia.map((suggestion, index) => {
            if (index === suggestionIndex) {
              return {
                ...suggestion,
                status: isAccept ? 'accepted' : 'rejected'
              };
            }
            return suggestion;
          });

          return {
            ...customer,
            sugestoes_ia: updatedSuggestions
          };
        }
        return customer;
      });
    });

    // Show feedback to the user
    alert(`Sugestão ${isAccept ? 'aceite' : 'rejeitada'} com sucesso.`);
    
    // In a real application, you would make an API call here to persist the change
    console.log(`Action: ${isAccept ? 'Accept' : 'Reject'} for Client ID: ${customerId}, Suggestion Index: ${suggestionIndex}`);
  };

  return (
    <div className="page-content">
      <div className="page-header">
        <h2>Dashboard</h2>
      </div>

      <section className={styles.summaryCards}>
        <div className={styles.summaryCard}>
          <div className={styles.icon}>
            <FaUsers />
          </div>
          <div>
            <p>Total de Clientes</p>
            <h3>{metrics.totalClients}</h3>
          </div>
        </div>
        <div className={styles.summaryCard}>
          <div className={styles.icon}>
            <FaLightbulb />
          </div>
          <div>
            <p>Sugestões Geradas</p>
            <h3>{metrics.suggestionsGenerated}</h3>
          </div>
        </div>
        <div className={styles.summaryCard}>
          <div className={styles.icon}>
            <FaCheckCircle />
          </div>
          <div>
            <p>Taxa de Conversão</p>
            <h3>{metrics.conversionRate.toFixed(1)}%</h3>
          </div>
        </div>
        <div className={styles.summaryCard}>
          <div className={styles.icon}>
            <FaChartLine />
          </div>
          <div>
            <p>Crescimento Mensal</p>
            <h3>+{metrics.monthlyGrowth}%</h3>
          </div>
        </div>
      </section>

      <section className={styles.recommendationsSection}>
        <div className={styles.sectionHeader}>
          <h2>Clientes com Recomendações</h2>
          <button 
            className="btn btn-primary flex items-center gap-2"
            onClick={handleUpdateSuggestions}
          >
            <FaSyncAlt /> Atualizar Sugestões
          </button>
        </div>
        <div className={styles.recommendationsContainer}>
          {customers
            .filter(customer => customer.sugestoes_ia && customer.sugestoes_ia.length > 0)
            .map(customer => (
              <div key={customer.id} className={styles.clientRecCard}>
                <div className={styles.clientInfo}>
                  <div className={styles.avatarPlaceholder}>
                    <Image 
                      src={`https://picsum.photos/seed/${customer.id}/50/50`}
                      alt={customer.nome_completo.charAt(0)}
                      width={50}
                      height={50}
                      style={{ borderRadius: '50%' }}
                      unoptimized
                    />
                  </div>
                  <div className={styles.clientDetails}>
                    <h4>{customer.nome_completo}</h4>
                    <p>{customer.ocupacao}</p>
                    <div className={styles.currentProducts}>
                      {customer.produtos_atuais.map((product, index) => (
                        <span key={index}>{product}</span>
                      ))}
                    </div>
                  </div>
                  <div className={styles.clientActions}>
                    <button className={styles.viewBtn}>
                      <i className="fas fa-eye"></i>
                    </button>
                  </div>
                </div>
                <div className={styles.recommendationsList}>
                  <h5>Recomendações</h5>
                  {customer.sugestoes_ia.map((suggestion, index) => (
                    <div 
                      key={index} 
                      className={`${styles.recommendationItem} ${suggestion.status ? styles[suggestion.status] : ''}`}
                    >
                      <div className={styles.recommendationHeader}>
                        <strong>{suggestion.produto_sugerido}</strong>
                        <span className={styles.recommendationScore}>
                          {suggestion.probabilidade_conversao}%
                        </span>
                      </div>
                      <p>{suggestion.justificativa}</p>
                      {!suggestion.status && (
                        <div className={styles.recommendationButtons}>
                          <button 
                            className={styles.acceptBtn}
                            onClick={() => handleRecommendationAction(customer.id, index, true)}
                          >
                            Aceitar
                          </button>
                          <button 
                            className={styles.rejectBtn}
                            onClick={() => handleRecommendationAction(customer.id, index, false)}
                          >
                            Rejeitar
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
        </div>
      </section>
    </div>
  );
};

export default DashboardPage;