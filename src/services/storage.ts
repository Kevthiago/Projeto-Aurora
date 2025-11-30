// src/services/storage.ts

import AsyncStorage from '@react-native-async-storage/async-storage'; // precisa estar instalado [web:22]
import { User, RoutineItem, PECSCategory, PECSButton } from '../data/types';

export const storageService = {
  /* ============================
   * USER
   * ============================ */
  saveUser: async (user: User) => {
    try {
      await AsyncStorage.setItem('user', JSON.stringify(user));
      return true;
    } catch {
      return false;
    }
  },

  loadUser: async (): Promise<User | null> => {
    try {
      const data = await AsyncStorage.getItem('user');
      return data ? JSON.parse(data) as User : null;
    } catch {
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
    } catch {
      return false;
    }
  },

  loadRoutine: async (): Promise<RoutineItem[]> => {
    try {
      const data = await AsyncStorage.getItem('routine');
      return data ? JSON.parse(data) as RoutineItem[] : [];
    } catch {
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
    } catch {
      return false;
    }
  },

  loadPecsCategories: async (): Promise<PECSCategory[]> => {
    try {
      const data = await AsyncStorage.getItem('pecsCategories');
      return data ? JSON.parse(data) as PECSCategory[] : [];
    } catch {
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
    } catch {
      return false;
    }
  },

  loadPecsButtons: async (): Promise<PECSButton[]> => {
    try {
      const data = await AsyncStorage.getItem('pecsButtons');
      return data ? JSON.parse(data) as PECSButton[] : [];
    } catch {
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
    } catch {
      return false;
    }
  },

  loadConfigPin: async (): Promise<string | null> => {
    try {
      const pin = await AsyncStorage.getItem('configPin');
      return pin ?? null;
    } catch {
      return null;
    }
  },
};
