// src/screens/ChildHome.tsx
import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppStackParamList } from '../navigation/AppNavigator';
import { useAppContext } from '../context/AppContext';
import BigCard from '../components/BigCard';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';

type Props = NativeStackScreenProps<AppStackParamList, 'ChildHome'>;

const ChildHomeScreen: React.FC<Props> = ({ navigation }) => {
  const { user } = useAppContext();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.greeting}>Olá, {user?.name || 'Amigo'}</Text>
        <Text style={styles.prompt}>O que vamos fazer agora?</Text>

        <View style={styles.menuContainer}>
          <BigCard
            iconName="calendar-check-outline"
            title="Minha Rotina"
            onPress={() => navigation.navigate('MyRoutine')}
            accessibilityLabel="Abrir Minha Rotina"
          />
          <BigCard
            iconName="comment-processing-outline"
            title="Quero Dizer"
            style={{ backgroundColor: colors.secondary }}
            onPress={() => navigation.navigate('WantToSay')}
            accessibilityLabel="Abrir Quero Dizer"
          />
          <BigCard
            iconName="heart-pulse"
            title="Estou Sentindo"
            style={{ backgroundColor: colors.accent }}
            onPress={() => navigation.navigate('HowIFeel')}
            accessibilityLabel="Abrir Estou Sentindo"
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  greeting: {
    ...typography.display,
    color: colors.text,
    marginTop: 40,
    fontWeight: '700',
    textAlign: 'center',
  },
  prompt: {
    ...typography.subtitle,
    color: colors.text,
    opacity: 0.8,
    marginBottom: 40,
    textAlign: 'center',
  },
  menuContainer: {
    width: '100%',
    maxWidth: 500,
  },
});

export default ChildHomeScreen;