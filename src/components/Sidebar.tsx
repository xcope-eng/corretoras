'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import styles from './Sidebar.module.css';

export default function Sidebar() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarHeader}>
        <div className={styles.logo}>
          <Image
            src="/logo.png"
            alt="Logo"
            width={150}
            height={50}
            className="object-contain"
            priority
          />
        </div>
      </div>

      <nav id="sidebar" className={styles.nav}>
        <ul>
          <li>
            <Link 
              href="/dashboard" 
              className={`${styles.navLink} ${isActive('/dashboard') ? styles.active : ''}`}
              prefetch={true}
            >
              <i className="bi bi-house"></i>
              Dashboard
            </Link>
          </li>
          <li>
            <Link 
              href="/clients" 
              className={`${styles.navLink} ${isActive('/clients') ? styles.active : ''}`}
              prefetch={true}
            >
              <i className="bi bi-people"></i>
              Clientes
            </Link>
          </li>
          <li>
            <Link 
              href="/insurances" 
              className={`${styles.navLink} ${isActive('/insurances') ? styles.active : ''}`}
              prefetch={true}
            >
              <i className="bi bi-shield"></i>
              Seguros
            </Link>
          </li>
          <li>
            <Link 
              href="/auto-insurance" 
              className={`${styles.navLink} ${isActive('/auto-insurance') ? styles.active : ''}`}
              prefetch={true}
            >
              <i className="bi bi-car-front"></i>
              Seguro Automóvel
            </Link>
          </li>
          <li>
            <Link 
              href="/history" 
              className={`${styles.navLink} ${isActive('/history') ? styles.active : ''}`}
              prefetch={true}
            >
              <i className="bi bi-clock-history"></i>
              Histórico
            </Link>
          </li>
          <li>
            <Link 
              href="/settings" 
              className={`${styles.navLink} ${isActive('/settings') ? styles.active : ''}`}
              prefetch={true}
            >
              <i className="bi bi-gear"></i>
              Configurações
            </Link>
          </li>
        </ul>

        <div className={styles.sidebarSection}>
          <h6>SIMULAÇÕES RECENTES</h6>
          <ul>
            <li>
              <Link href="#" className={styles.navLink} prefetch={true}>
                <i className="bi bi-file-earmark-text"></i>
                João Silva - Vida
              </Link>
            </li>
            <li>
              <Link href="#" className={styles.navLink} prefetch={true}>
                <i className="bi bi-file-earmark-text"></i>
                Maria Santos - Saúde
              </Link>
            </li>
            <li>
              <Link href="#" className={styles.navLink} prefetch={true}>
                <i className="bi bi-file-earmark-text"></i>
                António Ferreira - Viagem
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
} 