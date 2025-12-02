// src/navigation/AppNavigator.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';

// Telas
import OnboardingModeScreen from '../screens/OnboardingMode';
import ConfigScreen from '../screens/ConfigScreen';
import ChildHomeScreen from '../screens/ChildHome';
import MyRoutineScreen from '../screens/MyRoutine';
import WantToSayScreen from '../screens/WantToSay';
import HowIFeelScreen from '../screens/HowIFeel';

import { colors } from '../theme/colors';
import { typography } from '../theme/typography';

// Tipagem opcional (não será usada pelo Stack, só documentação)
export type AppStackParamList = {
  OnboardingMode: undefined;
  Config: undefined;
  ConfigPin: undefined;
  ChildHome: undefined;
  MyRoutine: undefined;
  WantToSay: undefined;
  HowIFeel: undefined;
};

// IMPORTANTE: sem <AppStackParamList> aqui
const Stack = createNativeStackNavigator();

const defaultScreenOptions: NativeStackNavigationOptions = {
  headerStyle: {
    backgroundColor: colors.background,
  },
  headerTintColor: colors.text,
  headerTitleStyle: {
    ...typography.subtitle,
    color: colors.text,
  },
  animation: 'slide_from_right',
};

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
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
