'use client';

import { useEffect, useState } from 'react';
import Papa from 'papaparse';
import styles from './auto-insurance.module.css';

type AutoPolicy = {
  id: string;
  nome: string;
  viatura: string;
  matricula: string;
  seguradora: string;
  valor: number;
  validade: string;
  estado: string;
};

export default function AutoInsurancePage() {
  const [policies, setPolicies] = useState<AutoPolicy[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    fetch('/clientes_seguros.csv')
      .then((response) => response.text())
      .then((csvText) => {
        const parsed = Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
        });

        // Filter only auto insurance policies and map to the required format
        const autoPoliciesList = (parsed.data as CsvRow[])
          .filter((row: CsvRow) => row.tipo_seguro === 'Automóvel')
          .map((row: CsvRow) => ({
            id: row.id,
            nome: row.nome,
            viatura: row.viatura || '-', // Using placeholder if not in CSV
            matricula: row.matricula || '-', // Using placeholder if not in CSV
            seguradora: row.seguradora,
            valor: parseFloat(row['valor (€)']),
            validade: row.validade,
            estado: row.estado,
          }));

        setPolicies(autoPoliciesList);
      });
  }, []);

  const filteredPolicies = policies.filter(policy => {
    const matchesSearch = policy.nome.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         policy.id.includes(searchTerm) ||
                         policy.matricula.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || 
                         policy.estado === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className={styles.contentSection}>
      <div className={styles.contentHeader}>
        <h2>Seguro Automóvel</h2>
        <div className={styles.headerActions}>
          <button className="btn btn-primary flex items-center gap-2">
            <i className="bi bi-plus-circle"></i> Nova Simulação
          </button>
          <button className="btn btn-outline-primary flex items-center gap-2">
            <i className="bi bi-download"></i> Exportar
          </button>
        </div>
      </div>
      
      <div className={styles.card}>
        <div className={styles.cardBody}>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-4">
              <div className={styles.searchContainer}>
                <div className={styles.inputGroup}>
                  <input 
                    type="text" 
                    id="auto-policy-search" 
                    className={styles.formControl} 
                    placeholder="Pesquisar por nome, NIF ou matrícula..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <button className="btn btn-outline-primary" type="button">
                    <i className="bi bi-search"></i>
                  </button>
                </div>
              </div>
            </div>
            <div className="md:col-span-8">
              <div className="flex justify-end">
                <div className={styles.filterContainer}>
                  <select 
                    className={styles.formSelect} 
                    id="auto-policy-status-filter"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    <option value="all">Todos os estados</option>
                    <option value="ativo">Ativos</option>
                    <option value="inativo">Inativos</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className={styles.card}>
        <div className={styles.cardBody}>
          <div className="overflow-x-auto">
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Cliente</th>
                  <th>Viatura</th>
                  <th>Matrícula</th>
                  <th>Seguradora</th>
                  <th>Prémio</th>
                  <th>Validade</th>
                  <th>Estado</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredPolicies.map((policy, index) => (
                  <tr key={`${policy.id}-${index}`}>
                    <td>{policy.nome}</td>
                    <td>{policy.viatura}</td>
                    <td>{policy.matricula}</td>
                    <td>{policy.seguradora}</td>
                    <td>{policy.valor}€/mês</td>
                    <td>{policy.validade}</td>
                    <td>
                      <span className={`${styles.statusBadge} ${policy.estado === 'ativo' ? styles.statusActive : styles.statusInactive}`}>
                        {policy.estado === 'ativo' ? 'Ativo' : 'Inativo'}
                      </span>
                    </td>
                    <td>
                      <button className="btn btn-sm btn-outline-secondary">
                        <i className="bi bi-eye"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
} 

// Define a type for the parsed CSV row
interface CsvRow {
  id: string;
  nome: string;
  tipo_seguro: string;
  viatura?: string; // Optional as it might not be present for all insurance types
  matricula?: string; // Optional
  seguradora: string;
  'valor (€)': string; // CSV header uses this format
  validade: string;
  estado: string;
  // Add other potential fields from CSV if needed
  [key: string]: unknown; // Allow for other potential columns, use unknown instead of any
}

