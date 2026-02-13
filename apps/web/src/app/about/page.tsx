'use client'

import { useEffect, useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CoreValues from '@/components/CoreValues'
import styles from './about.module.css'

interface SiteInfo {
  churchName?: string
  mission?: string
  vision?: string
  history?: string
  location?: {
    city: string
    address: string
  }
}

export default function AboutPage() {
  const [siteInfo, setSiteInfo] = useState<SiteInfo | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSiteInfo = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'
        const response = await fetch(`${apiUrl}/api/public/site`)
        const data = await response.json()
        
        if (data.success && data.data) {
          setSiteInfo(data.data)
        } else {
          // Fallback data
          setSiteInfo({
            churchName: 'VOSH Church International Kitengela',
            mission: 'To manifest Christ and be a house of solutions for our community.',
            vision: 'Building a community of believers who walk in holiness, unity, and purpose.',
            history: 'VOSH Church International Kitengela is a vibrant community of believers committed to manifesting Christ in our daily lives. We are dedicated to prayer, stewardship, holiness, advocacy, and unity.',
            location: {
              city: 'Kitengela',
              address: 'Along Baraka Road / Treewa Road, Next to Balozi Junior Academy'
            }
          })
        }
      } catch (error) {
        console.error('Error fetching site info:', error)
        // Fallback data
        setSiteInfo({
          churchName: 'VOSH Church International Kitengela',
          mission: 'To manifest Christ and be a house of solutions for our community.',
          vision: 'Building a community of believers who walk in holiness, unity, and purpose.',
          history: 'VOSH Church International Kitengela is a vibrant community of believers committed to manifesting Christ in our daily lives. We are dedicated to prayer, stewardship, holiness, advocacy, and unity.',
          location: {
            city: 'Kitengela',
            address: 'Along Baraka Road / Treewa Road, Next to Balozi Junior Academy'
          }
        })
      } finally {
        setLoading(false)
      }
    }

    fetchSiteInfo()
  }, [])

  return (
    <main>
      <Header />
      <div className={styles.container}>
        <div className={styles.hero}>
          <h1 className={styles.title}>About Us</h1>
          <p className={styles.subtitle}>
            {siteInfo?.churchName || "Voice Of Salvation And Healing Church Int'l – Kitengela"}
          </p>
        </div>

        {loading ? (
          <div className={styles.loading}>Loading...</div>
        ) : (
          <>
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Our Mission</h2>
              <p className={styles.text}>
                {siteInfo?.mission || 'To manifest Christ and be a house of solutions for our community. We are committed to raising, equipping, and releasing Kingdom-minded leaders who will impact generations by living out the uncompromised truth of the Gospel.'}
              </p>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Our Vision</h2>
              <p className={styles.text}>
                {siteInfo?.vision || 'To raise, equip, and release Kingdom-minded leaders who will impact generations by living out the uncompromised truth of the Gospel. Building a community of believers who walk in holiness, unity, and purpose.'}
              </p>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Our History</h2>
              <p className={styles.text}>
                Voice Of Salvation And Healing Church Int'l is a vibrant ministry committed to spreading the pure and unadulterated Gospel of Jesus Christ. The Kitengela branch is part of this wider ministry, serving the Kitengela community and beyond.
              </p>
              <p className={styles.text}>
                Under the leadership of Rev. Evans O. Kochoo, fondly known as "The Eagle," the Kitengela branch is dedicated to disseminating the Gospel through in-depth teachings that ignite zeal, inspire purpose, and transform lives.
              </p>
              <p className={styles.text}>
                Our ministry spans diverse platforms, shaping individuals, leaders, and communities with the uncompromising truth of God's Word. We are committed to maintaining doctrinal and brand alignment with the main Voice Of Salvation And Healing Church Int'l while clearly representing our Kitengela branch identity.
              </p>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>How Kitengela Branch Fits Into the Larger Ministry</h2>
              <p className={styles.text}>
                The Kitengela branch is an integral part of the Voice Of Salvation And Healing Church Int'l ministry. We maintain:
              </p>
              <ul className={styles.list}>
                <li><strong>Doctrinal Alignment:</strong> We uphold the same biblical foundations and teachings as the main church</li>
                <li><strong>Brand Consistency:</strong> We represent the Voice Of Salvation And Healing Church Int'l identity while serving our local community</li>
                <li><strong>Ministry Extension:</strong> Our website and services extend the ministry beyond physical gatherings, enabling continuous prayer, worship, and teaching</li>
                <li><strong>Unified Mission:</strong> We share the same vision to raise, equip, and release Kingdom-minded leaders who will impact generations</li>
              </ul>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Statement of Faith</h2>
              <p className={styles.text}>
                We believe in:
              </p>
              <ul className={styles.list}>
                <li>The Holy Bible as the inspired, infallible, and authoritative Word of God</li>
                <li>One God, eternally existent in three persons: Father, Son, and Holy Spirit</li>
                <li>The deity of our Lord Jesus Christ, His virgin birth, sinless life, miracles, atoning death, bodily resurrection, and ascension</li>
                <li>The salvation of lost and sinful humanity through faith in Jesus Christ alone</li>
                <li>The present ministry of the Holy Spirit, who indwells and empowers believers</li>
                <li>The resurrection of both the saved and the lost: the saved to eternal life, the lost to eternal separation from God</li>
                <li>The spiritual unity of believers in our Lord Jesus Christ</li>
                <li>The Great Commission to make disciples of all nations</li>
              </ul>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Our Leadership</h2>
              <p className={styles.text}>
                VOSH Church International Kitengela is led by <strong>Rev. Evans O. Kochoo</strong>, a passionate servant of God driven by a dynamic apostolic mandate. Known as "The Eagle," Rev. Kochoo is committed to raising, equipping, and releasing Kingdom-minded leaders who will impact generations.
              </p>
              <p className={styles.text}>
                <a href="/leadership/evans-kochoo" className={styles.leaderLink}>
                  Learn more about Rev. Evans O. Kochoo →
                </a>
              </p>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Location</h2>
              <p className={styles.text}>
                <strong>City:</strong> {siteInfo?.location?.city || 'Kitengela'}
              </p>
              <p className={styles.text}>
                <strong>Address:</strong> {siteInfo?.location?.address || 'Along Baraka Road / Treewa Road, Next to Balozi Junior Academy'}
              </p>
            </section>

            <CoreValues />
          </>
        )}
      </div>
      <Footer />
    </main>
  )
}
