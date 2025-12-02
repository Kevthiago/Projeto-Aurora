// src/context/AppContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  MOCK_USER,
  MOCK_ROUTINE,
  MOCK_PECS_BUTTONS,
  MOCK_PECS_CATEGORIES
} from '../data/mockData';

import { User, RoutineItem, PECSButton, PECSCategory } from '../data/types';
import { ttsService } from '../services/tts';
import { storageService } from '../services/storage';
import { Linking, Platform } from 'react-native';

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

  addPecsCategory: (cat: PECSCategory) => void;
  addPecsButton: (btn: PECSButton) => void;
  editPecsButton: (id: string, changes: Partial<PECSButton>) => void;
  removePecsButton: (id: string) => void;

  speak: (text: string) => void;
  
  // Mantemos o nome específico
  notifyCaregiverWhatsApp: (msg: string) => void;
  // ADICIONADO: Mantemos o nome genérico para compatibilidade com as telas
  notifyCaregiver: (msg: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children?: React.ReactNode }) => {

  const [user, setUser] = useState<User | null>(null);
  const [routine, setRoutine] = useState<RoutineItem[]>([]);
  const [pecsCategories, setPecsCategories] = useState<PECSCategory[]>([]);
  const [pecsButtons, setPecsButtons] = useState<PECSButton[]>([]);

  // CARREGAMENTO
  useEffect(() => {
    const loadAll = async () => {
      try {
        const u = await storageService.loadUser();
        const r = await storageService.loadRoutine();
        const c = await storageService.loadPecsCategories();
        const b = await storageService.loadPecsButtons();

        setUser(u ?? MOCK_USER);
        setRoutine(r && r.length > 0 ? r : MOCK_ROUTINE);
        setPecsCategories(c && c.length > 0 ? c : MOCK_PECS_CATEGORIES);
        setPecsButtons(b && b.length > 0 ? b : MOCK_PECS_BUTTONS);
      } catch (e) {
        console.error("Erro ao carregar dados", e);
      }
    };
    loadAll();
  }, []);

  // USER
  const updateUser = (name: string, phone: string) => {
    // Garante que o objeto user exista
    const baseUser = user || MOCK_USER; 
    const updated: User = { ...baseUser, name, phone };
    setUser(updated);
    storageService.saveUser(updated);
    if(Platform.OS === 'web') alert("Informações atualizadas!");
  };

  // ROTINA
  const addRoutineItem = (item: RoutineItem) => {
    setRoutine(prev => {
      const updated = [...prev, item];
      storageService.saveRoutine(updated);
      return updated;
    });
  };

  const editRoutineItem = (id: string, changes: Partial<RoutineItem>) => {
    setRoutine(prev => {
      const updated = prev.map(r => (r.id === id ? { ...r, ...changes } : r));
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
    setRoutine(prev => {
      const updated = prev.map(r =>
        r.id === id ? { ...r, completed: !r.completed } : r
      );
      storageService.saveRoutine(updated);
      return updated;
    });
  };

  // PECS
  const addPecsCategory = (cat: PECSCategory) => {
    setPecsCategories(prev => {
      const updated = [...prev, cat];
      storageService.savePecsCategories(updated);
      return updated;
    });
  };

  const addPecsButton = (btn: PECSButton) => {
    setPecsButtons(prev => {
      const updated = [...prev, btn];
      storageService.savePecsButtons(updated);
      return updated;
    });
  };

  const editPecsButton = (id: string, changes: Partial<PECSButton>) => {
    setPecsButtons(prev => {
      const updated = prev.map(b => (b.id === id ? { ...b, ...changes } : b));
      storageService.savePecsButtons(updated);
      return updated;
    });
  };

  const removePecsButton = (id: string) => {
    setPecsButtons(prev => {
      const updated = prev.filter(b => b.id !== id);
      storageService.savePecsButtons(updated);
      return updated;
    });
  };

  const speak = (text: string) => {
    ttsService.speak(text);
  };

  // WHATSAPP
  const notifyCaregiverWhatsApp = (msg: string) => {
    if (!user?.phone) {
      alert("Nenhum telefone de cuidador registrado! Vá em Configurações.");
      return;
    }

    const phone = user.phone.replace(/\D/g, "");
    const encoded = encodeURIComponent(msg);

    if (Platform.OS === "web") {
      window.open(`https://wa.me/${phone}?text=${encoded}`, "_blank");
    } else {
      Linking.openURL(`whatsapp://send?phone=${phone}&text=${encoded}`);
    }
  };

  return (
    <AppContext.Provider
      value={{
        user,
        routine,
        pecsCategories,
        pecsButtons,
        updateUser,
        addRoutineItem,
        editRoutineItem,
        removeRoutineItem,
        toggleRoutineItem,
        addPecsCategory,
        addPecsButton,
        editPecsButton,
        removePecsButton,
        speak,
        notifyCaregiverWhatsApp,
        // Compatibilidade: aponta para a mesma função do WhatsApp
        notifyCaregiver: notifyCaregiverWhatsApp 
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error("useAppContext deve ser usado dentro de AppProvider");
  }
  return ctx;
};