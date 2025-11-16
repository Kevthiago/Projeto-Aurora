import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { useAppContext } from '../context/AppContext';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { RoutineItem, PECSButton } from '../data/types';

const ConfigScreen = () => {
  const {
    user,
    updateUser,
    routine,
    addRoutineItem,
    editRoutineItem,
    removeRoutineItem,
    pecsButtons,
    addPecsButton,
    editPecsButton,
    removePecsButton,
  } = useAppContext();

  // Estado do perfil
  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');

  // Estado do CRUD de rotina
  const [newRoutineTitle, setNewRoutineTitle] = useState('');
  const [editRoutineId, setEditRoutineId] = useState<string | null>(null);
  const [editRoutineTitle, setEditRoutineTitle] = useState('');

  // Estado do CRUD de PECS
  const [newPecsText, setNewPecsText] = useState('');
  const [editPecsId, setEditPecsId] = useState<string | null>(null);
  const [editPecsText, setEditPecsText] = useState('');

  // Salvar usuário/cuidador
  const handleSaveProfile = () => {
    updateUser(name, phone);
  };

  // Adicionar/editar rotina
  const handleAddRoutine = () => {
    if (newRoutineTitle.trim()) {
      addRoutineItem({
        id: Date.now().toString(),
        title: newRoutineTitle,
        time: '09:00',
        icon: 'calendar',
        completed: false,
        category: '',
      });
      setNewRoutineTitle('');
    }
  };
  const handleEditRoutine = () => {
    if (editRoutineId && editRoutineTitle.trim()) {
      editRoutineItem(editRoutineId, { title: editRoutineTitle });
      setEditRoutineId(null);
      setEditRoutineTitle('');
    }
  };

  // Adicionar/editar PECS
  const handleAddPecs = () => {
    if (newPecsText.trim()) {
      addPecsButton({
        id: Date.now().toString(),
        categoryId: 'c1', // Ajuste ou permita editar categoria
        text: newPecsText,
        icon: 'star',
        audioText: newPecsText,
        notifyWhatsApp: true, // Pode adicionar esse campo para testar notificação
      });
      setNewPecsText('');
    }
  };
  const handleEditPecs = () => {
    if (editPecsId && editPecsText.trim()) {
      editPecsButton(editPecsId, { text: editPecsText });
      setEditPecsId(null);
      setEditPecsText('');
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Perfil */}
      <Text style={styles.header}>Perfil da Criança</Text>
      <Text style={styles.label}>Nome:</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Nome da Criança"
      />
      <Text style={styles.label}>Telefone do cuidador:</Text>
      <TextInput
        style={styles.input}
        value={phone}
        onChangeText={setPhone}
        placeholder="Ex: +5531999999999"
        keyboardType="phone-pad"
      />
      <Button title="Salvar Perfil" onPress={handleSaveProfile} color={colors.primary} />

      <View style={styles.divider} />

      {/* Rotina CRUD */}
      <Text style={styles.header}>Editar Rotina</Text>
      <TextInput
        style={styles.input}
        value={editRoutineId ? editRoutineTitle : newRoutineTitle}
        onChangeText={editRoutineId ? setEditRoutineTitle : setNewRoutineTitle}
        placeholder={editRoutineId ? "Editar atividade" : "Nova atividade"}
      />
      <Button
        title={editRoutineId ? "Salvar Edição" : "Adicionar Atividade"}
        onPress={editRoutineId ? handleEditRoutine : handleAddRoutine}
        color={colors.primary}
      />
      <FlatList
        data={routine}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
            <Text style={{ flex: 1 }}>{item.title}</Text>
            <TouchableOpacity onPress={() => {
              setEditRoutineId(item.id);
              setEditRoutineTitle(item.title);
            }}>
              <Text style={{ color: colors.accent, marginRight: 20 }}>Editar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => removeRoutineItem(item.id)}>
              <Text style={{ color: colors.danger }}>Remover</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <View style={styles.divider} />

      {/* PECS CRUD */}
      <Text style={styles.header}>Editar Botões 'Quero Dizer'</Text>
      <TextInput
        style={styles.input}
        value={editPecsId ? editPecsText : newPecsText}
        onChangeText={editPecsId ? setEditPecsText : setNewPecsText}
        placeholder={editPecsId ? "Editar frase" : "Nova frase PECS"}
      />
      <Button
        title={editPecsId ? "Salvar Edição" : "Adicionar Botão"}
        onPress={editPecsId ? handleEditPecs : handleAddPecs}
        color={colors.primary}
      />
      <FlatList
        data={pecsButtons}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
            <Text style={{ flex: 1 }}>{item.text}</Text>
            <TouchableOpacity onPress={() => {
              setEditPecsId(item.id);
              setEditPecsText(item.text);
            }}>
              <Text style={{ color: colors.accent, marginRight: 20 }}>Editar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => removePecsButton(item.id)}>
              <Text style={{ color: colors.danger }}>Remover</Text>
            </TouchableOpacity>
          </View>
        )}
      />

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
    marginTop: 26,
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
    marginBottom: 10,
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
