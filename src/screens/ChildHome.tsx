import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
// REFAKTOR: Usando a SafeAreaView correta
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useAppContext } from '../context/AppContext';
import BigCard from '../components/BigCard';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';

const ChildHomeScreen: React.FC = () => {
  const { user } = useAppContext();
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.greeting}>Olá, {user?.name || 'Amigo'}</Text>
        <Text style={styles.prompt}>O que vamos fazer agora?</Text>

        <View style={styles.menuContainer}>
          <BigCard
            iconName="calendar-check-outline"
            title="Minha Rotina"
            onPress={() => navigation.navigate('MyRoutine' as never)}
            accessibilityLabel="Abrir Minha Rotina"
          />
          <BigCard
            iconName="comment-processing-outline"
            title="Quero Dizer"
            style={{ backgroundColor: colors.secondary }}
            onPress={() => navigation.navigate('WantToSay' as never)}
            accessibilityLabel="Abrir Quero Dizer"
          />
          <BigCard
            iconName="heart-pulse"
            title="Estou Sentindo"
            style={{ backgroundColor: colors.accent }}
            onPress={() => navigation.navigate('HowIFeel' as never)}
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
    justifyContent: 'center', // REFAKTOR: Centraliza verticalmente o conteúdo
  },
  greeting: {
    ...typography.display,
    color: colors.text,
    marginBottom: 8,
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