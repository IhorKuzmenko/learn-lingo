import { advantages } from '@/constants/advantages';

import styles from './Advantages.module.css';

export default function Advantages() {
  return (
    <section className={styles.advantages}>
      <ul className={styles.list}>
        {advantages.map(({ value, label }) => (
          <li key={label} className={styles.item}>
            <p className={styles.value}>{value}</p>
            <p className={styles.label}>{label}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}