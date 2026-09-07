import Advantages from '@/components/Advantages/Advantages';
import Container from '@/components/Container/Container';
import Hero from '@/components/Hero/Hero';
import ThemeSwitcher from '@/components/ThemeSwitcher/ThemeSwitcher';

import styles from './HomePage.module.css';

export default function Home() {
  return (
    <main className={styles.main}>
      <Container>
        <ThemeSwitcher />
        <Hero />
        <Advantages />
      </Container>
    </main>
  );
}