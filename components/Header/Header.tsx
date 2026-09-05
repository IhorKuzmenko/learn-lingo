'use client';

import { useState } from 'react';
import Link from 'next/link';

import AuthModal from '@/components/AuthModal/AuthModal';
import Container from '@/components/Container/Container';
import Icon from '@/components/Icon/Icon';
import { useAuth } from '@/hooks/useAuth';

import styles from './Header.module.css';

type AuthMode = 'login' | 'register';

export default function Header() {
  const [authMode, setAuthMode] = useState<AuthMode | null>(
    null,
  );

  const { user, logout, isLoading } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

  return (
    <>
      <header className={styles.header}>
        <Container>
          <div className={styles.wrapper}>
            <Link href="/" className={styles.logo}>
              <Icon
                name="logo"
                width={28}
                height={28}
              />

              <span>LearnLingo</span>
            </Link>

            <nav className={styles.navigation}>
              <Link
                href="/"
                className={styles.navLink}
              >
                Home
              </Link>

              <Link
                href="/teachers"
                className={styles.navLink}
              >
                Teachers
              </Link>

              {user && (
                <Link
                  href="/favorites"
                  className={styles.navLink}
                >
                  Favorites
                </Link>
              )}
            </nav>

            {!isLoading && (
              <div className={styles.auth}>
                {user ? (
                  <>
                    <span className={styles.userName}>
                      {user.displayName ||
                        user.email}
                    </span>

                    <button
                      type="button"
                      className={styles.logoutButton}
                      onClick={handleLogout}
                    >
                      Log out
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      type="button"
                      className={styles.loginButton}
                      onClick={() =>
                        setAuthMode('login')
                      }
                    >
                      <Icon
                        name="log-in"
                        width={20}
                        height={20}
                      />

                      <span>Log in</span>
                    </button>

                    <button
                      type="button"
                      className={
                        styles.registrationButton
                      }
                      onClick={() =>
                        setAuthMode('register')
                      }
                    >
                      Registration
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </Container>
      </header>

      {authMode && (
        <AuthModal
          mode={authMode}
          onClose={() => setAuthMode(null)}
        />
      )}
    </>
  );
}