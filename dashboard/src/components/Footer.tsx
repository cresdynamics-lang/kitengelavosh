'use client'

import styles from './Footer.module.css'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerContent}>
          <div className={styles.footerSection}>
            <h3 className={styles.footerTitle}>VOSH CHURCH INT'L KITENGELA</h3>
            <p className={styles.footerDescription}>
              Voice of Salvation and Healing Church International
            </p>
            <p className={styles.slogan}>
              <strong>ONE WAY</strong> • <strong>ONE JOB</strong>
            </p>
          </div>

          <div className={styles.footerSection}>
            <h4 className={styles.footerHeading}>Quick Links</h4>
            <ul className={styles.footerLinks}>
              <li><a href="/">Home</a></li>
              <li><a href="/about">About Us</a></li>
              <li><a href="/services">Services</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </div>

          <div className={styles.footerSection}>
            <h4 className={styles.footerHeading}>Core Values</h4>
            <ul className={styles.footerValues}>
              <li>Prayer</li>
              <li>Stewardship</li>
              <li>Holiness</li>
              <li>Advocacy</li>
              <li>Unity</li>
            </ul>
          </div>

          <div className={styles.footerSection}>
            <h4 className={styles.footerHeading}>Contact</h4>
            <p className={styles.footerText}>
              Kitengela, Kenya
              <br />
              Along Baraka Road / Treewa Road
              <br />
              Next to Balozi Junior Academy
            </p>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <p className={styles.copyright}>
            © {currentYear} VOSH Church International Kitengela. All rights reserved.
          </p>
          <p className={styles.hashtags}>
            #House_of_Solutions • #MANIFESTING_CHRIST
          </p>
        </div>
      </div>
    </footer>
  )
}
