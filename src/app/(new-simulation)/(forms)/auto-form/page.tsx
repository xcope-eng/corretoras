'use client'
import { useRef } from 'react'
import styles from '../form.module.css'

export default function ChooseInsurance() {
  const formRef = useRef<HTMLFormElement>(null)

  const handleReset = () => {
    if (formRef.current) {
      formRef.current.reset()
    }
  }

  return (
    <div className="page-content">
      <div className="page-header">
        <h2>Formulário de Simulação de Seguro de Viagem</h2>
      </div>

      <div className={styles.card}>
        <div className={styles.cardBody}>
          <form ref={formRef} id="client-data-form">
            
            {/* Informação Pessoal */}
            <div className={styles.sectionTitle}>
              <h4>Informação Pessoal</h4>
            </div>
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label htmlFor="name">Nome Completo</label>
                <input type="text" id="name" placeholder="Nome completo" />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="age">Idade</label>
                <input type="number" id="age" placeholder="Idade" />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="gender">Género</label>
                <select id="gender" defaultValue="">
                  <option value="" disabled>Selecionar...</option>
                  <option value="male">Masculino</option>
                  <option value="female">Feminino</option>
                  <option value="other">Outro</option>
                </select>
              </div>
            </div>

            {/* Informação Profissional */}
            <div className={`${styles.sectionTitle} mt-10`}>
              <h4>Informação Profissional</h4>
            </div>
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label htmlFor="occupation">Ocupação Profissional</label>
                <input type="text" id="occupation" placeholder="Ocupação" />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="income">Rendimento Anual Estimado (€)</label>
                <input type="number" id="income" placeholder="Rendimento anual" />
              </div>
            </div>


            {/* Dados da Viatura */}
            <div className={`${styles.sectionTitle} mt-10`}>
              <h4>Dados da Viatura</h4>
            </div>
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label htmlFor="license-plate">Matrícula</label>
                <input type="text" id="license-plate" placeholder="Ex: AA-00-00" />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="car-brand">Marca</label>
                <input type="text" id="car-brand" placeholder="Marca do veículo" />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="car-model">Modelo</label>
                <input type="text" id="car-model" placeholder="Modelo do veículo" />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="car-year">Ano</label>
                <input type="number" id="car-year" placeholder="Ano do veículo" min={1900} max={2025} />
              </div>
            </div>

            

            {/* Buttons */}
            <div className="d-flex justify-content-end" style={{ gap: '1rem', marginTop: '1.5rem' }}>
              <button type="button" className="btn btn-outline-secondary" onClick={handleReset}>
                Limpar
              </button>
              <button type="submit" className="btn btn-primary">
                Ver Ofertas
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
