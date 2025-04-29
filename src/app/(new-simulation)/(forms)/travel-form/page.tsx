'use client'
import { useRef, useState } from 'react'
import styles from '../form.module.css'

export default function ChooseInsurance() {
  const formRef = useRef<HTMLFormElement>(null)
  const [showOffers, setShowOffers] = useState(false)
  const [clientName, setClientName] = useState('')

  const handleReset = () => {
    if (formRef.current) {
      formRef.current.reset()
    }
    setShowOffers(false)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (formRef.current) {
      const formData = new FormData(formRef.current)
      const name = formData.get('name') as string
      setClientName(name)
      setShowOffers(true)
    }
  }

  return (
    <div className="page-content">
      <div className="page-header">
        <h2>Formulário de Simulação de Seguro de Viagem</h2>
      </div>

      <div className={styles.card}>
        <div className={styles.cardBody}>
          <form ref={formRef} id="client-data-form" onSubmit={handleSubmit}>
            {/* Informação Pessoal */}
            <div className={styles.sectionTitle}>
              <h4>Informação Pessoal</h4>
            </div>
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label htmlFor="name">Nome Completo</label>
                <input type="text" name="name" id="name" placeholder="Nome completo" />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="age">Idade</label>
                <input type="number" name="age" id="age" placeholder="Idade" />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="gender">Género</label>
                <select name="gender" id="gender" defaultValue="">
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
                <input type="text" name="occupation" id="occupation" placeholder="Ocupação" />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="income">Rendimento Anual Estimado (€)</label>
                <input type="number" name="income" id="income" placeholder="Rendimento anual" />
              </div>
            </div>

            {/* Informação de Viagem */}
            <div className={`${styles.sectionTitle} mt-10`}>
              <h4>Informação de Viagem</h4>
            </div>
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label htmlFor="destination">Destino</label>
                <input type="text" name="destination" id="destination" placeholder="Destino da viagem" />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="duration">Duração (dias)</label>
                <input type="number" name="duration" id="duration" placeholder="Duração da viagem" min={1} />
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

      {/* Insurance Offers Section */}
      {showOffers && (
        <div className="mt-10">
          <div className="page-header">
            <h2>Ofertas de Seguros</h2>
            <p>Cliente: <strong>{clientName}</strong></p>
          </div>

          <div className="card">
            <div className="card-body">
              {/* Example offers */}
              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div className="border rounded-xl p-4 shadow">
                  <h4 className="mb-2">Seguro Viagem Básico</h4>
                  <p>Cobertura médica, cancelamento e bagagem</p>
                  <p><strong>€45</strong></p>
                </div>
                <div className="border rounded-xl p-4 shadow">
                  <h4 className="mb-2">Seguro Viagem Premium</h4>
                  <p>Inclui tudo do básico + assistência 24h e cobertura COVID-19</p>
                  <p><strong>€75</strong></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
