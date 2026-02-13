'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import styles from './give.module.css'

export default function GivePage() {
  return (
    <main>
      <Header />
      <div className={styles.container}>
        <div className={styles.hero}>
          <h1 className={styles.title}>Give & Support Ministry</h1>
          <p className={styles.subtitle}>
            Your giving enables us to continue spreading the Gospel and impacting lives
          </p>
        </div>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>M-Pesa Giving</h2>
          <div className={styles.givingCard}>
            <div className={styles.givingMethod}>
              <div className={styles.methodHeader}>
                <span className={styles.icon}>📱</span>
                <h3>M-Pesa Paybill</h3>
              </div>
              <div className={styles.methodDetails}>
                <div className={styles.detailRow}>
                  <span className={styles.label}>Paybill Number:</span>
                  <span className={styles.value}>400222</span>
                </div>
                <div className={styles.detailRow}>
                  <span className={styles.label}>Account Number:</span>
                  <span className={styles.value}>1756443#offering/tithe</span>
                </div>
                <div className={styles.instructions}>
                  <p><strong>How to Give via M-Pesa:</strong></p>
                  <ol>
                    <li>Go to M-Pesa menu on your phone</li>
                    <li>Select "Lipa na M-Pesa"</li>
                    <li>Select "Paybill"</li>
                    <li>Enter Paybill: <strong>400222</strong></li>
                    <li>Enter Account: <strong>1756443#offering/tithe</strong></li>
                    <li>Enter amount</li>
                    <li>Enter your M-Pesa PIN</li>
                    <li>Confirm and send</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Giving Categories</h2>
          <div className={styles.categoriesGrid}>
            <div className={styles.categoryCard}>
              <span className={styles.categoryIcon}>💰</span>
              <h3>Tithes</h3>
              <p>Your regular tithe offering to support the church ministry</p>
              <p className={styles.accountInfo}>Account: 1756443#tithe</p>
            </div>
            <div className={styles.categoryCard}>
              <span className={styles.categoryIcon}>🎁</span>
              <h3>Offerings</h3>
              <p>General offerings for church operations and programs</p>
              <p className={styles.accountInfo}>Account: 1756443#offering</p>
            </div>
            <div className={styles.categoryCard}>
              <span className={styles.categoryIcon}>🌍</span>
              <h3>Missions</h3>
              <p>Support our outreach and mission programs</p>
              <p className={styles.accountInfo}>Account: 1756443#missions</p>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Bank Details</h2>
          <div className={styles.bankCard}>
            <p className={styles.bankInfo}>
              Bank account details are available upon request. Please contact the church office for more information.
            </p>
            <div className={styles.contactInfo}>
              <p><strong>Phone:</strong> +254 722 566 399</p>
              <p><strong>Email:</strong> info@voshkitengela.org</p>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.scripture}>
            <p className={styles.scriptureText}>
              "Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver."
            </p>
            <p className={styles.scriptureReference}>— 2 Corinthians 9:7</p>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  )
}
