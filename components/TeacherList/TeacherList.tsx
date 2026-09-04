import TeacherCard from '@/components/TeacherCard/TeacherCard';
import type { Teacher } from '@/types/teacher';

import styles from './TeacherList.module.css';

interface TeacherListProps {
  teachers: Teacher[];
}

export default function TeacherList({
  teachers,
}: TeacherListProps) {
  return (
    <ul className={styles.list}>
      {teachers.map((teacher) => (
        <li key={teacher.id}>
          <TeacherCard teacher={teacher} />
        </li>
      ))}
    </ul>
  );
}