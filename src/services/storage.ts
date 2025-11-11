// src/services/storage.ts
// Stub para AsyncStorage. Usamos um mock in-memory por enquanto.
// Em um app real com Expo Web, @react-native-async-storage/async-storage
// usaria o localStorage do navegador.

const MOCK_DB = {
  user: null,
  routine: [],
};

export const storageService = {
  saveUser: async (user: any) => {
    console.log('[STORAGE STUB] Salvando usuário:', user);
    MOCK_DB.user = user;
    return true;
  },
  loadUser: async () => {
    console.log('[STORAGE STUB] Carregando usuário.');
    return MOCK_DB.user;
  },
  saveRoutine: async (routine: any) => {
    console.log('[STORAGE STUB] Salvando rotina.');
    MOCK_DB.routine = routine;
    return true;
  },
};