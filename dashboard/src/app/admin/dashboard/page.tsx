'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import MassSermons from '@/components/admin/MassSermons'
import WeeklyMasses from '@/components/admin/WeeklyMasses'
import UpdateLinks from '@/components/admin/UpdateLinks'
import AdminRights from '@/components/admin/AdminRights'
import styles from './dashboard.module.css'

export default function AdminDashboard() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('sermons')
  const [admin, setAdmin] = useState<any>(null)

  useEffect(() => {
    const token = localStorage.getItem('adminToken')
    const adminData = localStorage.getItem('admin')
    
    if (!token || !adminData) {
      router.push('/admin/login')
      return
    }

    setAdmin(JSON.parse(adminData))
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    localStorage.removeItem('admin')
    router.push('/admin/login')
  }

  if (!admin) {
    return <div className={styles.loading}>Loading...</div>
  }

  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1>Admin Dashboard</h1>
          <div className={styles.userInfo}>
            <span>Welcome, {admin.username}</span>
            <button onClick={handleLogout} className={styles.logoutButton}>Logout</button>
          </div>
        </div>
      </header>

      <nav className={styles.tabs}>
        <button
          className={`${styles.tab} ${activeTab === 'sermons' ? styles.active : ''}`}
          onClick={() => setActiveTab('sermons')}
        >
          Mass Sermons
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'masses' ? styles.active : ''}`}
          onClick={() => setActiveTab('masses')}
        >
          Weekly Masses
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'links' ? styles.active : ''}`}
          onClick={() => setActiveTab('links')}
        >
          Update Links
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'admins' ? styles.active : ''}`}
          onClick={() => setActiveTab('admins')}
        >
          Admin Rights
        </button>
      </nav>

      <main className={styles.content}>
        {activeTab === 'sermons' && <MassSermons />}
        {activeTab === 'masses' && <WeeklyMasses />}
        {activeTab === 'links' && <UpdateLinks />}
        {activeTab === 'admins' && <AdminRights />}
      </main>
    </div>
  )
}
