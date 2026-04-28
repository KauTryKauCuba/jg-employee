'use client';

import React from 'react';

export default function Header() {
  return (
    <header style={styles.header}>
      <div style={styles.left}>
        <div style={styles.companyInfo}>
          <div style={styles.companyLogo}>🏢</div>
          <span style={styles.companyName}>AFED Digital Sdn Bhd</span>
        </div>
        <button style={styles.myCompanyBtn}>
           <span>📁</span> My Company
        </button>
      </div>

      <div style={styles.center}>
        <div style={styles.searchContainer}>
          <span style={styles.searchIcon}>🔍</span>
          <input type="text" placeholder="Search" style={styles.searchInput} />
        </div>
      </div>

      <div style={styles.right}>
        <div style={styles.notification}>
          <span>🔔</span>
          <div style={styles.badge}></div>
        </div>
        <div style={styles.premiumBadge}>Freemium</div>
        <div style={styles.userProfile}>
           <div style={styles.userInfo}>
             <span style={styles.userName}>Ahmad Yusuf</span>
             <span style={styles.userRole}>HR Manager</span>
           </div>
           <div style={styles.avatar}>👨‍💼</div>
        </div>
      </div>
    </header>
  );
}

const styles: Record<string, React.CSSProperties> = {
  header: {
    height: '70px',
    backgroundColor: 'white',
    borderBottom: '1px solid var(--border)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 2rem',
    position: 'fixed',
    top: 0,
    left: '240px',
    right: 0,
    zIndex: 100,
  },
  left: {
    display: 'flex',
    alignItems: 'center',
    gap: '1.5rem',
  },
  companyInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  companyLogo: {
    fontSize: '1.25rem',
  },
  companyName: {
    fontWeight: 600,
    fontSize: '0.9rem',
  },
  myCompanyBtn: {
    border: '1px solid var(--primary)',
    color: 'var(--primary)',
    backgroundColor: 'transparent',
    padding: '0.4rem 0.8rem',
    borderRadius: '6px',
    fontSize: '0.85rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontWeight: 500,
  },
  center: {
    flex: 1,
    maxWidth: '400px',
    margin: '0 2rem',
  },
  searchContainer: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#f7fafc',
    borderRadius: '8px',
    padding: '0.5rem 1rem',
    border: '1px solid #e2e8f0',
  },
  searchIcon: {
    fontSize: '0.9rem',
    color: '#a0aec0',
    marginRight: '0.5rem',
  },
  searchInput: {
    border: 'none',
    backgroundColor: 'transparent',
    outline: 'none',
    fontSize: '0.9rem',
    width: '100%',
  },
  right: {
    display: 'flex',
    alignItems: 'center',
    gap: '1.5rem',
  },
  notification: {
    position: 'relative',
    fontSize: '1.25rem',
    cursor: 'pointer',
  },
  badge: {
    position: 'absolute',
    top: '-2px',
    right: '-2px',
    width: '8px',
    height: '8px',
    backgroundColor: 'var(--error)',
    borderRadius: '50%',
    border: '2px solid white',
  },
  premiumBadge: {
    backgroundColor: '#ebf8ff',
    color: '#3182ce',
    fontSize: '0.75rem',
    fontWeight: 600,
    padding: '0.2rem 0.6rem',
    borderRadius: '12px',
  },
  userProfile: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
  },
  userInfo: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  userName: {
    fontSize: '0.85rem',
    fontWeight: 700,
  },
  userRole: {
    fontSize: '0.75rem',
    color: 'var(--muted)',
  },
  avatar: {
    width: '35px',
    height: '35px',
    borderRadius: '50%',
    backgroundColor: '#edf2f7',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.25rem',
  }
};
