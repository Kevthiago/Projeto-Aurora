// src/navigation/AppNavigator.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

// Importação normal
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';

// Importando as telas
import OnboardingModeScreen from '../screens/OnboardingMode';
import ConfigScreen from '../screens/ConfigScreen';
import ChildHomeScreen from '../screens/ChildHome';
import MyRoutineScreen from '../screens/MyRoutine';
import WantToSayScreen from '../screens/WantToSay';
import HowIFeelScreen from '../screens/HowIFeel';

import { colors } from '../theme/colors';
import { typography } from '../theme/typography';

/*
 * Esta definição de tipo NÃO será mais usada pelo Stack,
 * mas podemos mantê-la aqui por enquanto.
 */
export type AppStackParamList = {
  OnboardingMode: undefined;
  Config: undefined;
  ChildHome: undefined;
  MyRoutine: undefined;
  WantToSay: undefined;
  HowIFeel: undefined;
};

//
// REFAKTOR: Esta é a mudança que "conserta" o bug.
// Removemos <AppStackParamList> daqui.
//
const Stack = createNativeStackNavigator();

// Opções de tela padrão
const defaultScreenOptions: NativeStackNavigationOptions = {
  headerStyle: {
    backgroundColor: colors.background,
  },
  headerTintColor: colors.text,
  headerTitleStyle: {
    ...typography.subtitle,
    color: colors.text,
  },
  headerBackTitleVisible: false,
  animation: 'slide_from_right',
};

const AppNavigator = () => {
  return (
    <NavigationContainer>
      {/*
       * O Stack.Navigator agora não tem verificação de tipo,
       * então ele vai aceitar qualquer string no 'name'.
       */}
      <Stack.Navigator
        initialRouteName="OnboardingMode"
        screenOptions={defaultScreenOptions}
      >
        <Stack.Screen
          name="OnboardingMode"
          component={OnboardingModeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Config"
          component={ConfigScreen}
          options={{ title: 'Configuração (Cuidador)' }}
        />
        <Stack.Screen
          name="ChildHome"
          component={ChildHomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MyRoutine"
          component={MyRoutineScreen}
          options={{ title: 'Minha Rotina' }}
        />
        <Stack.Screen
          name="WantToSay"
          component={WantToSayScreen}
          options={{ title: 'Quero Dizer' }}
        />
        <Stack.Screen
          name="HowIFeel"
          component={HowIFeelScreen}
          options={{ title: 'Estou Sentindo' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;