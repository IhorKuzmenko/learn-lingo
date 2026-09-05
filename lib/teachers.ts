import {
  get,
  limitToFirst,
  orderByKey,
  query,
  ref,
  startAfter,
} from 'firebase/database';

import { database } from '@/lib/firebase';
import type { Teacher } from '@/types/teacher';

interface TeachersPageResult {
  teachers: Teacher[];
  lastKey: string | null;
  hasMore: boolean;
}

export async function getTeachersPage(
  limit = 4,
  lastKey?: string | null,
): Promise<TeachersPageResult> {
  const teachersRef = ref(database, 'teachers');

  const teachersQuery = lastKey
    ? query(
        teachersRef,
        orderByKey(),
        startAfter(lastKey),
        limitToFirst(limit + 1),
      )
    : query(
        teachersRef,
        orderByKey(),
        limitToFirst(limit + 1),
      );

  const snapshot = await get(teachersQuery);

  if (!snapshot.exists()) {
    return {
      teachers: [],
      lastKey: null,
      hasMore: false,
    };
  }

  const data = snapshot.val();

  const entries = Object.entries(data);

  const hasMore = entries.length > limit;

  const visibleEntries = hasMore
    ? entries.slice(0, limit)
    : entries;

  const teachers = visibleEntries.map(
    ([id, teacher]) => ({
      id,
      ...(teacher as Omit<Teacher, 'id'>),
    }),
  );

  return {
    teachers,
    lastKey:
      visibleEntries.length > 0
        ? visibleEntries[visibleEntries.length - 1][0]
        : null,
    hasMore,
  };
}

export async function getTeachersByIds(
  ids: string[],
): Promise<Teacher[]> {
  if (ids.length === 0) {
    return [];
  }

  const teachers = await Promise.all(
    ids.map(async (id) => {
      const teacherRef = ref(database, `teachers/${id}`);
      const snapshot = await get(teacherRef);

      if (!snapshot.exists()) {
        return null;
      }

      return {
        id,
        ...(snapshot.val() as Omit<Teacher, 'id'>),
      };
    }),
  );

  return teachers.filter(
    (teacher): teacher is Teacher => teacher !== null,
  );
}