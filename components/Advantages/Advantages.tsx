"use client";

import { advantages } from "@/constants/advantages";
import { themes } from "@/constants/themes";
import { useTheme } from "@/hooks/useTheme";

import styles from "./Advantages.module.css";

export default function Advantages() {
  const { theme } = useTheme();
  const currentTheme = themes[theme];

  return (
    <section className={styles.advantages}>
      <svg className={styles.border} aria-hidden="true">
        <rect
          x="0.75"
          y="0.75"
          width="calc(100% - 1.5px)"
          height="calc(100% - 1.5px)"
          rx="30"
          fill="none"
          stroke={currentTheme.main}
          strokeWidth="1.5"
          strokeDasharray="15 15"
        />
      </svg>

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