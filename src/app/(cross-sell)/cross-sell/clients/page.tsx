'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './clients.module.css';
import customersData from '../../data/customers.json';

interface Customer {
  id: number;
  nome_completo: string;
  idade: number;
  genero: string;
  tipo_habitacao: string;
  numero_filhos: number;
  produtos_atuais: string[];
  historico_compras: Array<{
    produto: string;
    data_adesao: string;
    renovacoes: number;
  }>;
  localizacao: string;
  ocupacao: string;
  sugestoes_ia: Array<{
    produto_sugerido: string;
    justificativa: string;
    probabilidade_conversao: number;
  }>;
}

const ClientsPage = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setCustomers(customersData);
  }, []);

  const filteredCustomers = customers.filter(customer => 
    customer.nome_completo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.localizacao.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.id.toString().includes(searchTerm)
  );

  const handleCustomerSelect = (customer: Customer) => {
    setSelectedCustomer(customer);
  };

  return (
    <div className="page-content">
      <div className="page-header">
        <h2>Gestão de Clientes</h2>
      </div>

      <section className={styles.clientManagementSection}>
        <div className={styles.clientListContainer}>
          <h3>Lista de Clientes</h3>
          <input
            type="text"
            className={styles.clientSearch}
            placeholder="Pesquisar cliente..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className={styles.clientList}>
            {filteredCustomers.map(customer => (
              <div
                key={customer.id}
                className={`${styles.clientListItem} ${selectedCustomer?.id === customer.id ? styles.selected : ''}`}
                onClick={() => handleCustomerSelect(customer)}
              >
                <div className={styles.avatarPlaceholder}>
                  <Image
                    src={`https://picsum.photos/seed/${customer.id}/40/40`}
                    alt={customer.nome_completo.charAt(0)}
                    width={40}
                    height={40}
                    unoptimized
                  />
                </div>
                <div className={styles.clientListInfo}>
                  <p><strong>{customer.nome_completo}</strong></p>
                  <p>{customer.idade} anos, {customer.localizacao}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.clientDetailContainer}>
          <h3>Detalhes do Cliente</h3>
          <div className={styles.clientDetailContent}>
            {selectedCustomer ? (
              <>
                <div className={styles.clientDetailHeader}>
                  <div className={`${styles.avatarPlaceholder} ${styles.large}`}>
                    <Image
                      src={`https://picsum.photos/seed/${selectedCustomer.id}/80/80`}
                      alt={selectedCustomer.nome_completo.charAt(0)}
                      width={80}
                      height={80}
                      unoptimized
                    />
                  </div>
                  <div>
                    <h4>{selectedCustomer.nome_completo}</h4>
                    <p>{selectedCustomer.idade} anos, {selectedCustomer.genero}</p>
                    <p>{selectedCustomer.ocupacao}</p>
                    <p>Localização: {selectedCustomer.localizacao}</p>
                  </div>
                </div>
                <div className={styles.clientDetailBody}>
                  <div className={styles.detailSection}>
                    <h5>Informações Adicionais</h5>
                    <p><strong>Tipo de Habitação:</strong> {selectedCustomer.tipo_habitacao}</p>
                    <p><strong>Número de Filhos:</strong> {selectedCustomer.numero_filhos}</p>
                    <p><strong>Veículo (Info Seguro Auto):</strong> {
                      selectedCustomer.produtos_atuais.includes("Automóvel") 
                        ? "Seguro Automóvel ativo (detalhes não disponíveis)"
                        : "Não disponível"
                    }</p>
                  </div>
                  <div className={styles.detailSection}>
                    <h5>Produtos Atuais</h5>
                    <p className={styles.currentProducts}>
                      {selectedCustomer.produtos_atuais.map((produto, index) => (
                        <span key={index}>{produto}</span>
                      ))}
                    </p>
                  </div>
                  <div className={styles.detailSection}>
                    <h5>Histórico (Simplificado)</h5>
                    {selectedCustomer.historico_compras.map((item, index) => (
                      <p key={index}>
                        - {item.produto} (Adesão: {item.data_adesao}, Renovações: {item.renovacoes})
                      </p>
                    ))}
                  </div>
                  <div className={styles.detailSection}>
                    <h5>Sugestões IA Pendentes</h5>
                    {selectedCustomer.sugestoes_ia && selectedCustomer.sugestoes_ia.length > 0 ? (
                      selectedCustomer.sugestoes_ia.map((sug, index) => (
                        <p key={index}>
                          - {sug.produto_sugerido} ({sug.probabilidade_conversao}%) - {sug.justificativa}
                        </p>
                      ))
                    ) : (
                      <p>Nenhuma sugestão pendente.</p>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <p>Selecione um cliente da lista para ver os detalhes.</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ClientsPage;