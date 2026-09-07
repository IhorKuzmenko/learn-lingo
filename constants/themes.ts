export type AppTheme = "yellow" | "green" | "blue" | "red" | "orange";

export interface ThemeConfig {
  name: AppTheme;
  main: string;
  light: string;
  heroImage: string;
}

export const themes: Record<AppTheme, ThemeConfig> = {
  yellow: {
    name: "yellow",
    main: "#f4c550",
    light: "#fbe9ba",
    heroImage: "/images/hero-image-1.webp",
  },

  green: {
    name: "green",
    main: "#9fbaae",
    light: "#cbded3",
    heroImage: "/images/hero-image-2.webp",
  },

  blue: {
    name: "blue",
    main: "#9fb7ce",
    light: "#bfd6ea",
    heroImage: "/images/hero-image-3.webp",
  },

  red: {
    name: "red",
    main: "#e0a39a",
    light: "#f2c0bd",
    heroImage: "/images/hero-image-4.webp",
  },

  orange: {
    name: "orange",
    main: "#f0aa8d",
    light: "#f4c8ba",
    heroImage: "/images/hero-image-5.webp",
  },
};
