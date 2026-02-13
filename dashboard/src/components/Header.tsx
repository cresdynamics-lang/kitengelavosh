'use client'

import Image from 'next/image'
import Link from 'next/link'
import styles from './Header.module.css'

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logoContainer}>
          <Link href="/" className={styles.logoLink}>
            <Image
              src="/logo/chuurchlogo.jpeg"
              alt="VOSH Church Logo"
              width={80}
              height={80}
              className={styles.logo}
              priority
            />
            <div className={styles.logoText}>
              <h1 className={styles.churchName}>VOSH CHURCH INT'L</h1>
              <p className={styles.location}>KITENGELA</p>
            </div>
          </Link>
        </div>
        <nav className={styles.nav}>
          <Link href="/" className={styles.navLink}>Home</Link>
          <Link href="/about" className={styles.navLink}>About</Link>
          <Link href="/services" className={styles.navLink}>Services</Link>
          <Link href="/contact" className={styles.navLink}>Contact</Link>
        </nav>
      </div>
    </header>
  )
}
