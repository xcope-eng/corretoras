'use client';

import { useEffect, useState } from 'react';
import Papa from 'papaparse';
import styles from './clients.module.css';

type Policy = {
  tipo_seguro: string;
  seguradora: string;
  valor: number;
  validade: string;
  estado: string;
};

type Client = {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  politicas: Policy[];
};

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
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

        const clientMap: Record<string, Client> = {};

        parsed.data.forEach((row: any) => {
          const id = row.id;
          if (!clientMap[id]) {
            clientMap[id] = {
              id,
              nome: row.nome,
              email: row.email,
              telefone: row.telefone,
              politicas: [],
            };
          }

          clientMap[id].politicas.push({
            tipo_seguro: row.tipo_seguro,
            seguradora: row.seguradora,
            valor: parseFloat(row['valor (€)']),
            validade: row.validade,
            estado: row.estado,
          });
        });

        setClients(Object.values(clientMap));
      });
  }, []);

  const filteredClients = clients.filter(client => {
    const matchesSearch = client.nome.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         client.id.includes(searchTerm);
    
    const matchesStatus = statusFilter === 'all' || 
                         client.politicas[0].estado === statusFilter;
    
    const matchesType = typeFilter === 'all' || 
                       client.politicas.some(p => p.tipo_seguro === typeFilter);

    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <div className="page-content">
      <div className={styles.contentHeader}>
        <h2>Clientes</h2>
        <div className={styles.headerActions}>
          <button className="btn btn-primary flex items-center gap-2">
            <i className="bi bi-plus-circle"></i> Novo Cliente
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
                    id="client-search" 
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
                    id="client-status-filter"
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
                    id="client-type-filter"
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
                  <th className="text-sm font-semibold text-gray-600">Cliente</th>
                  <th className="text-sm font-semibold text-gray-600">NIF</th>
                  <th className="text-sm font-semibold text-gray-600">Contacto</th>
                  <th className="text-sm font-semibold text-gray-600">Idade</th>
                  <th className="text-sm font-semibold text-gray-600">Ocupação</th>
                  <th className="text-sm font-semibold text-gray-600">Apólices</th>
                  <th className="text-sm font-semibold text-gray-600">Estado</th>
                  <th className="text-sm font-semibold text-gray-600">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredClients.map((client) => (
                  <tr key={client.id}>
                    <td>{client.nome}</td>
                    <td>{client.id}</td>
                    <td>{client.telefone}</td>
                    <td>-</td>
                    <td>-</td>
                    <td>{client.politicas.length}</td>
                    <td>
                      <span className={`${styles.statusBadge} ${client.politicas[0].estado === 'ativo' ? styles.statusActive : styles.statusInactive}`}>
                        {client.politicas[0].estado === 'ativo' ? 'Ativo' : 'Inativo'}
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
