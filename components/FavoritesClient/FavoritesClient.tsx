'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import TeacherList from '@/components/TeacherList/TeacherList';
import { useAuth } from '@/hooks/useAuth';
import { useFavorites } from '@/hooks/useFavorites';
import { getTeachersByIds } from '@/lib/teachers';
import type { Teacher } from '@/types/teacher';

import styles from './FavoritesClient.module.css';

export default function FavoritesClient() {
  const router = useRouter();

  const { user, isLoading: isAuthLoading } = useAuth();
  const {
    favorites,
    isLoading: isFavoritesLoading,
  } = useFavorites();

  const [teachers, setTeachers] = useState<Teacher[]>([]);

  useEffect(() => {
    if (isAuthLoading) {
      return;
    }

    if (!user) {
      router.replace('/');
    }
  }, [user, isAuthLoading, router]);

  useEffect(() => {
    if (!user || isFavoritesLoading) {
      return;
    }

    let cancelled = false;

    getTeachersByIds(favorites)
      .then((favoriteTeachers) => {
        if (!cancelled) {
          setTeachers(favoriteTeachers);
        }
      })
      .catch((error) => {
        console.error(
          'Failed to load favorite teachers:',
          error,
        );
      });

    return () => {
      cancelled = true;
    };
  }, [user, favorites, isFavoritesLoading]);

  if (isAuthLoading || isFavoritesLoading) {
    return (
      <p className={styles.status}>
        Loading favorites...
      </p>
    );
  }

  if (!user) {
    return null;
  }

  if (teachers.length === 0) {
    return (
      <p className={styles.status}>
        You haven&apos;t added any teachers to favorites yet.
      </p>
    );
  }

  return <TeacherList teachers={teachers} />;
}