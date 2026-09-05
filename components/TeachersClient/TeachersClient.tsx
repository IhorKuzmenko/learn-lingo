'use client';

import { useEffect, useMemo, useState } from 'react';

import Filters, {
  type TeacherFilters,
} from '@/components/Filters/Filters';
import TeacherList from '@/components/TeacherList/TeacherList';
import {
  getAllTeachers,
  getTeachersPage,
} from '@/lib/teachers';
import type { Teacher } from '@/types/teacher';

import styles from './TeachersClient.module.css';

const TEACHERS_PER_PAGE = 4;

export default function TeachersClient() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [allTeachers, setAllTeachers] = useState<Teacher[]>([]);

  const [filters, setFilters] = useState<TeacherFilters>({
    language: '',
    level: '',
    price: '',
  });

  const [lastKey, setLastKey] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);

  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isFiltering, setIsFiltering] = useState(false);

  const [visibleFilteredCount, setVisibleFilteredCount] =
    useState(TEACHERS_PER_PAGE);

  const hasActiveFilters =
    filters.language !== '' ||
    filters.level !== '' ||
    filters.price !== '';

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

  useEffect(() => {
    if (!hasActiveFilters || allTeachers.length > 0) {
      return;
    }

    async function loadAllTeachers() {
      try {
        setIsFiltering(true);

        const result = await getAllTeachers();

        setAllTeachers(result);
      } catch (error) {
        console.error(
          'Failed to load teachers for filtering:',
          error,
        );
      } finally {
        setIsFiltering(false);
      }
    }

    loadAllTeachers();
  }, [hasActiveFilters, allTeachers.length]);

  const filteredTeachers = useMemo(() => {
    if (!hasActiveFilters) {
      return teachers;
    }

    return allTeachers.filter((teacher) => {
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
  }, [
    allTeachers,
    teachers,
    filters,
    hasActiveFilters,
  ]);

  const visibleTeachers = hasActiveFilters
    ? filteredTeachers.slice(0, visibleFilteredCount)
    : filteredTeachers;

  const hasMoreFilteredTeachers =
    hasActiveFilters &&
    visibleFilteredCount < filteredTeachers.length;

  const handleFiltersChange = (
    newFilters: TeacherFilters,
  ) => {
    setFilters(newFilters);
    setVisibleFilteredCount(TEACHERS_PER_PAGE);
  };

  const handleLoadMore = async () => {
    if (hasActiveFilters) {
      setVisibleFilteredCount(
        (previousCount) =>
          previousCount + TEACHERS_PER_PAGE,
      );

      return;
    }

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

  if (hasActiveFilters && isFiltering) {
    return (
      <>
        <Filters onChange={handleFiltersChange} />

        <p className={styles.status}>
          Filtering teachers...
        </p>
      </>
    );
  }

  return (
    <>
      <Filters onChange={handleFiltersChange} />

      {visibleTeachers.length > 0 ? (
        <>
          <TeacherList teachers={visibleTeachers} />

          {((!hasActiveFilters && hasMore) ||
            hasMoreFilteredTeachers) && (
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