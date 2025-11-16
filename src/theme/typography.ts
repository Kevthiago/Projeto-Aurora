// src/theme/typography.ts
import { TextStyle } from 'react-native';

/**
 * Font families used across the system.
 * Using system fonts for maximum performance and accessibility.
 */
export const fonts = {
  regular: 'System',
  bold: 'System',
};

/**
 * Font scale — responsive and consistent sizes.
 */
export const fontSizes = {
  xs: 12,
  sm: 14,
  body: 18,
  subtitle: 24,
  title: 32,
  display: 48,
};

/**
 * Main typography tokens used across the app.
 * All components should reference styles from here.
 */
export const typography = {
  /** Large page titles */
  title: {
    fontFamily: fonts.bold,
    fontSize: fontSizes.title,
    fontWeight: '700' as const,
  } satisfies TextStyle,

  /** Section titles, card headers */
  subtitle: {
    fontFamily: fonts.bold,
    fontSize: fontSizes.subtitle,
    fontWeight: '600' as const,
  } satisfies TextStyle,

  /** Default body text */
  body: {
    fontFamily: fonts.regular,
    fontSize: fontSizes.body,
    lineHeight: fontSizes.body * 1.5,
  } satisfies TextStyle,

  /** Body text with emphasis */
  bodyBold: {
    fontFamily: fonts.bold,
    fontSize: fontSizes.body,
    fontWeight: '600' as const,
  } satisfies TextStyle,

  /** Small descriptive text */
  caption: {
    fontFamily: fonts.regular,
    fontSize: fontSizes.sm,
  } satisfies TextStyle,

  /** Display headings (splash screens, big titles) */
  display: {
    fontFamily: fonts.bold,
    fontSize: fontSizes.display,
    fontWeight: '700' as const,
  } satisfies TextStyle,

  /** ✔ ADICIONADO — estilização padrão para botões */
  button: {
    fontFamily: fonts.bold,
    fontSize: fontSizes.body,
    fontWeight: '600' as const,
  } satisfies TextStyle,

  /** ✔ ADICIONADO — textos sobre superfícies específicas (ex: cards, containers) */
  surface: {
    fontFamily: fonts.regular,
    fontSize: fontSizes.body,
    fontWeight: '400' as const,
  } satisfies TextStyle,
};

export type AppTypography = typeof typography;
