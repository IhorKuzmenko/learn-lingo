import Link from 'next/link';

import Container from '@/components/Container/Container';
import Icon from '@/components/Icon/Icon';

import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <Container>
        <div className={styles.wrapper}>
          <Link href="/" className={styles.logo}>
            <Icon name="logo" width={28} height={28} />
            <span>LearnLingo</span>
          </Link>

          <nav className={styles.navigation}>
            <Link href="/" className={styles.navLink}>
              Home
            </Link>

            <Link href="/teachers" className={styles.navLink}>
              Teachers
            </Link>
          </nav>

          <div className={styles.auth}>
            <button type="button" className={styles.loginButton}>
              <Icon name="log-in" width={20} height={20} />
              <span>Log in</span>
            </button>

            <button type="button" className={styles.registrationButton}>
              Registration
            </button>
          </div>
        </div>
      </Container>
    </header>
  );
}