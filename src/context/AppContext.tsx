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
  notifyCaregiverWhatsApp: (msg: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children?: React.ReactNode }) => {

  const [user, setUser] = useState<User | null>(null);
  const [routine, setRoutine] = useState<RoutineItem[]>([]);
  const [pecsCategories, setPecsCategories] = useState<PECSCategory[]>([]);
  const [pecsButtons, setPecsButtons] = useState<PECSButton[]>([]);

  // ==========================================================
  // 🔄 CORREÇÃO: Carregamento com fallback REAL (sem bug do [])
  // ==========================================================
  useEffect(() => {
    const loadAll = async () => {
      const u = await storageService.loadUser();
      const r = await storageService.loadRoutine();
      const c = await storageService.loadPecsCategories();
      const b = await storageService.loadPecsButtons();

      setUser(u ?? MOCK_USER);
      setRoutine(r.length > 0 ? r : MOCK_ROUTINE);
      setPecsCategories(c.length > 0 ? c : MOCK_PECS_CATEGORIES);
      setPecsButtons(b.length > 0 ? b : MOCK_PECS_BUTTONS);
    };

    loadAll();
  }, []);

  // ==========================================================
  // USER
  // ==========================================================
  const updateUser = (name: string, phone: string) => {
    if (!user) return;

    const updated: User = { ...user, name, phone };
    setUser(updated);
    storageService.saveUser(updated);
    alert("Informações atualizadas!");
  };

  // ==========================================================
  // ROTINA
  // ==========================================================
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

  // ==========================================================
  // CATEGORIAS PECS
  // ==========================================================
  const addPecsCategory = (cat: PECSCategory) => {
    setPecsCategories(prev => {
      const updated = [...prev, cat];
      storageService.savePecsCategories(updated);
      return updated;
    });
  };

  // ==========================================================
  // BOTÕES PECS
  // ==========================================================
 const addPecsButton = (btn: PECSButton) => {
  setPecsButtons(prev => {
    const updated = [...prev, btn];
    storageService.savePecsButtons(updated); // Salva automaticamente
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

  // ==========================================================
  // TALK
  // ==========================================================
  const speak = (text: string) => {
    ttsService.speak(text);
  };

  // ==========================================================
  // WHATSAPP
  // ==========================================================
  const notifyCaregiverWhatsApp = (msg: string) => {
    if (!user?.phone) {
      alert("Nenhum telefone de cuidador registrado!");
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
        notifyCaregiverWhatsApp
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// ==========================================================
// HOOK
// ==========================================================
export const useAppContext = () => {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error("useAppContext deve ser usado dentro de AppProvider");
  }
  return ctx;
};
