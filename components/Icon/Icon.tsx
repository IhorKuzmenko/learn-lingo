import type { SVGProps } from 'react';

import styles from './Icon.module.css';

export type IconName =
  | 'star'
  | 'online'
  | 'logo'
  | 'log-in'
  | 'like'
  | 'eye-off'
  | 'close-icon'
  | 'book-open';

interface IconProps extends SVGProps<SVGSVGElement> {
  name: IconName;
}

export default function Icon({
  name,
  className = '',
  ...props
}: IconProps) {
  return (
    <svg
      className={`${styles.icon} ${className}`}
      aria-hidden="true"
      {...props}
    >
      <use href={`/icons/sprite.svg#${name}`} />
    </svg>
  );
}