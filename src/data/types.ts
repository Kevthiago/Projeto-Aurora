// src/data/types.ts
// Definindo as estruturas de dados centrais do app.

export interface User {
  id: string;
  name: string;
  age: number;
  avatarPlaceholder: string; // ex: 'avatar-1'
  phone: string; 
}

export interface RoutineItem {
  id: string;
  title: string;
  time: string; // ex: "09:00"
  icon: string; // Nome do ícone (ex: 'book' de MaterialCommunityIcons)
  completed: boolean;
  category?: string; // <-- ADICIONE ESTA LINHA (torna a categoria opcional)
}


export interface PECSCategory {
  id: string;
  name: string;
  icon: string;
}

export interface PECSButton {
  id: string;
  categoryId: string;
  text: string;
  icon: string; // Nome do ícone
  // O áudio real seria um URI, aqui usamos o texto paSra o TTS
  audioText: string;
  notifyWhatsApp?: boolean;
}