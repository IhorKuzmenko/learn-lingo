import {
  get,
  limitToFirst,
  orderByKey,
  query,
  ref,
} from 'firebase/database';

import { database } from '@/lib/firebase';
import type { Teacher } from '@/types/teacher';

export async function getTeachers(
  limit = 4,
): Promise<Teacher[]> {
  const teachersRef = ref(database, 'teachers');

  const teachersQuery = query(
    teachersRef,
    orderByKey(),
    limitToFirst(limit),
  );

  const snapshot = await get(teachersQuery);

  if (!snapshot.exists()) {
    return [];
  }

  const data = snapshot.val();

  return Object.entries(data).map(([id, teacher]) => ({
    id,
    ...(teacher as Omit<Teacher, 'id'>),
  }));
}