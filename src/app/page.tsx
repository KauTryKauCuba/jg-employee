'use client';

import React, { useState } from 'react';

const initialEmployees = [
  { id: '0000', name: 'Johnny Johnny Yes Papa', role: 'CEO', email: 'ceo@afed.com.my', office: 'Afed Digital Sdn Bhd', access: 'Owner', avatar: '🧔', isDeleted: false },
  { id: '0001', name: 'Ahmad Yusuf', role: 'HR Manager', email: 'ahmadyusuf@afed.com.my', office: 'Afed Digital Sdn Bhd', access: 'Owner', avatar: '👨‍💼', isDeleted: false },
  { id: '0002', name: 'Siti Nabila', role: 'HR Manager', email: 'sitinabila@afed.com.my', office: 'Afed Digital Sdn Bhd', access: 'Admin', avatar: '👩‍💼', isDeleted: false },
  { id: '0003', name: 'Ahmad Firdaus', role: 'Senior Graphic Designer', email: 'ahmadfirdausa@afed.com.my', office: 'Afed Digital Sdn Bhd', access: 'None', avatar: '👨‍🎨', isDeleted: false },
  { id: '0004', name: 'Hannah Alya', role: 'Senior Graphic Designer', email: 'hannahalya@afed.com.my', office: 'Afed Digital Sdn Bhd', access: 'None', avatar: '👩‍🎨', isDeleted: false },
  { id: '0005', name: 'Adam Irfan', role: 'Senior Graphic Designer', email: 'adamirfan@afed.com.my', office: 'Afed Digital Sdn Bhd', access: 'None', avatar: '👨‍💻', isDeleted: false },
];

