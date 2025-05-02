'use client'
import { useRef, useState } from 'react'
import styles from '../form.module.css'
import { InsuranceCard } from '@/app/(seguros)/components/InsuranceOfferCards/InsuranceCard'
import { insuranceCompanies } from '@/app/(seguros)/data/insurance/companies'
import { calculatePremium } from '@/app/(seguros)/utils/insurance-calculations'

interface ClientData {
  name: string;
  age: number;
  gender: string;
  occupation: string;
  income: number;
  children: number;
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
    return insuranceCompanies.health.map(company => {
      const product = company.products[0];
      const premium = calculatePremium(product.basePremium, clientData, 'health');

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
        children: parseInt(formData.get('children') as string) || 0,
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
        <h2>Formulário de Simulação de Seguro de Saúde</h2>
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
                <input type="text" name="name" id="name" placeholder="Nome completo" required />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="age">Idade</label>
                <input type="number" name="age" id="age" placeholder="Idade" required />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="gender">Género</label>
                <select name="gender" id="gender" defaultValue="" required>
                  <option value="" disabled>Selecionar...</option>
                  <option value="male">Masculino</option>
                  <option value="female">Feminino</option>
                  <option value="other">Outro</option>
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
                <select name="marital-status" id="marital-status" defaultValue="" required>
                  <option value="" disabled>Selecionar...</option>
                  <option value="single">Solteiro(a)</option>
                  <option value="married">Casado(a)</option>
                  <option value="divorced">Divorciado(a)</option>
                  <option value="widowed">Viúvo(a)</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="children">Número de Filhos</label>
                <input type="number" name="children" id="children" defaultValue={0} min={0} />
              </div>
            </div>

            {/* Informação Profissional */}
            <div className={`${styles.sectionTitle} mt-10`}>
              <h4>Informação Profissional</h4>
            </div>
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label htmlFor="occupation">Ocupação Profissional</label>
                <input type="text" name="occupation" id="occupation" placeholder="Ocupação" required />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="income">Rendimento Anual Estimado (€)</label>
                <input type="number" name="income" id="income" placeholder="Rendimento anual" required />
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
            <h2>Ofertas de Seguros de Saúde</h2>
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
