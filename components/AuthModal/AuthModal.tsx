'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Icon from '@/components/Icon/Icon';
import Modal from '@/components/Modal/Modal';
import { useAuth } from '@/hooks/useAuth';
import {
  loginSchema,
  registerSchema,
  type AuthFormValues,
} from '@/schemas/authSchema';

import styles from './AuthModal.module.css';

interface AuthModalProps {
  mode: 'login' | 'register';
  onClose: () => void;
}

export default function AuthModal({
  mode,
  onClose,
}: AuthModalProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');

  const { login, register: registerUser } = useAuth();

  const isLogin = mode === 'login';

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AuthFormValues>({
    resolver: yupResolver(
      isLogin ? loginSchema : registerSchema,
    ),
  });

  const onSubmit = async (values: AuthFormValues) => {
    try {
      setAuthError('');

      if (isLogin) {
        await login(values.email, values.password);
      } else {
        await registerUser(
          values.name ?? '',
          values.email,
          values.password,
        );
      }

      onClose();
    } catch (error) {
      console.error('Authentication failed:', error);

      setAuthError(
        isLogin
          ? 'Invalid email or password.'
          : 'Failed to create account. Please try again.',
      );
    }
  };

  return (
    <Modal onClose={onClose}>
      <div className={styles.wrapper}>
        <h2 className={styles.title}>
          {isLogin ? 'Log In' : 'Registration'}
        </h2>

        <p className={styles.description}>
          {isLogin
            ? 'Welcome back! Please enter your credentials to access your account and continue your search for a teacher.'
            : 'Thank you for your interest in our platform! In order to register, we need some information. Please provide us with the following information.'}
        </p>

        <form
          className={styles.form}
          onSubmit={handleSubmit(onSubmit)}
        >
          {!isLogin && (
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
            <div className={styles.passwordWrapper}>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                className={`${styles.input} ${styles.passwordInput}`}
                {...register('password')}
              />

              <button
                type="button"
                className={styles.passwordToggle}
                onClick={() =>
                  setShowPassword((prev) => !prev)
                }
                aria-label={
                  showPassword
                    ? 'Hide password'
                    : 'Show password'
                }
              >
                <Icon
                  name="eye-off"
                  width={20}
                  height={20}
                />
              </button>
            </div>

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
              : isLogin
                ? 'Log In'
                : 'Sign Up'}
          </button>
        </form>
      </div>
    </Modal>
  );
}