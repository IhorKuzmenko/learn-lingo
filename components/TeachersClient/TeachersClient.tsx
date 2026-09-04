'use client';

import { useMemo, useState } from 'react';

import Filters, {
  type TeacherFilters,
} from '@/components/Filters/Filters';
import TeacherList from '@/components/TeacherList/TeacherList';
import type { Teacher } from '@/types/teacher';

import styles from './TeachersClient.module.css';

interface TeachersClientProps {
  teachers: Teacher[];
}

const INITIAL_VISIBLE_COUNT = 4;

export default function TeachersClient({
  teachers,
}: TeachersClientProps) {
  const [filters, setFilters] = useState<TeacherFilters>({
    language: '',
    level: '',
    price: '',
  });

  const [visibleCount, setVisibleCount] = useState(
    INITIAL_VISIBLE_COUNT,
  );

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

  const visibleTeachers = filteredTeachers.slice(
    0,
    visibleCount,
  );

  const hasMore =
    visibleCount < filteredTeachers.length;

  const handleFiltersChange = (
    newFilters: TeacherFilters,
  ) => {
    setFilters(newFilters);
    setVisibleCount(INITIAL_VISIBLE_COUNT);
  };

  const handleLoadMore = () => {
    setVisibleCount((previous) => previous + 4);
  };

  return (
    <>
      <Filters onChange={handleFiltersChange} />

      {visibleTeachers.length > 0 ? (
        <>
          <TeacherList teachers={visibleTeachers} />

          {hasMore && (
            <div className={styles.loadMoreWrapper}>
              <button
                type="button"
                className={styles.loadMore}
                onClick={handleLoadMore}
              >
                Load more
              </button>
            </div>
          )}
        </>
      ) : (
        <p className={styles.empty}>
          No teachers found for the selected filters.
        </p>
      )}
    </>
  );
}