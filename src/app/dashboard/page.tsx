import styles from './dashboard.module.css';

export default function Dashboard() {
  return (
    <div className="flex-1">
      <div className={styles.contentSection}>
        <div className={styles.contentHeader}>
          <h2>Simulação de Seguros</h2>
          <div className={styles.headerActions}>
            <button className={`${styles.btn} ${styles.btnPrimary}`}>
              <i className="bi bi-plus-circle"></i>
              Nova Simulação
            </button>
            <button className={`${styles.btn} ${styles.btnOutline}`}>
              <i className="bi bi-download"></i>
              Exportar
            </button>
          </div>
        </div>
        
        <div className={styles.statsRow}>
          <div className={styles.statsCard}>
            <div className={styles.statsIcon} style={{ backgroundColor: 'var(--primary-light)' }}>
              <i className="bi bi-people" style={{ color: 'var(--primary-color)' }}></i>
            </div>
            <div className={styles.statsInfo}>
              <h6>Total de Clientes</h6>
              <div className={styles.statsValue}>127</div>
              <div className={`${styles.statsTrend} ${styles.positive}`}>
                <i className="bi bi-arrow-up"></i>
                12% este mês
              </div>
            </div>
          </div>
          
          <div className={styles.statsCard}>
            <div className={styles.statsIcon} style={{ backgroundColor: 'var(--secondary-light)' }}>
              <i className="bi bi-shield" style={{ color: 'var(--secondary-color)' }}></i>
            </div>
            <div className={styles.statsInfo}>
              <h6>Apólices Ativas</h6>
              <div className={styles.statsValue}>215</div>
              <div className={`${styles.statsTrend} ${styles.positive}`}>
                <i className="bi bi-arrow-up"></i>
                5% este mês
              </div>
            </div>
          </div>
          
          <div className={styles.statsCard}>
            <div className={styles.statsIcon} style={{ backgroundColor: 'var(--accent-light)' }}>
              <i className="bi bi-clock" style={{ color: 'var(--accent-color)' }}></i>
            </div>
            <div className={styles.statsInfo}>
              <h6>Renovações Pendentes</h6>
              <div className={styles.statsValue}>14</div>
              <div className={`${styles.statsTrend} ${styles.negative}`}>
                <i className="bi bi-arrow-down"></i>
                3% este mês
              </div>
            </div>
          </div>
          
          <div className={styles.statsCard}>
            <div className={styles.statsIcon} style={{ backgroundColor: 'var(--primary-light)' }}>
              <i className="bi bi-currency-euro" style={{ color: 'var(--primary-color)' }}></i>
            </div>
            <div className={styles.statsInfo}>
              <h6>Receita Mensal</h6>
              <div className={styles.statsValue}>12.450 €</div>
              <div className={`${styles.statsTrend} ${styles.positive}`}>
                <i className="bi bi-arrow-up"></i>
                8.5% este mês
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className={styles.card}>
            <div className={styles.cardBody}>
              <h5 className={styles.cardTitle}>Seguradoras Mais Populares</h5>
              <div className="overflow-x-auto">
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Seguradora</th>
                      <th>Apólices</th>
                      <th>Percentagem</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <div className="flex items-center">
                          <div className={styles.colorDot} style={{ backgroundColor: '#ED1C24' }}></div>
                          Fidelidade
                        </div>
                      </td>
                      <td>68</td>
                      <td>32%</td>
                    </tr>
                    <tr>
                      <td>
                        <div className="flex items-center">
                          <div className={styles.colorDot} style={{ backgroundColor: '#00A0DF' }}></div>
                          Ageas
                        </div>
                      </td>
                      <td>52</td>
                      <td>24%</td>
                    </tr>
                    <tr>
                      <td>
                        <div className="flex items-center">
                          <div className={styles.colorDot} style={{ backgroundColor: '#E30613' }}></div>
                          Generali
                        </div>
                      </td>
                      <td>43</td>
                      <td>20%</td>
                    </tr>
                    <tr>
                      <td>
                        <div className="flex items-center">
                          <div className={styles.colorDot} style={{ backgroundColor: '#003781' }}></div>
                          Allianz
                        </div>
                      </td>
                      <td>31</td>
                      <td>14%</td>
                    </tr>
                    <tr>
                      <td>
                        <div className="flex items-center">
                          <div className={styles.colorDot} style={{ backgroundColor: '#009A44' }}></div>
                          Tranquilidade
                        </div>
                      </td>
                      <td>21</td>
                      <td>10%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          
          <div className={styles.card}>
            <div className={styles.cardBody}>
              <h5 className={styles.cardTitle}>Distribuição por Tipo de Seguro</h5>
              <div className="overflow-x-auto">
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Tipo</th>
                      <th>Quantidade</th>
                      <th>Percentagem</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <div className="flex items-center">
                          <div className={styles.colorDot} style={{ backgroundColor: '#4f46e5' }}></div>
                          Vida
                        </div>
                      </td>
                      <td>87</td>
                      <td>40%</td>
                    </tr>
                    <tr>
                      <td>
                        <div className="flex items-center">
                          <div className={styles.colorDot} style={{ backgroundColor: '#10b981' }}></div>
                          Saúde
                        </div>
                      </td>
                      <td>76</td>
                      <td>35%</td>
                    </tr>
                    <tr>
                      <td>
                        <div className="flex items-center">
                          <div className={styles.colorDot} style={{ backgroundColor: '#f59e0b' }}></div>
                          Viagem
                        </div>
                      </td>
                      <td>52</td>
                      <td>25%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        
        <div className={styles.card}>
          <div className={styles.cardBody}>
            <div className="flex justify-between items-center mb-4">
              <h5 className={styles.cardTitle}>Simulações Recentes</h5>
              <button className={`${styles.btn} ${styles.btnOutline}`}>
                Ver Todas
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Cliente</th>
                    <th>Data</th>
                    <th>Tipo de Seguro</th>
                    <th>Melhor Oferta</th>
                    <th>Prémio</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>João Silva</td>
                    <td>05/04/2025</td>
                    <td>Vida</td>
                    <td>Fidelidade Vida Mais</td>
                    <td>45.75 €/mês</td>
                    <td>
                      <button className={`${styles.btn} ${styles.btnOutline}`}>
                        Ver
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td>Maria Santos</td>
                    <td>03/04/2025</td>
                    <td>Saúde</td>
                    <td>Ageas Médis Premium</td>
                    <td>78.50 €/mês</td>
                    <td>
                      <button className={`${styles.btn} ${styles.btnOutline}`}>
                        Ver
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td>António Ferreira</td>
                    <td>01/04/2025</td>
                    <td>Viagem</td>
                    <td>Allianz Global Travel</td>
                    <td>32.25 €/mês</td>
                    <td>
                      <button className={`${styles.btn} ${styles.btnOutline}`}>
                        Ver
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 