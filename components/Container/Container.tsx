import type { PropsWithChildren } from 'react';

import styles from './Container.module.css';

interface ContainerProps extends PropsWithChildren {
  className?: string;
}

export default function Container({
  children,
  className = '',
}: ContainerProps) {
  return (
    <div className={`${styles.container} ${className}`}>
      {children}
    </div>
  );
}