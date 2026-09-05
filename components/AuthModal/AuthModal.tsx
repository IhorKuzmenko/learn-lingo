'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Modal from '@/components/Modal/Modal';
import { useAuth } from '@/hooks/useAuth';
import {
  loginSchema,
  registerSchema,
} from '@/schemas/authSchema';

import styles from './AuthModal.module.css';

interface AuthModalProps {
  mode: 'login' | 'register';
  onClose: () => void;
}

interface AuthFormValues {
  name?: string;
  email: string;
  password: string;
}

export default function AuthModal({
  mode,
  onClose,
}: AuthModalProps) {
  const [currentMode, setCurrentMode] =
    useState<'login' | 'register'>(mode);

  const [authError, setAuthError] = useState('');

  const { login, register: registerUser } = useAuth();

  const isRegister = currentMode === 'register';

  const schema = isRegister
    ? registerSchema
    : loginSchema;

  const {
    register,
    handleSubmit,
    reset,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<AuthFormValues>({
    resolver: yupResolver(schema),
  });

  const handleModeChange = (
    newMode: 'login' | 'register',
  ) => {
    setCurrentMode(newMode);
    setAuthError('');
    reset();
  };

  const onSubmit = async (
    values: AuthFormValues,
  ) => {
    try {
      setAuthError('');

      if (isRegister) {
        await registerUser(
          values.name ?? '',
          values.email,
          values.password,
        );
      } else {
        await login(
          values.email,
          values.password,
        );
      }

      onClose();
    } catch (error) {
      console.error(error);

      setAuthError(
        isRegister
          ? 'Failed to create account.'
          : 'Invalid email or password.',
      );
    }
  };

  return (
    <Modal onClose={onClose}>
      <div className={styles.wrapper}>
        <h2 className={styles.title}>
          {isRegister
            ? 'Registration'
            : 'Log In'}
        </h2>

        <p className={styles.description}>
          {isRegister
            ? 'Thank you for your interest in our platform! In order to register, we need some information. Please provide us with the following information.'
            : 'Welcome back! Please enter your credentials to access your account and continue your search for a teacher.'}
        </p>

        <form
          className={styles.form}
          onSubmit={handleSubmit(onSubmit)}
        >
          {isRegister && (
            <div className={styles.field}>
              <input
                type="text"
                placeholder="Name"
                className={styles.input}
                {...register('name')}
              />

              {errors.name && (
                <p className={styles.error}>
                  {errors.name.message}
                </p>
              )}
            </div>
          )}

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
              type="password"
              placeholder="Password"
              className={styles.input}
              {...register('password')}
            />

            {errors.password && (
              <p className={styles.error}>
                {errors.password.message}
              </p>
            )}
          </div>

          {authError && (
            <p className={styles.authError}>
              {authError}
            </p>
          )}

          <button
            type="submit"
            className={styles.submitButton}
            disabled={isSubmitting}
          >
            {isSubmitting
              ? 'Please wait...'
              : isRegister
                ? 'Sign Up'
                : 'Log In'}
          </button>
        </form>

        <button
          type="button"
          className={styles.switchButton}
          onClick={() =>
            handleModeChange(
              isRegister
                ? 'login'
                : 'register',
            )
          }
        >
          {isRegister
            ? 'Already have an account? Log in'
            : 'Don’t have an account? Register'}
        </button>
      </div>
    </Modal>
  );
}