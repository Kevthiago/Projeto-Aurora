
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User, RoutineItem, PECSCategory, PECSButton } from '../data/types';

export const storageService = {
  /* ============================
   * USER
   * ============================ */
  saveUser: async (user: User) => {
    try {
      await AsyncStorage.setItem('user', JSON.stringify(user));
      console.log('[STORAGE] Salvando usuário:', user);
      return true;
    } catch (err) {
      console.error('[STORAGE] ERRO ao salvar usuário', err);
      return false;
    }
  },

  loadUser: async (): Promise<User | null> => {
    try {
      const data = await AsyncStorage.getItem('user');
      console.log('[STORAGE] Carregando usuário:', data);
      return data ? JSON.parse(data) : null;
    } catch (err) {
      console.error('[STORAGE] ERRO ao carregar usuário', err);
      return null;
    }
  },

  /* ============================
   * ROUTINE
   * ============================ */
  saveRoutine: async (routine: RoutineItem[]) => {
    try {
      await AsyncStorage.setItem('routine', JSON.stringify(routine));
      console.log('[STORAGE] Salvando rotina:', routine);
      return true;
    } catch (err) {
      console.error('[STORAGE] ERRO ao salvar rotina', err);
      return false;
    }
  },

  loadRoutine: async (): Promise<RoutineItem[]> => {
    try {
      const data = await AsyncStorage.getItem('routine');
      console.log('[STORAGE] Carregando rotina:', data);
      return data ? JSON.parse(data) : [];
    } catch (err) {
      console.error('[STORAGE] ERRO ao carregar rotina', err);
      return [];
    }
  },

  /* ============================
   * PECS CATEGORIES
   * ============================ */
  savePecsCategories: async (categories: PECSCategory[]) => {
    try {
      await AsyncStorage.setItem('pecsCategories', JSON.stringify(categories));
      console.log('[STORAGE] Salvando PECS categories:', categories);
      return true;
    } catch (err) {
      console.error('[STORAGE] ERRO ao salvar PECS categories', err);
      return false;
    }
  },

  loadPecsCategories: async (): Promise<PECSCategory[]> => {
    try {
      const data = await AsyncStorage.getItem('pecsCategories');
      console.log('[STORAGE] Carregando PECS categories:', data);
      return data ? JSON.parse(data) : [];
    } catch (err) {
      console.error('[STORAGE] ERRO ao carregar PECS categories', err);
      return [];
    }
  },

  /* ============================
   * PECS BUTTONS
   * ============================ */
  savePecsButtons: async (buttons: PECSButton[]) => {
    try {
      await AsyncStorage.setItem('pecsButtons', JSON.stringify(buttons));
      console.log('[STORAGE] Salvando PECS buttons:', buttons);
      return true;
    } catch (err) {
      console.error('[STORAGE] ERRO ao salvar PECS buttons', err);
      return false;
    }
  },

  loadPecsButtons: async (): Promise<PECSButton[]> => {
    try {
      const data = await AsyncStorage.getItem('pecsButtons');
      console.log('[STORAGE] Carregando PECS buttons:', data);
      return data ? JSON.parse(data) : [];
    } catch (err) {
      console.error('[STORAGE] ERRO ao carregar PECS buttons', err);
      return [];
    }
  },
};