export default function EmployeesPage() {
  const [employees, setEmployees] = useState(initialEmployees);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'directory' | 'position'>('directory');
  const [definedPositions, setDefinedPositions] = useState<{title: string, office: string}[]>([]);
  
  const [isPositionModalOpen, setIsPositionModalOpen] = useState(false);
  const [newPosition, setNewPosition] = useState({ title: '', office: '' });

  const [isStaffModalOpen, setIsStaffModalOpen] = useState(false);
  const [newStaffData, setNewStaffData] = useState({ name: '', role: '', email: '', access: 'None' });

  const toggleMenu = (id: string) => {
    setActiveMenu(activeMenu === id ? null : id);
  };

  const updateAccess = (id: string, newAccess: string) => {
    const activeOwners = employees.filter(e => e.access === 'Owner' && !e.isDeleted);
    const target = employees.find(e => e.id === id);

    if (target?.access === 'Owner' && newAccess !== 'Owner' && activeOwners.length <= 1) {
      alert("Cannot demote the last Owner. Please promote another user to Owner first.");
      return;
    }

    setEmployees(prev => prev.map(emp => emp.id === id ? { ...emp, access: newAccess } : emp));
    setActiveMenu(null);
  };

  const deleteEmployee = (id: string) => {
    const activeOwners = employees.filter(e => e.access === 'Owner' && !e.isDeleted);
    const target = employees.find(e => e.id === id);
    
    if (target?.access === 'Owner' && activeOwners.length <= 1) {
      alert("Cannot delete the last Owner. Please promote another user to Owner first.");
      return;
    }
    
    setEmployees(prev => prev.map(emp => emp.id === id ? { ...emp, isDeleted: true } : emp));
    setActiveMenu(null);
  };

  const handleCreatePosition = () => {
    if (newPosition.title && !definedPositions.find(p => p.title === newPosition.title)) {
      setDefinedPositions(prev => [...prev, { title: newPosition.title, office: newPosition.office || 'Afed Digital Sdn Bhd' }]);
      setNewPosition({ title: '', office: '' });
      setIsPositionModalOpen(false);
    }
  };

  const handleCreateStaff = () => {
    if (newStaffData.name && newStaffData.role && newStaffData.email) {
      const newId = (employees.length + 1).toString().padStart(4, '0');
      setEmployees(prev => [...prev, {
        id: newId,
        name: newStaffData.name,
        role: newStaffData.role,
        email: newStaffData.email,
        office: 'Afed Digital Sdn Bhd',
        access: newStaffData.access,
        avatar: '👤',
        isDeleted: false
      }]);
      setNewStaffData({ name: '', role: '', email: '', access: 'None' });
      setIsStaffModalOpen(false);
    }
  };

  const handleInviteStaff = () => {
    if (newStaffData.email) {
      alert(`Invitation sent to ${newStaffData.email}!`);
      setNewStaffData({ name: '', role: '', email: '', access: 'None' });
      setIsStaffModalOpen(false);
    } else {
      alert("Please enter an email address to send an invitation.");
    }
  };


  const visibleEmployees = employees.filter(emp => !emp.isDeleted);
  const availableRoles = [...new Set([...initialEmployees.map(e => e.role), ...definedPositions.map(p => p.title)])];

  const positions = [...new Set([...visibleEmployees.map(e => e.role), ...definedPositions.map(p => p.title)])].map(title => {
    const members = visibleEmployees.filter(e => e.role === title);
    const definedPos = definedPositions.find(p => p.title === title);
    return { title, office: members.length > 0 ? members[0].office : (definedPos?.office || 'Unassigned'), count: members.length };
  });

  return (
    <div style={styles.container}>
      <h1 style={styles.pageTitle}>Employees</h1>

      <div style={styles.layout}>
        {/* Left Side: Company Card */}
        <div style={styles.leftCol}>
          <div style={styles.card}>
            <h3 style={styles.cardHeader}>Company</h3>
            <div style={styles.companyCard}>
              <div style={styles.companyLogo}>🏢</div>
              <div style={styles.companyInfo}>
                <span style={styles.companyName}>Afed Digital Sdn Bhd</span>
                <span style={styles.employerCount}>Owners ({visibleEmployees.filter(e => e.access === 'Owner').length})</span>
              </div>
            </div>
            <div style={styles.dateInfo}>
              <div style={styles.dateRow}><span>Registered Date</span><span>20.11.2025</span></div>
              <div style={styles.dateRow}><span>Registered Date</span><span>20.11.2025</span></div>
            </div>
            <button style={styles.addCompanyBtn}>+ Add Company</button>
          </div>
        </div>

        {/* Right Side: Content Area */}
        <div style={styles.rightCol}>
          <div style={styles.tabs}>
            <div onClick={() => setActiveTab('directory')} style={{ ...styles.tab, ...(activeTab === 'directory' ? styles.activeTab : {}) }}>
              Employees Directory ({visibleEmployees.length})
            </div>
            <div onClick={() => setActiveTab('position')} style={{ ...styles.tab, ...(activeTab === 'position' ? styles.activeTab : {}) }}>
              Position ({positions.length})
            </div>
          </div>

          <div style={styles.card}>
            <div style={styles.tableHeader}>
              <h3 style={styles.tableTitle}>{activeTab === 'directory' ? 'Employees Directory' : 'Positions Overview'}</h3>
              <div style={styles.tableActions}>
                <div style={styles.searchBar}>
                  <span style={styles.searchIcon}>🔍</span>
                  <input type="text" placeholder="Search" style={styles.tableSearchInput} />
                </div>
                <button 
                  style={styles.newStaffBtn}
                  onClick={activeTab === 'position' ? () => setIsPositionModalOpen(true) : () => setIsStaffModalOpen(true)}
                >
                  {activeTab === 'directory' ? '+ New Staff' : '+ New Position'}
                </button>
                <button style={styles.boostAccessBtn}>🚀 Boost Access</button>
              </div>
            </div>

            {activeTab === 'directory' ? (
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>ID</th>
                    <th style={styles.th}>Employee Name</th>
                    <th style={styles.th}>Email</th>
                    <th style={styles.th}>Office</th>
                    <th style={styles.th}>Access</th>
                    <th style={styles.th}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {visibleEmployees.map((emp) => (
                    <tr key={emp.id} style={styles.tr}>
                      <td style={styles.td}>{emp.id}</td>
                      <td style={styles.td}>
                        <div style={styles.empNameCell}>
                          <div style={styles.avatar}>{emp.avatar}</div>
                          <div style={styles.empInfo}>
                            <span style={styles.empName}>{emp.name}</span>
                            <span style={styles.empRole}>{emp.role}</span>
                          </div>
                        </div>
                      </td>
                      <td style={styles.td}>{emp.email}</td>
                      <td style={styles.td}>{emp.office}</td>
                      <td style={styles.td}>
                        <span style={{ ...styles.badge, ...(emp.access === 'Owner' ? styles.ownerBadge : emp.access === 'Admin' ? styles.adminBadge : emp.access === 'Panel' ? styles.panelBadge : styles.noneBadge) }}>
                          {emp.access}
                        </span>
                      </td>
                      <td style={{ ...styles.td, position: 'relative' }}>
                        <button onClick={() => toggleMenu(emp.id)} style={styles.actionBtn}>⋮</button>
                        {activeMenu === emp.id && (
                          <div style={styles.dropdown}>
                            {emp.access === 'Owner' ? (
                              <button onClick={() => updateAccess(emp.id, 'Admin')} style={styles.dropdownItem}>Demote to Admin</button>
                            ) : emp.access === 'Admin' ? (
                              <><button onClick={() => updateAccess(emp.id, 'Owner')} style={{...styles.dropdownItem, color: '#b45309'}}>Make Owner</button><button onClick={() => updateAccess(emp.id, 'Panel')} style={styles.dropdownItem}>Make Panel</button><button onClick={() => updateAccess(emp.id, 'None')} style={styles.dropdownItem}>Demote</button></>
                            ) : emp.access === 'Panel' ? (
                              <><button onClick={() => updateAccess(emp.id, 'Admin')} style={styles.dropdownItem}>Promote to Admin</button><button onClick={() => updateAccess(emp.id, 'None')} style={styles.dropdownItem}>Demote</button></>
                            ) : (
                              <><button onClick={() => updateAccess(emp.id, 'Admin')} style={styles.dropdownItem}>Promote to Admin</button><button onClick={() => updateAccess(emp.id, 'Panel')} style={styles.dropdownItem}>Make Panel</button></>
                            )}
                            <button onClick={() => deleteEmployee(emp.id)} style={{ ...styles.dropdownItem, color: 'var(--error)' }}>Delete</button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <table style={styles.table}>
                <thead>
                  <tr><th style={styles.th}>Position Title</th><th style={styles.th}>Office/Department</th><th style={styles.th}>Headcount</th><th style={styles.th}>Action</th></tr>
                </thead>
                <tbody>
                  {positions.map((pos, idx) => (
                    <tr key={idx} style={styles.tr}>
                      <td style={{ ...styles.td, fontWeight: 700 }}>{pos.title}</td>
                      <td style={styles.td}>{pos.office}</td>
                      <td style={styles.td}><span style={{ ...styles.badge, backgroundColor: '#ebf8ff', color: '#3182ce' }}>{pos.count} Members</span></td>
                      <td style={styles.td}><button style={styles.actionBtn}>⚙️</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      {/* Position Modal */}
      {isPositionModalOpen && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <h2 style={styles.modalTitle}>Add New Position</h2>
            <div style={styles.modalBody}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Position Title</label>
                <input type="text" value={newPosition.title} onChange={(e) => setNewPosition({...newPosition, title: e.target.value})} placeholder="e.g. Lead Designer" style={styles.modalInput} />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Office/Department</label>
                <input type="text" value={newPosition.office} onChange={(e) => setNewPosition({...newPosition, office: e.target.value})} placeholder="e.g. Creative Department" style={styles.modalInput} />
              </div>
            </div>
            <div style={styles.modalFooter}>
              <button onClick={() => setIsPositionModalOpen(false)} style={styles.cancelBtn}>Cancel</button>
              <button onClick={handleCreatePosition} style={styles.confirmBtn}>Create Position</button>
            </div>
          </div>
        </div>
      )}

      {/* Staff Modal */}
      {isStaffModalOpen && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <h2 style={styles.modalTitle}>Hire New Staff</h2>
            <div style={styles.modalBody}>
              <div style={styles.inputGroup}><label style={styles.label}>Full Name</label><input type="text" value={newStaffData.name} onChange={(e) => setNewStaffData({...newStaffData, name: e.target.value})} placeholder="e.g. John Doe" style={styles.modalInput} /></div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Job Position</label>
                <select value={newStaffData.role} onChange={(e) => setNewStaffData({...newStaffData, role: e.target.value})} style={styles.modalInput}>
                  <option value="">Select a Position</option>
                  {availableRoles.map(role => <option key={role} value={role}>{role}</option>)}
                </select>
              </div>
              <div style={styles.inputGroup}><label style={styles.label}>Email Address</label><input type="email" value={newStaffData.email} onChange={(e) => setNewStaffData({...newStaffData, email: e.target.value})} placeholder="john@afed.com.my" style={styles.modalInput} /></div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Access Level</label>
                <select value={newStaffData.access} onChange={(e) => setNewStaffData({...newStaffData, access: e.target.value})} style={styles.modalInput}>
                  <option value="None">None (Standard Staff)</option>
                  <option value="Panel">Panel</option>
                  <option value="Admin">Admin</option>
                  <option value="Owner">Owner</option>
                </select>
              </div>
            </div>
            <div style={styles.modalFooter}>
              <button onClick={() => setIsStaffModalOpen(false)} style={styles.cancelBtn}>Cancel</button>
              <button onClick={handleInviteStaff} style={styles.inviteBtn}>Invite</button>
              <button onClick={handleCreateStaff} style={styles.confirmBtn}>Hire Staff</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: { padding: '2rem' },
  pageTitle: { fontSize: '1.75rem', fontWeight: 700, marginBottom: '2rem', color: '#2d3748' },
  layout: { display: 'grid', gridTemplateColumns: '300px 1fr', gap: '2rem' },
  leftCol: { display: 'flex', flexDirection: 'column', gap: '1.5rem' },
  rightCol: { display: 'flex', flexDirection: 'column', gap: '1rem' },
  card: { backgroundColor: 'white', borderRadius: '12px', padding: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', border: '1px solid #edf2f7' },
  cardHeader: { fontSize: '1rem', fontWeight: 700, marginBottom: '1.5rem' },
  companyCard: { display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', backgroundColor: '#f7fafc', borderRadius: '8px', marginBottom: '1.5rem' },
  companyLogo: { fontSize: '1.5rem' },
  companyInfo: { display: 'flex', flexDirection: 'column' },
  companyName: { fontWeight: 700, fontSize: '0.9rem' },
  employerCount: { fontSize: '0.75rem', color: 'var(--muted)' },
  dateInfo: { display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem' },
  dateRow: { display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--muted)' },
  addCompanyBtn: { width: '100%', padding: '0.75rem', border: '1px solid var(--primary)', color: 'var(--primary)', backgroundColor: 'transparent', borderRadius: '8px', fontWeight: 600, fontSize: '0.85rem' },
  tabs: { display: 'flex', gap: '2rem', borderBottom: '1px solid #edf2f7', marginBottom: '0.5rem', paddingLeft: '1rem' },
  tab: { padding: '0.75rem 0', fontSize: '0.9rem', fontWeight: 600, color: '#a0aec0', cursor: 'pointer', position: 'relative' },
  activeTab: { color: 'var(--primary)', borderBottom: '2px solid var(--primary)' },
  tableHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' },
  tableTitle: { fontSize: '1.1rem', fontWeight: 700 },
  tableActions: { display: 'flex', gap: '0.75rem', alignItems: 'center' },
  searchBar: { display: 'flex', alignItems: 'center', backgroundColor: '#f7fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '0.4rem 0.75rem', width: '200px' },
  searchIcon: { fontSize: '0.8rem', color: '#a0aec0', marginRight: '0.5rem' },
  tableSearchInput: { border: 'none', backgroundColor: 'transparent', outline: 'none', fontSize: '0.8rem', width: '100%' },
  newStaffBtn: { backgroundColor: 'white', border: '1px solid var(--primary)', color: 'var(--primary)', padding: '0.4rem 0.8rem', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 600 },
  boostAccessBtn: { backgroundColor: 'white', border: '1px solid var(--primary)', color: 'var(--primary)', padding: '0.4rem 0.8rem', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 600 },
  table: { width: '100%', borderCollapse: 'collapse' },
  th: { textAlign: 'left', padding: '1rem', fontSize: '0.75rem', color: '#a0aec0', textTransform: 'uppercase', letterSpacing: '0.5px', borderBottom: '1px solid #edf2f7' },
  tr: { borderBottom: '1px solid #edf2f7' },
  td: { padding: '1rem', fontSize: '0.85rem' },
  empNameCell: { display: 'flex', alignItems: 'center', gap: '0.75rem' },
  avatar: { width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#edf2f7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem' },
  empInfo: { display: 'flex', flexDirection: 'column' },
  empName: { fontWeight: 700, color: '#2d3748' },
  empRole: { fontSize: '0.7rem', color: 'var(--muted)' },
  badge: { padding: '0.2rem 0.6rem', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 600 },
  adminBadge: { backgroundColor: '#c6f6d5', color: '#2f855a' },
  ownerBadge: { backgroundColor: '#fef3c7', color: '#b45309' },
  panelBadge: { backgroundColor: '#e0e7ff', color: '#4338ca' },
  noneBadge: { backgroundColor: '#edf2f7', color: '#4a5568' },
  actionBtn: { fontSize: '1.25rem', color: '#a0aec0', cursor: 'pointer', background: 'none', border: 'none' },
  dropdown: { position: 'absolute', right: 0, top: '100%', backgroundColor: 'white', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', borderRadius: '8px', border: '1px solid #edf2f7', zIndex: 50, width: '140px', display: 'flex', flexDirection: 'column', overflow: 'hidden' },
  dropdownItem: { padding: '0.75rem 1rem', fontSize: '0.85rem', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', transition: 'background 0.2s', borderBottom: '1px solid #edf2f7' },
  
  modalOverlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, backdropFilter: 'blur(4px)' },
  modalContent: { backgroundColor: 'white', padding: '2rem', borderRadius: '16px', width: '450px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' },
  modalTitle: { fontSize: '1.5rem', fontWeight: 800, marginBottom: '1.5rem', color: '#1a202c' },
  modalBody: { display: 'flex', flexDirection: 'column', gap: '1.5rem' },
  inputGroup: { display: 'flex', flexDirection: 'column', gap: '0.5rem' },
  label: { fontSize: '0.875rem', fontWeight: 600, color: '#4a5568' },
  modalInput: { padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid #e2e8f0', outline: 'none', fontSize: '0.95rem' },
  modalFooter: { display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '2rem' },
  cancelBtn: { padding: '0.75rem 1.5rem', borderRadius: '8px', fontWeight: 600, color: '#718096', border: '1px solid #e2e8f0', cursor: 'pointer' },
  inviteBtn: { padding: '0.75rem 1.5rem', borderRadius: '8px', fontWeight: 600, color: 'var(--primary)', backgroundColor: 'transparent', border: '1px solid var(--primary)', cursor: 'pointer' },
  confirmBtn: { padding: '0.75rem 1.5rem', borderRadius: '8px', fontWeight: 600, color: 'white', backgroundColor: 'var(--primary)', border: 'none', cursor: 'pointer' }
};
