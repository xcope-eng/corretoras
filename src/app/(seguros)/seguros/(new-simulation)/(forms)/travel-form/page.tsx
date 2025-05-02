'use client'
import { useRef, useState } from 'react'
import styles from '../form.module.css'
import { InsuranceCard } from '@/app/(seguros)/components/InsuranceOfferCards/InsuranceCard'
import { insuranceCompanies } from '@/app/(seguros)/data/insurance/companies'
import { calculatePremium } from '@/app/(seguros)/utils/insurance-calculations'

// Add the necessary types
interface ClientData {
  name: string;
  age: number;
  gender: string;
  occupation: string;
  income: number;
  destination: string;
  duration: number;
}

export default function ChooseInsurance() {
  const formRef = useRef<HTMLFormElement>(null)
  const [showOffers, setShowOffers] = useState(false)
  const [clientName, setClientName] = useState('')
  const [insuranceOffers, setInsuranceOffers] = useState<any[]>([])

  const handleReset = () => {
    if (formRef.current) {
      formRef.current.reset()
    }
    setShowOffers(false)
    setInsuranceOffers([])
  }

  const generateOffers = (clientData: ClientData) => {
    return insuranceCompanies.travel.map(company => {
      const product = company.products[0];
      const premium = calculatePremium(product.basePremium, clientData, 'travel');

      return {
        company: company.name,
        companyId: company.id,
        logoPath: company.logoPath,
        product: product.name,
        premium,
        coverages: product.coverages,
        description: product.description,
        contactLink: `#contact-${company.id}`
      };
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (formRef.current) {
      const formData = new FormData(formRef.current)
      const clientData: ClientData = {
        name: formData.get('name') as string,
        age: parseInt(formData.get('age') as string),
        gender: formData.get('gender') as string,
        occupation: formData.get('occupation') as string,
        income: parseInt(formData.get('income') as string),
        destination: formData.get('destination') as string,
        duration: parseInt(formData.get('duration') as string),
      }

      setClientName(clientData.name)
      const offers = generateOffers(clientData);
      setInsuranceOffers(offers)
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

          <div className={styles.card}>
            <div className={styles.cardBody}>
              <div className={styles.formGrid}>
                {insuranceOffers.map((offer, index) => (
                  <InsuranceCard key={index} offer={offer} />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      
    </div>
  )
}
