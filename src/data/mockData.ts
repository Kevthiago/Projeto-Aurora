// src/data/mockData.ts
import { User, RoutineItem, PECSButton, PECSCategory } from './types';

export const MOCK_USER: User = {
  id: 'u1',
  name: 'Leo',
  age: 7,
  avatarPlaceholder: 'avatar-1',
};

export const MOCK_ROUTINE: RoutineItem[] = [
  {
    id: 'r1',
    title: 'Escovar os dentes',
    time: '08:00',
    icon: 'tooth-outline',
    completed: false,
    category: 'Higiene', // <-- ADICIONE ISTO
  },
  {
    id: 'r2',
    title: 'Hora da Leitura',
    time: '09:00',
    icon: 'book-open-page-variant-outline',
    completed: false,
    category: 'Atividade', // <-- ADICIONE ISTO
  },
  {
    id: 'r3',
    title: 'Lanche', // Seu exemplo
    time: '10:00',
    icon: 'food-apple-outline',
    completed: false,
    category: 'Alimentação', // <-- ADICIONE ISTO
  },
  {
    id: 'r4',
    title: 'Ir para a escola', // Seu exemplo
    time: '11:00',
    icon: 'bus-school',
    completed: false,
    category: 'Escola', // <-- ADICIONE ISTO
  },
];
export const MOCK_PECS_CATEGORIES: PECSCategory[] = [
  { id: 'c1', name: 'Sentimentos', icon: 'heart-outline' }, 
  { id: 'c2', name: 'Comida', icon: 'food-fork-drink' }, 
  { id: 'c3', name: 'Lugares', icon: 'map-marker-outline' }, 
];

export const MOCK_PECS_BUTTONS: PECSButton[] = [
  // Sentimentos
  { id: 'p1', categoryId: 'c1', text: 'Feliz', icon: 'emoticon-happy-outline', audioText: 'Estou feliz' },
  { id: 'p2', categoryId: 'c1', text: 'Triste', icon: 'emoticon-sad-outline', audioText: 'Estou triste' },
  { id: 'p3', categoryId: 'c1', text: 'Cansado', icon: 'battery-alert-variant-outline', audioText: 'Estou cansado' },
  // Comida
  { id: 'p4', categoryId: 'c2', text: 'Água', icon: 'cup-water', audioText: 'Quero água' },
  { id: 'p5', categoryId: 'c2', text: 'Maçã', icon: 'food-apple-outline', audioText: 'Quero maçã' },
  { id: 'p6', categoryId: 'c2', text: 'Mais', icon: 'plus-circle-outline', audioText: 'Quero mais' },
  // Lugares
  { id: 'p7', categoryId: 'c3', text: 'Banheiro', icon: 'human-male-female', audioText: 'Quero ir ao banheiro' },
  { id: 'p8', categoryId: 'c3', text: 'Casa', icon: 'home-outline', audioText: 'Quero ir para casa' },
  { id: 'p9', categoryId: 'c3', text: 'Parque', icon: 'pine-tree', audioText: 'Quero ir ao parque' },
];