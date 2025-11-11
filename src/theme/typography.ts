// src/theme/typography.ts
import { TextStyle } from 'react-native';

// Usamos fontes Sans-Serif grandes para máxima legibilidade.
export const fonts = {
  // Na web, o 'System' funciona bem.
  regular: 'System',
  bold: 'System',
};

export const fontSizes = {
  xs: 12,
  sm: 14,
  body: 18, // Tamanho de corpo padrão maior
  subtitle: 24,
  title: 32,
  display: 48,
};

export const typography = {
  title: {
    fontFamily: fonts.bold,
    fontSize: fontSizes.title,
    fontWeight: '700' as const,
  },
  subtitle: {
    fontFamily: fonts.bold,
    fontSize: fontSizes.subtitle,
    fontWeight: '600' as const,
  },
  body: {
    fontFamily: fonts.regular,
    fontSize: fontSizes.body,
    lineHeight: fontSizes.body * 1.5,
  },
  bodyBold: {
    fontFamily: fonts.bold,
    fontSize: fontSizes.body,
    fontWeight: '600' as const,
  },
  caption: {
    fontFamily: fonts.regular,
    fontSize: fontSizes.sm,
  },
  //
  // REFAKTOR: Esta é a correção.
  // O estilo 'display' estava faltando.
  //
  display: {
    fontFamily: fonts.bold,
    fontSize: fontSizes.display,
    fontWeight: '700' as const,
  },
};

export type AppTypography = typeof typography;