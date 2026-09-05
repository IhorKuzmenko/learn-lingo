'use client';

import { useEffect, useMemo, useState } from 'react';

import Filters, {
  type TeacherFilters,
} from '@/components/Filters/Filters';
import TeacherList from '@/components/TeacherList/TeacherList';
import { getTeachersPage } from '@/lib/teachers';
import type { Teacher } from '@/types/teacher';

import styles from './TeachersClient.module.css';

const TEACHERS_PER_PAGE = 4;

export default function TeachersClient() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);

  const [filters, setFilters] = useState<TeacherFilters>({
    language: '',
    level: '',
    price: '',
  });

  const [lastKey, setLastKey] = useState<string | null>(null);

  const [hasMore, setHasMore] = useState(true);

  const [isLoading, setIsLoading] = useState(true);

  const [isLoadingMore, setIsLoadingMore] = useState(false);

  useEffect(() => {
    async function loadInitialTeachers() {
      try {
        setIsLoading(true);

        const result = await getTeachersPage(
          TEACHERS_PER_PAGE,
        );

        setTeachers(result.teachers);
        setLastKey(result.lastKey);
        setHasMore(result.hasMore);
      } catch (error) {
        console.error(
          'Failed to load teachers:',
          error,
        );
      } finally {
        setIsLoading(false);
      }
    }

    loadInitialTeachers();
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

      return (
        matchesLanguage &&
        matchesLevel &&
        matchesPrice
      );
    });
  }, [teachers, filters]);

  const handleLoadMore = async () => {
    if (!lastKey || isLoadingMore) {
      return;
    }

    try {
      setIsLoadingMore(true);

      const result = await getTeachersPage(
        TEACHERS_PER_PAGE,
        lastKey,
      );

      setTeachers((previousTeachers) => [
        ...previousTeachers,
        ...result.teachers,
      ]);

      setLastKey(result.lastKey);
      setHasMore(result.hasMore);
    } catch (error) {
      console.error(
        'Failed to load more teachers:',
        error,
      );
    } finally {
      setIsLoadingMore(false);
    }
  };

  if (isLoading) {
    return (
      <p className={styles.status}>
        Loading teachers...
      </p>
    );
  }

  return (
    <>
      <Filters onChange={setFilters} />

      {filteredTeachers.length > 0 ? (
        <>
          <TeacherList
            teachers={filteredTeachers}
          />

          {hasMore && (
            <div className={styles.loadMoreWrapper}>
              <button
                type="button"
                className={styles.loadMore}
                onClick={handleLoadMore}
                disabled={isLoadingMore}
              >
                {isLoadingMore
                  ? 'Loading...'
                  : 'Load more'}
              </button>
            </div>
          )}
        </>
      ) : (
        <p className={styles.empty}>
          No teachers found.
        </p>
      )}
    </>
  );
}