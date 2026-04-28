'use client';

import React from 'react';

const menuItems = [
  { name: 'Dashboard', icon: '📊' },
  { name: 'Manage Jobs', icon: '💼' },
  { name: 'Applicants', icon: '📝' },
  { name: 'Interview', icon: '💬' },
  { name: 'Chat', icon: '🗨️' },
  { name: 'Billing', icon: '💳' },
  { name: 'Employees', icon: '👥', active: true },
  { name: 'Forms', icon: '📋' },
  { name: 'Search Talent', icon: '🔍' },
];

export default function Sidebar() {
  return (
    <aside style={styles.sidebar}>
      <div style={styles.logoContainer}>
        <div style={styles.logo}>
          <span style={styles.logoIcon}>JG</span>
          <span style={styles.logoText}>JobGiga</span>
        </div>
      </div>
      
      <nav style={styles.nav}>
        {menuItems.map((item) => (
          <div 
            key={item.name} 
            style={{
              ...styles.navItem,
              ...(item.active ? styles.navItemActive : {})
            }}
          >
            <span style={styles.icon}>{item.icon}</span>
            <span style={styles.name}>{item.name}</span>
          </div>
        ))}
      </nav>

      <div style={styles.supportContainer}>
        <div style={styles.navItem}>
           <span style={styles.icon}>🎧</span>
           <span style={styles.name}>Support</span>
        </div>
      </div>

      <div style={styles.promoCard}>
        <div style={styles.promoContent}>
           <span style={styles.promoText}>RM 29.00</span>
           <span style={styles.promoSub}>Mental Health Screening</span>
           <button style={styles.promoButton}>Try Now!</button>
        </div>
      </div>
    </aside>
  );
}

const styles: Record<string, React.CSSProperties> = {
  sidebar: {
    width: '240px',
    backgroundColor: 'var(--sidebar)',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    padding: '1.5rem 1rem',
    borderRight: '1px solid var(--border)',
    position: 'fixed',
    left: 0,
    top: 0,
  },
  logoContainer: {
    padding: '0 0.5rem 2rem 0.5rem',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
  },
  logoIcon: {
    backgroundColor: 'var(--primary)',
    color: 'white',
    width: '32px',
    height: '32px',
    borderRadius: '6px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
  },
  logoText: {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    color: '#2d3748',
  },
  nav: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.25rem',
    flex: 1,
  },
  navItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    padding: '0.75rem 1rem',
    borderRadius: 'var(--radius)',
    color: '#718096',
    cursor: 'pointer',
    transition: 'var(--transition)',
  },
  navItemActive: {
    backgroundColor: 'var(--primary)',
    color: 'white',
  },
  icon: {
    fontSize: '1.25rem',
  },
  name: {
    fontSize: '0.9rem',
    fontWeight: 500,
  },
  supportContainer: {
    marginTop: 'auto',
    marginBottom: '1rem',
  },
  promoCard: {
    backgroundColor: '#00334e',
    borderRadius: '12px',
    padding: '1rem',
    color: 'white',
    backgroundImage: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url("/hero.png")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  promoContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    alignItems: 'center',
    textAlign: 'center',
  },
  promoText: {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    color: '#fbbf24',
  },
  promoSub: {
    fontSize: '0.75rem',
    opacity: 0.9,
  },
  promoButton: {
    backgroundColor: 'var(--primary)',
    color: 'white',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '20px',
    fontSize: '0.75rem',
    fontWeight: 'bold',
    marginTop: '0.5rem',
    width: '100%',
  }
};
