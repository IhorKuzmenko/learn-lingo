import type { Teacher } from '@/types/teacher';

export const mockTeachers: Teacher[] = [
  {
    id: '1',
    name: 'Maria',
    surname: 'Rossi',
    languages: ['English', 'Italian'],
    levels: ['A1 Beginner', 'A2 Elementary', 'B1 Intermediate'],
    rating: 4.8,
    reviews: [
      {
        reviewer_name: 'Anna',
        reviewer_rating: 5,
        comment:
          'Maria is a wonderful teacher. The lessons are clear, friendly and very useful.',
      },
      {
        reviewer_name: 'John',
        reviewer_rating: 4.8,
        comment:
          'I really enjoy the lessons and feel much more confident speaking.',
      },
    ],
    price_per_hour: 25,
    lessons_done: 1375,
    avatar_url: 'https://ftp.goit.study/img/avatars/1.jpg',
    lesson_info:
      'The lessons are focused on speaking practice, vocabulary and grammar.',
    conditions: [
      'First lesson is free.',
      'Flexible schedule.',
    ],
    experience:
      'I have been teaching languages for more than 8 years. I work with students of different ages and levels and adapt every lesson to individual goals.',
  },
  {
    id: '2',
    name: 'David',
    surname: 'Brown',
    languages: ['English', 'German'],
    levels: ['A1 Beginner', 'B1 Intermediate', 'B2 Upper-Intermediate'],
    rating: 4.9,
    reviews: [
      {
        reviewer_name: 'Michael',
        reviewer_rating: 5,
        comment:
          'David explains difficult topics in a very simple and understandable way.',
      },
    ],
    price_per_hour: 30,
    lessons_done: 1100,
    avatar_url: 'https://ftp.goit.study/img/avatars/2.jpg',
    lesson_info:
      'Individual online lessons with a strong focus on conversation.',
    conditions: [
      'Trial lesson available.',
      'Homework on request.',
    ],
    experience:
      'I am a certified language teacher with experience in both individual and group lessons. My main goal is to help students speak naturally and confidently.',
  },
  {
    id: '3',
    name: 'Sophie',
    surname: 'Martin',
    languages: ['French', 'English'],
    levels: ['A2 Elementary', 'B1 Intermediate', 'C1 Advanced'],
    rating: 4.7,
    reviews: [
      {
        reviewer_name: 'Kate',
        reviewer_rating: 4.7,
        comment:
          'The lessons are interesting and always well prepared.',
      },
    ],
    price_per_hour: 20,
    lessons_done: 820,
    avatar_url: 'https://ftp.goit.study/img/avatars/3.jpg',
    lesson_info:
      'Lessons include pronunciation, vocabulary and real-life conversation.',
    conditions: [
      'Lessons can be rescheduled.',
      'Materials are included.',
    ],
    experience:
      'I have worked as a language tutor for several years and enjoy helping students reach their personal and professional goals.',
  },
  {
    id: '4',
    name: 'Lucas',
    surname: 'Miller',
    languages: ['English', 'Spanish'],
    levels: ['A1 Beginner', 'A2 Elementary', 'B2 Upper-Intermediate'],
    rating: 5,
    reviews: [
      {
        reviewer_name: 'Sarah',
        reviewer_rating: 5,
        comment:
          'Lucas is very patient and makes every lesson enjoyable.',
      },
    ],
    price_per_hour: 35,
    lessons_done: 1540,
    avatar_url: 'https://ftp.goit.study/img/avatars/4.jpg',
    lesson_info:
      'Interactive lessons with practical exercises and speaking practice.',
    conditions: [
      'Flexible working hours.',
      'Personal learning plan.',
    ],
    experience:
      'My teaching approach is based on practical communication. I help students improve their speaking skills through real-life topics and structured practice.',
  },
];