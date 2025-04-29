import styles from './insurance-type.module.css'
import Link from 'next/link'

export default function ChooseInsurance() {
  return (
    <div className="page-content">
        <div className="page-header">
            <h2>Escolha o Tipo de Seguro</h2>
        </div>
        
        <div className={`row mt-4 ${styles.insuranceTypesGrid}`}>
            <div className="col-md-3 mb-4">
                <Link href="/travel-form" className="no-underline">
                    <div className={styles.insuranceTypeCard} data-insurance-type="travel">
                        <div className={styles.iconContainer}>
                            <i className="bi bi-airplane"></i>
                        </div>
                        <div className={styles.typeInfo}>
                            <h3>Seguro Viagem</h3>
                        </div>
                    </div>
                </Link>
            </div>
            
            <div className="col-md-3 mb-4">
                <Link href="/life-form" className="no-underline">
                    <div className={styles.insuranceTypeCard} data-insurance-type="life">
                        <div className={styles.iconContainer}>
                            <i className="bi bi-heart"></i>
                        </div>
                        <div className={styles.typeInfo}>
                            <h3>Seguro Vida</h3>
                        </div>
                    </div>
                </Link>
            </div>
            
            <div className="col-md-3 mb-4">
                <Link href="/auto-form" className="no-underline">
                    <div className={styles.insuranceTypeCard} data-insurance-type="auto">
                        <div className={styles.iconContainer}>
                            <i className="bi bi-car-front"></i>
                        </div>
                        <div className={styles.typeInfo}>
                            <h3>Seguro Automóvel</h3>
                        </div>
                    </div>
                </Link>
            </div>
            
            <div className="col-md-3 mb-4">
                <Link href="/health-form" className="no-underline">
                    <div className={styles.insuranceTypeCard} data-insurance-type="health">
                        <div className={styles.iconContainer}>
                            <i className="bi bi-hospital"></i>
                        </div>
                        <div className={styles.typeInfo}>
                            <h3>Seguro Saúde</h3>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    </div>
  )
}

