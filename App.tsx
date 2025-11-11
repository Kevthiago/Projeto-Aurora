// App.tsx
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppProvider } from './src/context/AppContext';
import AppNavigator from './src/navigation/AppNavigator';

// Opcional: Configurar localização para PT-BR
import 'intl';
import 'intl/locale-data/jsonp/pt-BR';

export default function App() {
  return (
    <SafeAreaProvider>
      {/* O AppProvider gerencia todo o estado global */}
      <AppProvider>
        {/*
          REFAKTOR: Esta é a correção.
          Envolvemos os múltiplos filhos em um único Fragmento (<>)
          para "enganar" o bug de cache do TypeScript.
        */}
        <>
          {/* O AppNavigator gerencia todas as telas */}
          <AppNavigator />
          <StatusBar style="auto" />
        </>
      </AppProvider>
    </SafeAreaProvider>
  );
}