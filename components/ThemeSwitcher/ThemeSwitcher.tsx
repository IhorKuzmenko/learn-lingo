"use client";

import { themes, type AppTheme } from "@/constants/themes";
import { useTheme } from "@/hooks/useTheme";

import styles from "./ThemeSwitcher.module.css";

const themeOrder: AppTheme[] = ["yellow", "green", "blue", "red", "orange"];

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <div className={styles.switcher}>
      {themeOrder.map((themeName) => {
        const config = themes[themeName];
        const isActive = theme === themeName;

        return (
          <button
            key={themeName}
            type="button"
            className={`${styles.colorButton} ${isActive ? styles.active : ""}`}
            style={{
              backgroundColor: config.main,
            }}
            onClick={() => setTheme(themeName)}
            aria-label={`Switch to ${themeName} theme`}
            aria-pressed={isActive}
          />
        );
      })}
    </div>
  );
}
