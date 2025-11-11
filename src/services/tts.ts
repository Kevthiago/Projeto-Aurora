// src/services/tts.ts
// Stub para o serviço de Text-to-Speech.
// `expo-speech` funciona no navegador.

// REFAKTOR: Trocamos o 'require' dinâmico por um 'import' estático.
// Isso resolve o erro do TypeScript "Cannot find name 'require'"
// e é a forma correta de importar módulos no Expo com TypeScript.
import * as Speech from 'expo-speech';

interface TTSService {
  speak: (text: string) => void;
}

export const ttsService: TTSService = {
  speak: (text: string) => {
    // Em um app real, verificaríamos se existe um áudio gravado
    // para este texto, senão, usaríamos o TTS.
    console.log(`[TTS]: Falando "${text}"`);
    try {
      // O 'import' agora está no topo do arquivo.
      // Mantemos o try...catch caso a API de fala do navegador falhe.
      Speech.speak(text, { language: 'pt-BR' });
    } catch (error) {
      console.warn('Falha ao executar expo-speech:', error);
    }
  },
};