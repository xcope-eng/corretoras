'use client';

import React, { useState } from 'react'; // Removed unused useEffect
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from 'chart.js';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import styles from './performance.module.css';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

const PerformancePage = () => {
  // Removed unused setMetrics, kept metrics state
  const [metrics] = useState({
    overallConversionRate: 32.5,
    totalSuggestions: 450,
    acceptedSuggestions: 146,
    rejectedSuggestions: 304,
  });

  // Chart data
  const acceptanceRateData = {
    labels: ['Aceites', 'Rejeitadas'],
    datasets: [
      {
        data: [metrics.acceptedSuggestions, metrics.rejectedSuggestions],
        backgroundColor: ['#10b981', '#ef4444'],
        borderColor: ['#059669', '#dc2626'],
        borderWidth: 1,
      },
    ],
  };

  const acceptanceByTypeData = {
    labels: ['Vida', 'Saúde', 'Auto', 'Casa', 'Viagem'],
    datasets: [
      {
        label: 'Taxa de Aceitação (%)',
        data: [45, 38, 32, 28, 25],
        backgroundColor: '#4f46e5',
        borderColor: '#4338ca',
        borderWidth: 1,
      },
    ],
  };

  const agentPerformanceData = {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
    datasets: [
      {
        label: 'Taxa de Conversão (%)',
        data: [28, 32, 36, 30, 34, 38],
        borderColor: '#10b981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const suggestionFrequencyData = {
    labels: ['Vida', 'Saúde', 'Auto', 'Casa', 'Viagem'],
    datasets: [
      {
        label: 'Número de Sugestões',
        data: [120, 95, 85, 75, 65],
        backgroundColor: [
          '#4f46e5',
          '#10b981',
          '#f59e0b',
          '#ef4444',
          '#8b5cf6',
        ],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
    },
  };

  return (
    <div className="page-content">
      <div className="page-header">
        <h2>Análise de Desempenho</h2>
      </div>

      <section className={styles.performanceMetricsGrid}>
        <div className={styles.metricCard}>
          <h4>Taxa Conversão Geral</h4>
          <p>{metrics.overallConversionRate}%</p>
        </div>
        <div className={styles.metricCard}>
          <h4>Sugestões Totais</h4>
          <p>{metrics.totalSuggestions}</p>
        </div>
        <div className={styles.metricCard}>
          <h4>Sugestões Aceites</h4>
          <p>{metrics.acceptedSuggestions}</p>
        </div>
        <div className={styles.metricCard}>
          <h4>Sugestões Rejeitadas</h4>
          <p>{metrics.rejectedSuggestions}</p>
        </div>
      </section>

      <section className={styles.performanceChartsGrid}>
        <div className={styles.chartContainer}>
          <h3>Aceitação Geral (Sugestões)</h3>
          <Doughnut data={acceptanceRateData} options={chartOptions} />
        </div>
        <div className={styles.chartContainer}>
          <h3>Aceitação por Tipo de Seguro</h3>
          <Bar data={acceptanceByTypeData} options={chartOptions} />
        </div>
        <div className={styles.chartContainer}>
          <h3>Desempenho por Agente (Simulado)</h3>
          <Line data={agentPerformanceData} options={chartOptions} />
        </div>
        <div className={styles.chartContainer}>
          <h3>Frequência de Sugestões por Produto</h3>
          <Bar data={suggestionFrequencyData} options={chartOptions} />
        </div>
      </section>
    </div>
  );
};

export default PerformancePage;
