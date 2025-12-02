// src/services/storage.ts

import AsyncStorage from '@react-native-async-storage/async-storage';
import { User, RoutineItem, PECSCategory, PECSButton } from '../data/types';

export const storageService = {
  /* ============================
   * USER
   * ============================ */
  saveUser: async (user: User) => {
    try {
      await AsyncStorage.setItem('user', JSON.stringify(user));
      return true;
    } catch (e) {
      console.error('[Storage] Erro ao salvar user:', e);
      return false;
    }
  },

  loadUser: async (): Promise<User | null> => {
    try {
      const data = await AsyncStorage.getItem('user');
      return data ? JSON.parse(data) as User : null;
    } catch (e) {
      console.error('[Storage] Erro ao carregar user:', e);
      return null;
    }
  },

  /* ============================
   * ROUTINE
   * ============================ */
  saveRoutine: async (routine: RoutineItem[]) => {
    try {
      await AsyncStorage.setItem('routine', JSON.stringify(routine));
      return true;
    } catch (e) {
      console.error('[Storage] Erro ao salvar rotina:', e);
      return false;
    }
  },

  loadRoutine: async (): Promise<RoutineItem[]> => {
    try {
      const data = await AsyncStorage.getItem('routine');
      return data ? JSON.parse(data) as RoutineItem[] : [];
    } catch (e) {
      return [];
    }
  },

  /* ============================
   * PECS CATEGORIES
   * ============================ */
  savePecsCategories: async (categories: PECSCategory[]) => {
    try {
      await AsyncStorage.setItem('pecsCategories', JSON.stringify(categories));
      return true;
    } catch (e) {
      console.error('[Storage] Erro ao salvar categorias:', e);
      return false;
    }
  },

  loadPecsCategories: async (): Promise<PECSCategory[]> => {
    try {
      const data = await AsyncStorage.getItem('pecsCategories');
      return data ? JSON.parse(data) as PECSCategory[] : [];
    } catch (e) {
      return [];
    }
  },

  /* ============================
   * PECS BUTTONS
   * ============================ */
  savePecsButtons: async (buttons: PECSButton[]) => {
    try {
      await AsyncStorage.setItem('pecsButtons', JSON.stringify(buttons));
      return true;
    } catch (e) {
      console.error('[Storage] Erro ao salvar botões:', e);
      return false;
    }
  },

  loadPecsButtons: async (): Promise<PECSButton[]> => {
    try {
      const data = await AsyncStorage.getItem('pecsButtons');
      return data ? JSON.parse(data) as PECSButton[] : [];
    } catch (e) {
      return [];
    }
  },

  /* ============================
   * CONFIG PIN (6 dígitos)
   * ============================ */
  saveConfigPin: async (pin: string) => {
    try {
      await AsyncStorage.setItem('configPin', pin);
      return true;
    } catch (e) {
      console.error('[Storage] Erro ao salvar PIN:', e);
      return false;
    }
  },

  loadConfigPin: async (): Promise<string | null> => {
    try {
      const pin = await AsyncStorage.getItem('configPin');
      return pin ?? null;
    } catch (e) {
      return null;
    }
  },
};