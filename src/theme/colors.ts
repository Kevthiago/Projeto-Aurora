// src/theme/colors.ts
// Paleta de cores pastel suave, focada em conforto visual e baixo contraste.
// Melhorada para incluir tokens essenciais como 'surface' e 'surfaceVariant'.

export const colors = {
  // ---- Backgrounds ----
  background: '#FAF8F5',        // Off-white pastel suave
  backgroundCalm: '#2C3E50',    // Azul escuro suave para telas focadas

  // ---- Paleta Principal ----
  primary: '#76D7C4',           // Verde-água pastel
  secondary: '#FAD7A0',         // Laranja-pêssego pastel
  accent: '#85C1E9',            // Azul-céu pastel

  // ---- Texto ----
  text: '#34495E',              // Cinza-azulado escuro (boa legibilidade)
  textLight: '#FFFFFF',

  // ---- Neutras ----
  white: '#FFFFFF',
  black: '#000000',
  disabled: '#D5D8DC',

  // ---- Status ----
  success: '#58D68D',           // Verde para reforço positivo
  danger: '#E74C3C',

  // ---- SUPERFÍCIES (adição necessária) ----
  surface: '#FFFFFF',           // Usado para cards, inputs, containers
  surfaceVariant: '#F2EEEA',    // Variante levemente mais escura (pastel)
};

export type AppColors = typeof colors;
