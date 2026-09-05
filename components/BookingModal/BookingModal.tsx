'use client';

import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'sonner';

import Modal from '@/components/Modal/Modal';
import {
  bookingSchema,
  type BookingFormValues,
} from '@/schemas/bookingSchema';
import type { Teacher } from '@/types/teacher';

import styles from './BookingModal.module.css';

interface BookingModalProps {
  teacher: Teacher;
  onClose: () => void;
}

export default function BookingModal({
  teacher,
  onClose,
}: BookingModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<BookingFormValues>({
    resolver: yupResolver(bookingSchema),
  });

 const onSubmit = async (values: BookingFormValues) => {
  try {
    console.log('Booking data:', {
      teacherId: teacher.id,
      teacherName: `${teacher.name} ${teacher.surname}`,
      ...values,
    });

    reset();
    onClose();

    toast.success('Trial lesson booked successfully!');
  } catch (error) {
    console.error('Failed to book trial lesson:', error);

    toast.error(
      'Something went wrong. Please try again.',
    );
  }
};

  return (
    <Modal onClose={onClose}>
      <div className={styles.wrapper}>
        <h2 className={styles.title}>
          Book trial lesson
        </h2>

        <p className={styles.description}>
          Our experienced tutor will assess your current
          language level, discuss your learning goals,
          and tailor the lesson to your specific needs.
        </p>

        <div className={styles.teacher}>
          <Image
            src={teacher.avatar_url}
            alt={`${teacher.name} ${teacher.surname}`}
            width={44}
            height={44}
            className={styles.avatar}
          />

          <div>
            <p className={styles.teacherLabel}>
              Your teacher
            </p>

            <p className={styles.teacherName}>
              {teacher.name} {teacher.surname}
            </p>
          </div>
        </div>

        <form
          className={styles.form}
          onSubmit={handleSubmit(onSubmit)}
        >
          <fieldset className={styles.reasonGroup}>
            <legend className={styles.reasonTitle}>
              What is your main reason for learning English?
            </legend>

            <label className={styles.radioLabel}>
              <input
                type="radio"
                value="career"
                {...register('reason')}
              />
              <span>Career and business</span>
            </label>

            <label className={styles.radioLabel}>
              <input
                type="radio"
                value="children"
                {...register('reason')}
              />
              <span>Lesson for kids</span>
            </label>

            <label className={styles.radioLabel}>
              <input
                type="radio"
                value="abroad"
                {...register('reason')}
              />
              <span>Living abroad</span>
            </label>

            <label className={styles.radioLabel}>
              <input
                type="radio"
                value="exams"
                {...register('reason')}
              />
              <span>Exams and coursework</span>
            </label>

            <label className={styles.radioLabel}>
              <input
                type="radio"
                value="culture"
                {...register('reason')}
              />
              <span>Culture, travel or hobby</span>
            </label>

            {errors.reason && (
              <p className={styles.error}>
                {errors.reason.message}
              </p>
            )}
          </fieldset>

          <div className={styles.field}>
            <input
              type="text"
              placeholder="Full Name"
              className={styles.input}
              {...register('name')}
            />

            {errors.name && (
              <p className={styles.error}>
                {errors.name.message}
              </p>
            )}
          </div>

          <div className={styles.field}>
            <input
              type="email"
              placeholder="Email"
              className={styles.input}
              {...register('email')}
            />

            {errors.email && (
              <p className={styles.error}>
                {errors.email.message}
              </p>
            )}
          </div>

          <div className={styles.field}>
            <input
              type="tel"
              placeholder="Phone number"
              className={styles.input}
              {...register('phone')}
            />

            {errors.phone && (
              <p className={styles.error}>
                {errors.phone.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className={styles.submitButton}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Booking...' : 'Book'}
          </button>
        </form>
      </div>
    </Modal>
  );
}