'use client'

import { useEffect, useState } from 'react'
import styles from './ContactSection.module.css'

interface ContactInfo {
  phoneNumbers: string[]
  email: string
  location: {
    city: string
    address: string
  }
  socialMedia: {
    facebook: string
    instagram: string
    youtube: string
  }
  website: string
}

export default function ContactSection() {
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'
        const response = await fetch(`${apiUrl}/api/landing/contact`)
        const data = await response.json()
        
        if (data.success) {
          setContactInfo(data.data)
        } else {
          // Fallback data
          setContactInfo({
            phoneNumbers: ['+254 722 566 399', '+254 720 276 162'],
            email: 'info@voshkitengela.org',
            location: {
              city: 'Kitengela',
              address: 'Along Baraka Road / Treewa Road, Next to Balozi Junior Academy'
            },
            socialMedia: {
              facebook: "Vosh Church Int'l - KITENGELA | Pst. Evans Kochoo",
              instagram: 'Evans Kochoo',
              youtube: 'Pst. Evans Kochoo'
            },
            website: 'www.voshchurchinternational.org'
          })
        }
      } catch (error) {
        console.error('Error fetching contact info:', error)
        // Fallback data
        setContactInfo({
          phoneNumbers: ['+254 722 566 399', '+254 720 276 162'],
          email: 'info@voshkitengela.org',
          location: {
            city: 'Kitengela',
            address: 'Along Baraka Road / Treewa Road, Next to Balozi Junior Academy'
          },
          socialMedia: {
            facebook: "Vosh Church Int'l - KITENGELA | Pst. Evans Kochoo",
            instagram: 'Evans Kochoo',
            youtube: 'Pst. Evans Kochoo'
          },
          website: 'www.voshchurchinternational.org'
        })
      } finally {
        setLoading(false)
      }
    }

    fetchContactInfo()
  }, [])

  if (loading || !contactInfo) {
    return (
      <section className={styles.contactSection}>
        <div className={styles.container}>
          <p>Loading contact information...</p>
        </div>
      </section>
    )
  }

  return (
    <section className={styles.contactSection}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Get In Touch</h2>
        <p className={styles.sectionSubtitle}>We'd love to hear from you</p>

        <div className={styles.contactGrid}>
          <div className={styles.contactCard}>
            <div className={styles.icon}>📞</div>
            <h3 className={styles.cardTitle}>Phone</h3>
            <div className={styles.phoneNumbers}>
              {contactInfo.phoneNumbers.map((phone, index) => (
                <a
                  key={index}
                  href={`tel:${phone.replace(/\s/g, '')}`}
                  className={styles.phoneLink}
                >
                  {phone}
                </a>
              ))}
            </div>
          </div>

          <div className={styles.contactCard}>
            <div className={styles.icon}>✉️</div>
            <h3 className={styles.cardTitle}>Email</h3>
            <a href={`mailto:${contactInfo.email}`} className={styles.emailLink}>
              {contactInfo.email}
            </a>
          </div>

          <div className={styles.contactCard}>
            <div className={styles.icon}>📍</div>
            <h3 className={styles.cardTitle}>Location</h3>
            <p className={styles.address}>
              <strong>{contactInfo.location.city}</strong>
              <br />
              {contactInfo.location.address}
            </p>
          </div>

          <div className={styles.contactCard}>
            <div className={styles.icon}>🌐</div>
            <h3 className={styles.cardTitle}>Follow Us</h3>
            <div className={styles.socialLinks}>
              <a
                href={`https://facebook.com/${contactInfo.socialMedia.facebook}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
              >
                Facebook
              </a>
              <a
                href={`https://instagram.com/${contactInfo.socialMedia.instagram}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
              >
                Instagram
              </a>
              <a
                href={`https://youtube.com/${contactInfo.socialMedia.youtube}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
              >
                YouTube
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
