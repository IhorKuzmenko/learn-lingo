import Container from '@/components/Container/Container';
import FavoritesClient from '@/components/FavoritesClient/FavoritesClient';

import styles from './FavoritesPage.module.css';

export default function FavoritesPage() {
  return (
    <main className={styles.main}>
      <Container>
        <FavoritesClient />
      </Container>
    </main>
  );
}