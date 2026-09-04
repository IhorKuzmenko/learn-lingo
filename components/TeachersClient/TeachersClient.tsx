'use client';

import { useEffect, useMemo, useState } from 'react';

import Filters, {
  type TeacherFilters,
} from '@/components/Filters/Filters';
import TeacherList from '@/components/TeacherList/TeacherList';
import { getTeachers } from '@/lib/teachers';
import type { Teacher } from '@/types/teacher';

import styles from './TeachersClient.module.css';

export default function TeachersClient() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);

  const [filters, setFilters] = useState<TeacherFilters>({
    language: '',
    level: '',
    price: '',
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadTeachers() {
      try {
        setIsLoading(true);

        const data = await getTeachers(4);

        setTeachers(data);
      } catch (error) {
        console.error('Failed to load teachers:', error);
      } finally {
        setIsLoading(false);
      }
    }

    loadTeachers();
  }, []);

  const filteredTeachers = useMemo(() => {
    return teachers.filter((teacher) => {
      const matchesLanguage =
        !filters.language ||
        teacher.languages.includes(filters.language);

      const matchesLevel =
        !filters.level ||
        teacher.levels.includes(filters.level);

      const matchesPrice =
        !filters.price ||
        teacher.price_per_hour <= Number(filters.price);

      return matchesLanguage && matchesLevel && matchesPrice;
    });
  }, [teachers, filters]);

  if (isLoading) {
    return <p className={styles.status}>Loading teachers...</p>;
  }

  return (
    <>
      <Filters onChange={setFilters} />

      {filteredTeachers.length > 0 ? (
        <TeacherList teachers={filteredTeachers} />
      ) : (
        <p className={styles.empty}>
          No teachers found.
        </p>
      )}
    </>
  );
}