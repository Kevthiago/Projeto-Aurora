// src/services/storage.ts

import { User, RoutineItem, PECSCategory, PECSButton } from '../data/types';

// Tipamos o mock DB corretamente para impedir never[]
interface MockDB {
  user: User | null;
  routine: RoutineItem[];
  pecsCategories: PECSCategory[];
  pecsButtons: PECSButton[];
}

// Banco em memória
const MOCK_DB: MockDB = {
  user: null,
  routine: [],
  pecsCategories: [],
  pecsButtons: [],
};

export const storageService = {
  /* ============================
   * USER
   * ============================ */
  saveUser: async (user: User) => {
    console.log('[STORAGE] Salvando usuário:', user);
    MOCK_DB.user = user;
    return true;
  },

  loadUser: async (): Promise<User | null> => {
    console.log('[STORAGE] Carregando usuário.');
    return MOCK_DB.user ?? null;
  },

  /* ============================
   * ROUTINE
   * ============================ */
  saveRoutine: async (routine: RoutineItem[]) => {
    console.log('[STORAGE] Salvando rotina.');
    MOCK_DB.routine = routine ?? [];
    return true;
  },

  loadRoutine: async (): Promise<RoutineItem[]> => {
    console.log('[STORAGE] Carregando rotina.');
    return MOCK_DB.routine ?? [];
  },

  /* ============================
   * PECS CATEGORIES
   * ============================ */
  savePecsCategories: async (categories: PECSCategory[]) => {
    console.log('[STORAGE] Salvando PECS categories.');
    MOCK_DB.pecsCategories = categories ?? [];
    return true;
  },

  loadPecsCategories: async (): Promise<PECSCategory[]> => {
    console.log('[STORAGE] Carregando PECS categories.');
    return MOCK_DB.pecsCategories ?? [];
  },

  /* ============================
   * PECS BUTTONS
   * ============================ */
  savePecsButtons: async (buttons: PECSButton[]) => {
    console.log('[STORAGE] Salvando PECS buttons.');
    MOCK_DB.pecsButtons = buttons ?? [];
    return true;
  },

  loadPecsButtons: async (): Promise<PECSButton[]> => {
    console.log('[STORAGE] Carregando PECS buttons.');
    return MOCK_DB.pecsButtons ?? [];
  },
};