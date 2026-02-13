'use client'

import { useEffect, useState } from 'react'
import styles from './CoreValues.module.css'

export default function CoreValues() {
  const [coreValues, setCoreValues] = useState<string[]>([])

  useEffect(() => {
    const fetchCoreValues = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'
        const response = await fetch(`${apiUrl}/api/landing/core-values`)
        const data = await response.json()
        
        if (data.success) {
          setCoreValues(data.data)
        } else {
          // Fallback values
          setCoreValues(['Prayer', 'Stewardship', 'Holiness', 'Advocacy', 'Unity'])
        }
      } catch (error) {
        console.error('Error fetching core values:', error)
        // Fallback values
        setCoreValues(['Prayer', 'Stewardship', 'Holiness', 'Advocacy', 'Unity'])
      }
    }

    fetchCoreValues()
  }, [])

  return (
    <section className={styles.coreValuesSection}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Our Core Values</h2>
        <p className={styles.sectionSubtitle}>
          The foundational principles that guide our ministry
        </p>
        
        <div className={styles.valuesGrid}>
          {coreValues.map((value, index) => (
            <div key={index} className={styles.valueCard}>
              <div className={styles.valueIcon}>
                <span className={styles.arrow}>›</span>
              </div>
              <h3 className={styles.valueName}>{value}</h3>
            </div>
          ))}
        </div>

        <div className={styles.hashtags}>
          <span className={styles.hashtag}>#House_of_Solutions</span>
          <span className={styles.hashtag}>#MANIFESTING_CHRIST</span>
        </div>
      </div>
    </section>
  )
}
