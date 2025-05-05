'use client';

import { useEffect, useState } from 'react';
import Papa from 'papaparse';
import styles from './history.module.css';

type Simulation = {
  id: string;
  nome: string;
  data: string;
  tipo_seguro: string;
  seguradora: string;
  valor: number;
  estado: string;
};

export default function HistoryPage() {
  const [simulations, setSimulations] = useState<Simulation[]>([]);
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

        // Create simulation history from the CSV data
        const simulationsList = (parsed.data as CsvRow[]).map((row: CsvRow) => ({
          id: row.id,
          nome: row.nome,
          data: row.data || new Date().toLocaleDateString('pt-PT'), // Using current date if not in CSV
          tipo_seguro: row.tipo_seguro,
          seguradora: row.seguradora,
          valor: parseFloat(row['valor (€)']),
          estado: row.estado,
        }));

        setSimulations(simulationsList);
      });
  }, []);

  const filteredSimulations = simulations.filter(simulation => {
    const matchesSearch = simulation.nome.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         simulation.id.includes(searchTerm);
    
    const matchesStatus = statusFilter === 'all' || 
                         simulation.estado === statusFilter;
    
    const matchesType = typeFilter === 'all' || 
                       simulation.tipo_seguro === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <div className={styles.contentSection}>
      <div className={styles.contentHeader}>
        <h2>Histórico de Simulações</h2>
        <div className={styles.headerActions}>
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
                    id="simulation-search" 
                    className={styles.formControl} 
                    placeholder="Pesquisar por nome ou ID..."
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
                    id="simulation-status-filter"
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
                    id="simulation-type-filter"
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
                  <th>ID</th>
                  <th>Cliente</th>
                  <th>Data</th>
                  <th>Tipo de Seguro</th>
                  <th>Melhor Oferta</th>
                  <th>Prémio</th>
                  <th>Estado</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredSimulations.map((simulation, index) => (
                  <tr key={`${simulation.id}-${index}`}>
                    <td>{simulation.id}</td>
                    <td>{simulation.nome}</td>
                    <td>{simulation.data}</td>
                    <td>{simulation.tipo_seguro}</td>
                    <td>{simulation.seguradora}</td>
                    <td>{simulation.valor}€</td>
                    <td>
                      <span className={`${styles.statusBadge} ${simulation.estado === 'ativo' ? styles.statusActive : styles.statusInactive}`}>
                        {simulation.estado === 'ativo' ? 'Ativo' : 'Inativo'}
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
  data?: string; // Optional as it might not be present
  tipo_seguro: string;
  seguradora: string;
  'valor (€)': string; // CSV header uses this format
  estado: string;
  // Add other potential fields from CSV if needed
  [key: string]: unknown; // Allow for other potential columns, use unknown instead of any
}

