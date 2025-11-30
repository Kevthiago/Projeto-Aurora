// src/screens/OnboardingMode.tsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';

const OnboardingModeScreen: React.FC = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Projeto Aurora</Text>

        {/* Botão Modo Criança */}
        <TouchableOpacity
          style={[styles.button, styles.childButton]}
          onPress={() => navigation.navigate('ChildHome' as never)}
          accessible={true}
          accessibilityLabel="Entrar no Modo Criança"
        >
          <MaterialCommunityIcons
            name="account-child-circle"
            size={80}
            color={colors.white}
          />
          <Text style={styles.buttonText}>Entrar</Text>
          <Text style={styles.buttonSubtext}>(Modo Criança)</Text>
        </TouchableOpacity>

        {/* Botão Modo Cuidador -> Tela de PIN */}
        <TouchableOpacity
          style={[styles.button, styles.caregiverButton]}
          onPress={() => navigation.navigate('ConfigPin' as never)}
          accessible={true}
          accessibilityLabel="Configurar (Modo Cuidador). Digite o PIN para acessar."
        >
          <MaterialCommunityIcons name="cog" size={60} color={colors.text} />
          <Text style={styles.buttonTextCaregiver}>Configurar</Text>
          <Text style={styles.buttonSubtextCaregiver}>(Modo Cuidador)</Text>
        </TouchableOpacity>
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
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    ...typography.display,
    color: colors.primary,
    marginBottom: 60,
  },
  button: {
    width: '90%',
    maxWidth: 400,
    height: 200,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 6,
  },
  childButton: {
    backgroundColor: colors.primary,
  },
  caregiverButton: {
    backgroundColor: colors.white,
    borderColor: colors.accent,
    borderWidth: 2,
    height: 150,
  },
  buttonText: {
    ...typography.title,
    color: colors.white,
    marginTop: 10,
  },
  buttonSubtext: {
    ...typography.body,
    color: colors.white,
    opacity: 0.8,
  },
  buttonTextCaregiver: {
    ...typography.subtitle,
    color: colors.text,
    marginTop: 10,
  },
  buttonSubtextCaregiver: {
    ...typography.body,
    color: colors.text,
    opacity: 0.7,
  },
});

export default OnboardingModeScreen;
