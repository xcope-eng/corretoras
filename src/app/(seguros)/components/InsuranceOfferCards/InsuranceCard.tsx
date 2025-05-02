// src/components/InsuranceCard.tsx
import styles from '../../seguros/(new-simulation)/(forms)/form.module.css'

interface InsuranceOffer {
    company: string;
    companyId: string;
    logoPath: string;
    product: string;
    premium: number;
    coverages: string[];
    description: string;
    contactLink: string;
  }
  
  export const InsuranceCard = ({ offer }: { offer: InsuranceOffer }) => {
    return (
      <div className={styles.offerCard}>
        <div className={styles.cardHeader}>
          <div className={styles.companyInfo}>
            <div className="d-flex align-items-center">
              <img src={offer.logoPath} alt={`${offer.company} Logo`} className={styles.companyLogo} />
              <span className={styles.companyName}>{offer.company}</span>
            </div>
            <span className={styles.badge}>Recomendado</span>
          </div>
        </div>
        <div className={styles.cardBody}>
          <h5>{offer.product}</h5>
          <p>{offer.description}</p>
          
          <div className={styles.premiumContainer}>
            <div className={styles.premiumValue}>€{offer.premium.toFixed(2)}</div>
            <div className={styles.premiumPeriod}>por mês</div>
          </div>
          
          <div>
            <h6>Coberturas:</h6>
            <ul className={styles.coveragesList}>
              {offer.coverages.map((coverage, index) => (
                <li key={index}>{coverage}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className={styles.cardFooter}>
          <a href={offer.contactLink} className={styles.contactLink}>
            Contactar Seguradora
          </a>
        </div>
      </div>
    );
  };