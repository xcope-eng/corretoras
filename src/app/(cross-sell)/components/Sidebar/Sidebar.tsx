'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import styles from './Sidebar.module.css';

export default function Sidebar() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === '/cross-sell/dashboard') {
      // Check if we're in dashboard or any of the simulation forms
      return pathname === path || 
             pathname?.startsWith('/cross-sell/(new-simulation)') ||
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
              href="/cross-sell/dashboard" 
              className={`${styles.navLink} ${isActive('/cross-sell/dashboard') ? styles.active : ''}`}
              prefetch={true}
            >
              <i className="bi bi-house"></i>
              Dashboard
            </Link>
          </li>
          <li>
            <Link 
              href="/cross-sell/clients" 
              className={`${styles.navLink} ${isActive('/cross-sell/clients') ? styles.active : ''}`}
              prefetch={true}
            >
              <i className="bi bi-people"></i>
              Clientes
            </Link>
          </li>
          <li>
            <Link 
              href="/cross-sell/performance" 
              className={`${styles.navLink} ${isActive('/cross-sell/performance') ? styles.active : ''}`}
              prefetch={true}
            >
              <i className="bi bi-graph-up-arrow"></i>
              Desempenho
            </Link>
          </li>
          <li>
            <Link 
              href="/cross-sell/settings" 
              className={`${styles.navLink} ${isActive('/cross-sell/settings') ? styles.active : ''}`}
              prefetch={true}
            >
              <i className="bi bi-gear"></i>
              Configurações
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
} 