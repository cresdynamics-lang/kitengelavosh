'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { publicApi } from '@/lib/api'
import styles from './leadership.module.css'

interface Leader {
  id: string
  name: string
  title: string
  bio: string | null
  imageUrl: string | null
  orderIndex: number
}

export default function LeadershipPage() {
  const [leaders, setLeaders] = useState<Leader[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchLeaders = async () => {
      try {
        const response = await publicApi.getLeaders()
        if (response.success && response.data && response.data.length > 0) {
          setLeaders(response.data)
        } else {
          // Default Evans Kochoo if no leaders found
          setLeaders([
            {
              id: 'evans-kochoo',
              name: 'Rev. Evans O. Kochoo',
              title: 'Senior Pastor',
              bio: 'I am Evans O. Kochoo, fondly known as The Eagle, a passionate servant of God driven by a dynamic apostolic mandate to disseminate the pure and unadulterated Gospel of Jesus Christ.',
              imageUrl: null,
              orderIndex: 1
            }
          ])
        }
      } catch (error) {
        console.error('Error fetching leaders:', error)
        // Fallback data
        setLeaders([
          {
            id: 'evans-kochoo',
            name: 'Rev. Evans O. Kochoo',
            title: 'Senior Pastor',
            bio: 'I am Evans O. Kochoo, fondly known as The Eagle, a passionate servant of God driven by a dynamic apostolic mandate to disseminate the pure and unadulterated Gospel of Jesus Christ.',
            imageUrl: null,
            orderIndex: 1
          }
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchLeaders()
  }, [])

  return (
    <main>
      <Header />
      <div className={styles.container}>
        <div className={styles.hero}>
          <h1 className={styles.title}>Our Leadership</h1>
          <p className={styles.subtitle}>
            Meet the dedicated leaders serving our church community
          </p>
        </div>

        {loading ? (
          <div className={styles.loading}>Loading...</div>
        ) : (
          <div className={styles.leadersGrid}>
            {leaders.length > 0 ? (
              leaders.map((leader) => {
                // Use evans-kochoo as the slug for Evans Kochoo
                const slug = leader.name.toLowerCase().includes('evans') ? 'evans-kochoo' : leader.id
                return (
                <Link
                  key={leader.id}
                  href={`/leadership/${slug}`}
                  className={styles.leaderCard}
                >
                  <div className={styles.imageContainer}>
                    {leader.imageUrl ? (
                      <Image
                        src={leader.imageUrl}
                        alt={leader.name}
                        width={300}
                        height={300}
                        className={styles.leaderImage}
                      />
                    ) : (
                      <div className={styles.placeholderImage}>
                        <span className={styles.placeholderText}>
                          {leader.name.charAt(0)}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className={styles.leaderInfo}>
                    <h3 className={styles.leaderName}>{leader.name}</h3>
                    <p className={styles.leaderTitle}>{leader.title}</p>
                    {leader.bio && (
                      <p className={styles.leaderBio}>
                        {leader.bio.length > 150
                          ? `${leader.bio.substring(0, 150)}...`
                          : leader.bio}
                      </p>
                    )}
                    <span className={styles.readMore}>Read More →</span>
                  </div>
                </Link>
              )
              })
            ) : (
              <div className={styles.empty}>
                <p>Leadership information coming soon.</p>
              </div>
            )}
          </div>
        )}
      </div>
      <Footer />
    </main>
  )
}
