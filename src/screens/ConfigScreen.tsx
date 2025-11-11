// src/screens/ConfigScreen.tsx
// Tela de configuração (Modo Cuidador).
// Mantida simples, focando em editar o nome do usuário.
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useAppContext } from '../context/AppContext';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';

const ConfigScreen = () => {
  const { user, updateUser } = useAppContext();
  const [name, setName] = useState(user?.name || '');

  const handleSave = () => {
    updateUser(name);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.header}>Perfil da Criança</Text>
      <Text style={styles.label}>Nome:</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Nome da Criança"
        accessibilityLabel="Campo de entrada para o nome da criança"
      />
      <Button title="Salvar Nome" onPress={handleSave} color={colors.primary} />

      <View style={styles.divider} />

      {/* Placeholders para outras seções */}
      <Text style={styles.header}>Editar Rotina</Text>
      <Text style={styles.placeholder}>
        (Aqui entraria um editor de lista para 'Minha Rotina')
      </Text>
      <Button title="Adicionar Atividade" onPress={() => {}} disabled />

      <View style={styles.divider} />

      <Text style={styles.header}>Editar Botões "Quero Dizer"</Text>
      <Text style={styles.placeholder}>
        (Aqui entraria um editor de grade para os botões PECS,
        incluindo upload de imagem e gravação de áudio.)
      </Text>
      <Button title="Adicionar Botão" onPress={() => {}} disabled />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 40,
    maxWidth: 700,
    width: '100%',
    alignSelf: 'center',
  },
  header: {
    ...typography.subtitle,
    color: colors.text,
    marginBottom: 16,
  },
  label: {
    ...typography.body,
    color: colors.text,
    marginBottom: 8,
  },
  input: {
    ...typography.body,
    backgroundColor: colors.white,
    borderColor: colors.disabled,
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
  },
  divider: {
    height: 1,
    backgroundColor: colors.disabled,
    marginVertical: 30,
  },
  placeholder: {
    ...typography.body,
    color: colors.disabled,
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 16,
  },
});

export default ConfigScreen;