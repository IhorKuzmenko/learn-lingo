'use client';

import { useEffect, useState } from 'react';
import {
  onValue,
  ref,
  remove,
  set,
} from 'firebase/database';

import { useAuth } from '@/hooks/useAuth';
import { database } from '@/lib/firebase';

export function useFavorites() {
  const { user } = useAuth();

  const [favorites, setFavorites] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      return;
    }

    const favoritesRef = ref(
      database,
      `users/${user.uid}/favorites`,
    );

    const unsubscribe = onValue(
      favoritesRef,
      (snapshot) => {
        if (!snapshot.exists()) {
          setFavorites([]);
          setIsLoading(false);
          return;
        }

        const data = snapshot.val();

        setFavorites(Object.keys(data));
        setIsLoading(false);
      },
    );

    return unsubscribe;
  }, [user]);

  const isFavorite = (teacherId: string) => {
    if (!user) {
      return false;
    }

    return favorites.includes(teacherId);
  };

  const addFavorite = async (teacherId: string) => {
    if (!user) {
      return;
    }

    const favoriteRef = ref(
      database,
      `users/${user.uid}/favorites/${teacherId}`,
    );

    await set(favoriteRef, true);
  };

  const removeFavorite = async (
    teacherId: string,
  ) => {
    if (!user) {
      return;
    }

    const favoriteRef = ref(
      database,
      `users/${user.uid}/favorites/${teacherId}`,
    );

    await remove(favoriteRef);
  };

  const toggleFavorite = async (
    teacherId: string,
  ) => {
    if (!user) {
      return;
    }

    if (isFavorite(teacherId)) {
      await removeFavorite(teacherId);
    } else {
      await addFavorite(teacherId);
    }
  };

  return {
    favorites: user ? favorites : [],
    isLoading: user ? isLoading : false,
    isFavorite,
    addFavorite,
    removeFavorite,
    toggleFavorite,
  };
}