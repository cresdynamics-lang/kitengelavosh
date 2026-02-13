'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { publicApi } from '@/lib/api'
import styles from './leader.module.css'

interface Leader {
  id: string
  name: string
  title: string
  bio: string | null
  imageUrl: string | null
  orderIndex: number
}

export default function LeaderDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [leader, setLeader] = useState<Leader | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchLeader = async () => {
      try {
        const response = await publicApi.getLeaders()
        if (response.success && response.data) {
          const foundLeader = response.data.find((l: Leader) => l.id === params.id)
          if (foundLeader) {
            setLeader(foundLeader)
          } else {
            // If not found, check if it's Evans Kochoo
            if (params.id === 'evans-kochoo' || params.id === '1') {
              setLeader({
                id: 'evans-kochoo',
                name: 'Rev. Evans O. Kochoo',
                title: 'Senior Pastor',
                bio: 'I am Evans O. Kochoo, fondly known as The Eagle, a passionate servant of God driven by a dynamic apostolic mandate to disseminate the pure and unadulterated Gospel of Jesus Christ.',
                imageUrl: null,
                orderIndex: 1
              })
            }
          }
        }
      } catch (error) {
        console.error('Error fetching leader:', error)
        // Fallback for Evans Kochoo
        if (params.id === 'evans-kochoo' || params.id === '1') {
          setLeader({
            id: 'evans-kochoo',
            name: 'Rev. Evans O. Kochoo',
            title: 'Senior Pastor',
            bio: 'I am Evans O. Kochoo, fondly known as The Eagle, a passionate servant of God driven by a dynamic apostolic mandate to disseminate the pure and unadulterated Gospel of Jesus Christ.',
            imageUrl: null,
            orderIndex: 1
          })
        }
      } finally {
        setLoading(false)
      }
    }

    fetchLeader()
  }, [params.id])

  // Special handling for Rev. Evans Kochoo
  const isEvansKochoo = leader?.name.toLowerCase().includes('evans') || params.id === 'evans-kochoo' || params.id === '1'

  if (loading) {
    return (
      <main>
        <Header />
        <div className={styles.loading}>Loading...</div>
        <Footer />
      </main>
    )
  }

  if (!leader) {
    return (
      <main>
        <Header />
        <div className={styles.container}>
          <div className={styles.notFound}>
            <h1>Leader Not Found</h1>
            <Link href="/leadership" className={styles.backLink}>
              ← Back to Leadership
            </Link>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main>
      <Header />
      <div className={styles.container}>
        {isEvansKochoo ? (
          <EvansKochooProfile />
        ) : (
          <StandardLeaderProfile leader={leader} />
        )}
      </div>
      <Footer />
    </main>
  )
}

function StandardLeaderProfile({ leader }: { leader: Leader }) {
  return (
    <>
      <div className={styles.hero}>
        <Link href="/leadership" className={styles.backLink}>
          ← Back to Leadership
        </Link>
        <div className={styles.leaderHeader}>
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
              <span>{leader.name.charAt(0)}</span>
            </div>
          )}
          <div className={styles.leaderInfo}>
            <h1 className={styles.leaderName}>{leader.name}</h1>
            <p className={styles.leaderTitle}>{leader.title}</p>
          </div>
        </div>
      </div>

      {leader.bio && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>About</h2>
          <p className={styles.bio}>{leader.bio}</p>
        </section>
      )}
    </>
  )
}

function EvansKochooProfile() {
  return (
    <>
      <div className={styles.hero}>
        <Link href="/leadership" className={styles.backLink}>
          ← Back to Leadership
        </Link>
        <div className={styles.evansHero}>
          <div className={styles.evansHeader}>
            <h1 className={styles.evansName}>Evans O. Kochoo</h1>
            <p className={styles.evansTagline}>Defying Gravity, Impacting Generations</p>
            <p className={styles.evansTitle}>Rev. Evans O. Kochoo</p>
          </div>
          <div className={styles.evansQuote}>
            <p className={styles.quoteText}>"If you walk in the spirit, you'll never be stuck"</p>
            <p className={styles.quoteTagline}>Defying Gravity, Impacting Generations</p>
          </div>
        </div>
      </div>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Vision Statement</h2>
        <p className={styles.visionText}>
          To raise, equip, and release Kingdom-minded leaders who will impact generations by living out the uncompromised truth of the Gospel.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Profile</h2>
        <p className={styles.bio}>
          I am Evans O. Kochoo, fondly known as <strong>The Eagle</strong>, a passionate servant of God driven by a dynamic apostolic mandate to disseminate the pure and unadulterated Gospel of Jesus Christ.
        </p>
        <p className={styles.bio}>
          Through in-depth and thought-provoking teachings, I aim to ignite zeal, inspire purpose, and ultimately transform lives.
        </p>
        <p className={styles.bio}>
          My ministry spans diverse platforms, shaping individuals, leaders, and communities with the uncompromising truth of God's Word.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Professional Qualifications</h2>
        <p className={styles.bio}>
          Evans Kochoo is a dedicated church leader and transformational speaker with a solid foundation in biblical studies, theology, and ministry leadership.
        </p>
        <ul className={styles.qualificationsList}>
          <li>Diploma in Bible & Church Ministry</li>
          <li>Diploma in Bible & Theology</li>
          <li>Certificate in Biblical Transforming Leadership & Governance</li>
          <li>Certificate in Computer Literacy</li>
        </ul>
        <p className={styles.bio}>
          With a keen embrace of modern tools, Evans also holds a Certificate in Computer Literacy, enabling him to merge faith and technology for effective ministry, leadership, and community impact.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Areas of Ministry & Calling</h2>
        <div className={styles.ministryGrid}>
          <div className={styles.ministryCard}>
            <h3 className={styles.ministryTitle}>School, College & University Ministry</h3>
            <p className={styles.ministryDescription}>Raising a generation rooted in Christ.</p>
          </div>
          <div className={styles.ministryCard}>
            <h3 className={styles.ministryTitle}>Training & Equipping Ministers/Leaders</h3>
            <p className={styles.ministryDescription}>Building capacity for effective Kingdom service.</p>
          </div>
          <div className={styles.ministryCard}>
            <h3 className={styles.ministryTitle}>Relationship Coaching</h3>
            <p className={styles.ministryDescription}>Guiding individuals and couples toward Christ-centered relationships.</p>
          </div>
          <div className={styles.ministryCard}>
            <h3 className={styles.ministryTitle}>Keynote Speaking & Media Commentary</h3>
            <p className={styles.ministryDescription}>Delivering life-changing insights at conferences, workshops, and media platforms.</p>
          </div>
          <div className={styles.ministryCard}>
            <h3 className={styles.ministryTitle}>Mentorship</h3>
            <p className={styles.ministryDescription}>Shaping lives through discipleship and guidance.</p>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Core Skills & Competencies</h2>
        <div className={styles.skillsGrid}>
          <div className={styles.skillItem}>Apostolic teaching and preaching</div>
          <div className={styles.skillItem}>Leadership training and development</div>
          <div className={styles.skillItem}>Inspirational keynote speaking</div>
          <div className={styles.skillItem}>Counseling and relationship coaching</div>
          <div className={styles.skillItem}>Mentorship and discipleship</div>
          <div className={styles.skillItem}>Media communication and commentary</div>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Ministry in Pictures</h2>
        <p className={styles.bio}>Photos from ministry events and services coming soon.</p>
        <div className={styles.galleryPlaceholder}>
          <p>Gallery will be displayed here</p>
        </div>
      </section>
    </>
  )
}
