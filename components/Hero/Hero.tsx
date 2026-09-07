"use client";

import Image from "next/image";
import Link from "next/link";

import { themes } from "@/constants/themes";
import { useTheme } from "@/hooks/useTheme";

import styles from "./Hero.module.css";

export default function Hero() {
  const { theme } = useTheme();
  const currentTheme = themes[theme];

  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <h1 className={styles.title}>
          Unlock your potential with the best{" "}
          <span
            className={styles.accent}
            style={
              {
                "--theme-light": currentTheme.light,
              } as React.CSSProperties
            }
          >
            language
          </span>
          tutors
        </h1>

        <p className={styles.description}>
          Embark on an Exciting Language Journey with Expert Language Tutors:
          Elevate your language proficiency to new heights by connecting with
          highly qualified and experienced tutors.
        </p>

        <Link
          href="/teachers"
          className={styles.button}
          style={{
            backgroundColor: currentTheme.main,
          }}
        >
          Get started
        </Link>
      </div>

      <div
        className={styles.imageWrapper}
        style={{
          backgroundColor: currentTheme.light,
        }}
      >
        <Image
          src={currentTheme.heroImage}
          alt="Language learning"
          fill
          priority
          sizes="568px"
          className={styles.image}
        />
      </div>
    </section>
  );
}
