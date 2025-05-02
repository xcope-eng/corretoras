'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import styles from './Sidebar.module.css';

export default function Sidebar() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === '/seguros/dashboard') {
      // Check if we're in dashboard or any of the simulation forms
      return pathname === path || 
             pathname?.startsWith('/seguros/(new-simulation)') ||
             pathname?.includes('/insurance-type') ||
             pathname?.includes('/travel-form') ||
             pathname?.includes('/life-form') ||
             pathname?.includes('/auto-form') ||
             pathname?.includes('/health-form');
    }
    // For other routes, check if the current path starts with the given path
    return pathname?.startsWith(path);
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarHeader}>
        <div className={styles.logo}>
          <Link href="/">
            <Image
              src="/logo.png"
              alt="Logo"
              width={150}
              height={50}
              className="object-contain"
              priority
            />
          </Link>
        </div>
      </div>

      <nav id="sidebar" className={styles.nav}>
        <ul>
          <li>
            <Link 
              href="/seguros/dashboard" 
              className={`${styles.navLink} ${isActive('/seguros/dashboard') ? styles.active : ''}`}
              prefetch={true}
            >
              <i className="bi bi-house"></i>
              Dashboard
            </Link>
          </li>
          <li>
            <Link 
              href="/seguros/clients" 
              className={`${styles.navLink} ${isActive('/seguros/clients') ? styles.active : ''}`}
              prefetch={true}
            >
              <i className="bi bi-people"></i>
              Clientes
            </Link>
          </li>
          <li>
            <Link 
              href="/seguros/insurances" 
              className={`${styles.navLink} ${isActive('/seguros/insurances') ? styles.active : ''}`}
              prefetch={true}
            >
              <i className="bi bi-shield"></i>
              Seguros
            </Link>
          </li>
          <li>
            <Link 
              href="/seguros/auto-insurance" 
              className={`${styles.navLink} ${isActive('/seguros/auto-insurance') ? styles.active : ''}`}
              prefetch={true}
            >
              <i className="bi bi-car-front"></i>
              Seguro Automóvel
            </Link>
          </li>
          <li>
            <Link 
              href="/seguros/history" 
              className={`${styles.navLink} ${isActive('/seguros/history') ? styles.active : ''}`}
              prefetch={true}
            >
              <i className="bi bi-clock-history"></i>
              Histórico
            </Link>
          </li>
          <li>
            <Link 
              href="/seguros/settings" 
              className={`${styles.navLink} ${isActive('/seguros/settings') ? styles.active : ''}`}
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