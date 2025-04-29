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

            {/* Habitação */}
            <div className={`${styles.sectionTitle} mt-10`}>
              <h4>Habitação</h4>
            </div>
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label htmlFor="housing-type">Tipo de Habitação</label>
                <select id="housing-type" defaultValue="">
                  <option value="" disabled>Selecionar...</option>
                  <option value="rented">Arrendada</option>
                  <option value="owned">Própria</option>
                </select>
              </div>
            </div>

            {/* Informação Familiar */}
            <div className={`${styles.sectionTitle} mt-10`}>
              <h4>Informação Familiar</h4>
            </div>
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label htmlFor="marital-status">Estado Civil</label>
                <select id="marital-status" defaultValue="">
                  <option value="" disabled>Selecionar...</option>
                  <option value="single">Solteiro(a)</option>
                  <option value="married">Casado(a)</option>
                  <option value="divorced">Divorciado(a)</option>
                  <option value="widowed">Viúvo(a)</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="children">Número de Filhos</label>
                <input type="number" id="children" defaultValue={0} min={0} />
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
