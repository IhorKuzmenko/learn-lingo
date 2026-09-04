'use client';

import { useState } from 'react';

import {
  languageOptions,
  levelOptions,
  priceOptions,
} from '@/constants/filters';

import styles from './Filters.module.css';

export interface TeacherFilters {
  language: string;
  level: string;
  price: string;
}

interface FiltersProps {
  onChange?: (filters: TeacherFilters) => void;
}

export default function Filters({ onChange }: FiltersProps) {
  const [filters, setFilters] = useState<TeacherFilters>({
    language: '',
    level: '',
    price: '',
  });

  const handleChange = (
    field: keyof TeacherFilters,
    value: string,
  ) => {
    const newFilters = {
      ...filters,
      [field]: value,
    };

    setFilters(newFilters);
    onChange?.(newFilters);
  };

  return (
    <div className={styles.filters}>
      <label className={styles.field}>
        <span className={styles.label}>Languages</span>

        <select
          className={styles.select}
          value={filters.language}
          onChange={(event) =>
            handleChange('language', event.target.value)
          }
        >
          <option value="">All languages</option>

          {languageOptions.map((language) => (
            <option key={language} value={language}>
              {language}
            </option>
          ))}
        </select>
      </label>

      <label className={styles.field}>
        <span className={styles.label}>Level of knowledge</span>

        <select
          className={`${styles.select} ${styles.levelSelect}`}
          value={filters.level}
          onChange={(event) =>
            handleChange('level', event.target.value)
          }
        >
          <option value="">All levels</option>

          {levelOptions.map((level) => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </select>
      </label>

      <label className={styles.field}>
        <span className={styles.label}>Price</span>

        <select
          className={`${styles.select} ${styles.priceSelect}`}
          value={filters.price}
          onChange={(event) =>
            handleChange('price', event.target.value)
          }
        >
          <option value="">All prices</option>

          {priceOptions.map((price) => (
            <option key={price} value={price}>
              {price} $
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}