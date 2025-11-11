// src/context/AppContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { MOCK_USER, MOCK_ROUTINE, MOCK_PECS_BUTTONS, MOCK_PECS_CATEGORIES } from '../data/mockData';
import { User, RoutineItem, PECSButton, PECSCategory } from '../data/types';
import { ttsService } from '../services/tts';

interface AppContextType {
  user: User | null;
  routine: RoutineItem[];
  pecsCategories: PECSCategory[];
  pecsButtons: PECSButton[];
  updateUser: (name: string) => void;
  toggleRoutineItem: (id: string) => void;
  speak: (text: string) => void;
  notifyCaregiver: (message: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children?: React.ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
  const [user, setUser] = useState<User | null>(MOCK_USER);
  const [routine, setRoutine] = useState<RoutineItem[]>(MOCK_ROUTINE);
  const [pecsCategories] = useState<PECSCategory[]>(MOCK_PECS_CATEGORIES);
  const [pecsButtons] = useState<PECSButton[]>(MOCK_PECS_BUTTONS);

  // Ação: Atualizar nome do usuário (via ConfigScreen)
  const updateUser = (name: string) => {
    if (user) {
      setUser({ ...user, name });
      alert('Sucesso: Nome do usuário atualizado.');
    }
  };

  // Ação: Marcar/Desmarcar item da rotina
  const toggleRoutineItem = (id: string) => {
    setRoutine((prevRoutine) =>
      prevRoutine.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  // Ação: Falar (TTS)
  const speak = (text: string) => {
    ttsService.speak(text);
  };

  // Ação: Notificar cuidador (Mock)
  const notifyCaregiver = (message: string) => {
    console.log(`[NOTIFY STUB]: Enviando para o cuidador: "${message}"`);
    alert(
      `Aviso para o Cuidador (Mock)\nO usuário ${user?.name} ${message}`
    );
  };

  const value = {
    user,
    routine,
    pecsCategories,
    pecsButtons,
    updateUser,
    toggleRoutineItem,
    speak,
    notifyCaregiver,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// Hook customizado para consumir o contexto
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext deve ser usado dentro de um AppProvider');
  }
  return context;
};