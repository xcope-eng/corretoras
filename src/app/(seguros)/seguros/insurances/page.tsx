'use client';

import { useEffect, useState } from 'react';
import Papa from 'papaparse';
import styles from './insurances.module.css';

type Policy = {
  id: string;
  nome: string;
  tipo_seguro: string;
  seguradora: string;
  valor: number;
  validade: string;
  estado: string;
};

export default function InsurancesPage() {
  const [policies, setPolicies] = useState<Policy[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  useEffect(() => {
    fetch('/clientes_seguros.csv')
      .then((response) => response.text())
      .then((csvText) => {
        const parsed = Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
        });

        const policiesList = (parsed.data as CsvRow[]).map((row: CsvRow) => ({
          id: row.id,
          nome: row.nome,
          tipo_seguro: row.tipo_seguro,
          seguradora: row.seguradora,
          valor: parseFloat(row['valor (€)']),
          validade: row.validade,
          estado: row.estado,
        }));

        setPolicies(policiesList);
      });
  }, []);

  const filteredPolicies = policies.filter(policy => {
    const matchesSearch = policy.nome.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         policy.id.includes(searchTerm);
    
    const matchesStatus = statusFilter === 'all' || 
                         policy.estado === statusFilter;
    
    const matchesType = typeFilter === 'all' || 
                       policy.tipo_seguro === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <div className="page-content">
      <div className="page-header">
        <h2>Seguros</h2>
        <div className="header-actions">
          <button className="btn btn-primary flex items-center gap-2">
            <i className="bi bi-plus-circle"></i> Nova Apólice
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
                    id="policy-search" 
                    className={styles.formControl} 
                    placeholder="Pesquisar por nome ou NIF..."
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
                    id="policy-status-filter"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    <option value="all">Todos os estados</option>
                    <option value="ativo">Ativos</option>
                    <option value="inativo">Inativos</option>
                  </select>
                </div>
                <div className={styles.filterContainer}>
                  <select 
                    className={styles.formSelect} 
                    id="policy-type-filter"
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                  >
                    <option value="all">Todos os tipos</option>
                    <option value="Vida">Vida</option>
                    <option value="Saúde">Saúde</option>
                    <option value="Automóvel">Automóvel</option>
                    <option value="Viagem">Viagem</option>
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
                  <th>Tipo</th>
                  <th>Seguradora</th>
                  <th>Produto</th>
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
                    <td>{policy.tipo_seguro}</td>
                    <td>{policy.seguradora}</td>
                    <td>-</td>
                    <td>{policy.valor}€</td>
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
  seguradora: string;
  'valor (€)': string; // CSV header uses this format
  validade: string;
  estado: string;
  // Add other potential fields from CSV if needed
  [key: string]: unknown; // Allow for other potential columns, use unknown instead of any
}

