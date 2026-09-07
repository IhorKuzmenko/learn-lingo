"use client";

import { advantages } from "@/constants/advantages";
import { themes } from "@/constants/themes";
import { useTheme } from "@/hooks/useTheme";

import styles from "./Advantages.module.css";

export default function Advantages() {
  const { theme } = useTheme();
  const currentTheme = themes[theme];

  return (
    <section
      className={styles.advantages}
      style={{
        borderColor: currentTheme.main,
      }}
    >
      <ul className={styles.list}>
        {advantages.map((advantage) => (
          <li key={advantage.label} className={styles.item}>
            <p className={styles.value}>{advantage.value}</p>

            <p className={styles.label}>{advantage.label}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
