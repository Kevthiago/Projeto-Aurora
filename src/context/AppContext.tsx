// src/context/AppContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { MOCK_USER, MOCK_ROUTINE, MOCK_PECS_BUTTONS, MOCK_PECS_CATEGORIES } from '../data/mockData';
import { User, RoutineItem, PECSButton, PECSCategory } from '../data/types';
import { ttsService } from '../services/tts';
import { Linking, Platform } from 'react-native';
import { storageService } from '../services/storage';

interface AppContextType {
  user: User | null;
  routine: RoutineItem[];
  pecsCategories: PECSCategory[];
  pecsButtons: PECSButton[];
  updateUser: (name: string, phone: string) => void;

  addRoutineItem: (item: RoutineItem) => void;
  editRoutineItem: (id: string, changes: Partial<RoutineItem>) => void;
  removeRoutineItem: (id: string) => void;
  toggleRoutineItem: (id: string) => void;

  addPecsButton: (btn: PECSButton) => void;
  editPecsButton: (id: string, changes: Partial<PECSButton>) => void;
  removePecsButton: (id: string) => void;

  speak: (text: string) => void;
  notifyCaregiverWhatsApp: (message: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children?: React.ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
  const [user, setUser] = useState<User | null>(MOCK_USER);
  const [routine, setRoutine] = useState<RoutineItem[]>(MOCK_ROUTINE);
  const [pecsCategories] = useState<PECSCategory[]>(MOCK_PECS_CATEGORIES);
  const [pecsButtons, setPecsButtons] = useState<PECSButton[]>(MOCK_PECS_BUTTONS);

  // Configurações do usuário/cuidador
  const updateUser = (name: string, phone: string) => {
    if (user) {
      const updated = { ...user, name, phone };
      setUser(updated);
      storageService.saveUser(updated);
      alert('Nome/telefone do usuário atualizado!');
    }
  };

  // Rotina CRUD
  const addRoutineItem = (item: RoutineItem) => {
    setRoutine(prev => {
      const updated = [...prev, item];
      storageService.saveRoutine(updated);
      return updated;
    });
  };
  const editRoutineItem = (id: string, changes: Partial<RoutineItem>) => {
    setRoutine(prev => {
      const updated = prev.map(r => r.id === id ? { ...r, ...changes } : r);
      storageService.saveRoutine(updated);
      return updated;
    });
  };
  const removeRoutineItem = (id: string) => {
    setRoutine(prev => {
      const updated = prev.filter(r => r.id !== id);
      storageService.saveRoutine(updated);
      return updated;
    });
  };
  const toggleRoutineItem = (id: string) => {
    setRoutine(prev =>
      prev.map(r =>
        r.id === id ? { ...r, completed: !r.completed } : r
      )
    );
  };

  // CRUD dos botões PECS
  const addPecsButton = (btn: PECSButton) => {
    setPecsButtons(prev => [...prev, btn]);
    // Pode persistir se desejar!
  };
  const editPecsButton = (id: string, changes: Partial<PECSButton>) => {
    setPecsButtons(prev => prev.map(b => b.id === id ? { ...b, ...changes } : b));
  };
  const removePecsButton = (id: string) => {
    setPecsButtons(prev => prev.filter(b => b.id !== id));
  };

  // TTS
  const speak = (text: string) => ttsService.speak(text);

  // Notificação WhatsApp (com fallback web)
  const notifyCaregiverWhatsApp = (message: string) => {
    if (!user?.phone) {
      alert('Número do cuidador não cadastrado!');
      return;
    }
    let url = '';
    // Para web (Expo Web/browser), abre WhatsApp Web
    if (Platform.OS === 'web') {
      url = `https://wa.me/${user.phone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
      window.open(url, '_blank');
    } else {
      // Para mobile
      url = `whatsapp://send?phone=${user.phone}&text=${encodeURIComponent(message)}`;
      Linking.openURL(url);
    }
  };

  const value = {
    user,
    routine,
    pecsCategories,
    pecsButtons,
    updateUser,
    addRoutineItem,
    editRoutineItem,
    removeRoutineItem,
    toggleRoutineItem,
    addPecsButton,
    editPecsButton,
    removePecsButton,
    speak,
    notifyCaregiverWhatsApp,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// Hook customizado para fácil acesso
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext deve ser usado dentro de um AppProvider');
  }
  return context;
};
