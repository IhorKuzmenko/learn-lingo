import Container from '@/components/Container/Container';
import TeachersClient from '@/components/TeachersClient/TeachersClient';

import styles from './TeachersPage.module.css';

export default function TeachersPage() {
  return (
    <main className={styles.main}>
      <Container>
        <TeachersClient />
      </Container>
    </main>
  );
}