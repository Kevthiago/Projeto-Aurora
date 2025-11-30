// src/screens/ConfigPinScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { storageService } from '../services/storage';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';

const ConfigPinScreen: React.FC = () => {
  const navigation = useNavigation();
  const [pin, setPin] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkPinExists = async () => {
      const savedPin = await storageService.loadConfigPin();
      // Se ainda não existe PIN, vai direto para a tela de configuração
      if (!savedPin) {
        navigation.navigate('Config' as never);
      }
    };
    checkPinExists();
  }, [navigation]);

  const handleVerifyPin = async () => {
    if (pin.length !== 6) {
      Alert.alert('PIN', 'Digite os 6 dígitos do PIN.');
      return;
    }

    setLoading(true);
    const savedPin = await storageService.loadConfigPin();

    if (savedPin === pin) {
      // PIN correto: entra na tela de configuração
      navigation.navigate('Config' as never);
    } else {
      // PIN incorreto: mensagem de senha inválida
      Alert.alert('Senha inválida', 'A senha digitada está incorreta. Tente novamente.');
      setPin('');
    }

    setLoading(false);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.content}>
        <Text style={styles.title}>PIN de Configuração</Text>
        <Text style={styles.subtitle}>
          Digite o PIN de 6 dígitos para acessar as configurações
        </Text>

        <TextInput
          style={styles.pinInput}
          value={pin}
          onChangeText={setPin}
          placeholder="******"
          placeholderTextColor={colors.disabled}
          keyboardType="number-pad"
          maxLength={6}
          secureTextEntry
          textAlign="center"
          autoFocus
        />

        <Button
          title={loading ? 'Verificando...' : 'Entrar'}
          onPress={handleVerifyPin}
          color={colors.primary}
          disabled={loading || pin.length !== 6}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  title: {
    ...typography.subtitle,
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    ...typography.body,
    color: colors.disabled,
    textAlign: 'center',
    marginBottom: 32,
  },
  pinInput: {
    ...typography.title,
    fontSize: 32,
    backgroundColor: colors.white,
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderWidth: 2,
    borderColor: colors.primary,
    marginBottom: 24,
    letterSpacing: 16,
  },
});

export default ConfigPinScreen;
