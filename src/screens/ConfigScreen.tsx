// src/screens/ConfigScreen.tsx
import React, { useState, useMemo, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppContext } from '../context/AppContext';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { storageService } from '../services/storage';

const DEFAULT_CATEGORY = 'c1';

const ConfigScreen: React.FC = () => {
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

  // Categorias
  const pecsCategories = useMemo(
    () => [
      { id: 'c1', name: 'Sentimentos' },
      { id: 'c2', name: 'Comida' },
      { id: 'c3', name: 'Pessoas' },
      { id: 'c4', name: 'Objetos' },
      { id: 'c5', name: 'Lugares' },
    ],
    []
  );

  // Perfil
  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');

  // PIN de configuração
  const [pin, setPin] = useState('');
  const [pinConfirm, setPinConfirm] = useState('');
  const [hasPin, setHasPin] = useState(false);

  useEffect(() => {
    const loadPin = async () => {
      const savedPin = await storageService.loadConfigPin();
      if (savedPin) {
        setHasPin(true);
      }
    };
    loadPin();
  }, []);

  const handleSavePin = async () => {
    if (pin.length !== 6 || pinConfirm.length !== 6) {
      Alert.alert('Erro', 'O PIN deve ter exatamente 6 dígitos.');
      return;
    }
    if (pin !== pinConfirm) {
      Alert.alert('Erro', 'Os dois PINs não conferem.');
      return;
    }
    const ok = await storageService.saveConfigPin(pin);
    if (ok) {
      setHasPin(true);
      setPin('');
      setPinConfirm('');
      Alert.alert('Sucesso', 'PIN de configuração salvo com sucesso.');
    } else {
      Alert.alert('Erro', 'Não foi possível salvar o PIN. Tente novamente.');
    }
  };

  // Rotina
  const [newRoutineTitle, setNewRoutineTitle] = useState('');
  const [editRoutineId, setEditRoutineId] = useState<string | null>(null);
  const [editRoutineTitle, setEditRoutineTitle] = useState('');

  // PECS
  const [newPecsText, setNewPecsText] = useState('');
  const [editPecsId, setEditPecsId] = useState<string | null>(null);
  const [editPecsText, setEditPecsText] = useState('');
  const [newPecsCategory, setNewPecsCategory] = useState<string>(DEFAULT_CATEGORY);
  const [editPecsCategory, setEditPecsCategory] = useState<string>(DEFAULT_CATEGORY);

  // Helpers UX
  const clearRoutineForm = () => {
    setNewRoutineTitle('');
    setEditRoutineId(null);
    setEditRoutineTitle('');
  };

  const clearPecsForm = () => {
    setNewPecsText('');
    setNewPecsCategory(DEFAULT_CATEGORY);
    setEditPecsId(null);
    setEditPecsText('');
    setEditPecsCategory(DEFAULT_CATEGORY);
  };

  // Perfil
  const handleSaveProfile = () => {
    if (!name.trim()) {
      Alert.alert('Validação', 'Informe o nome da criança.');
      return;
    }
    updateUser(name.trim(), phone.trim());
    Alert.alert('Sucesso', 'Perfil atualizado.');
  };

  // Rotina
  const handleAddRoutine = () => {
    if (!newRoutineTitle.trim()) return;
    addRoutineItem({
      id: Date.now().toString(),
      title: newRoutineTitle.trim(),
      time: '09:00',
      icon: 'calendar',
      completed: false,
      category: '',
    });
    setNewRoutineTitle('');
  };

  const handleEditRoutine = () => {
    if (!editRoutineId || !editRoutineTitle.trim()) return;
    editRoutineItem(editRoutineId, { title: editRoutineTitle.trim() });
    clearRoutineForm();
  };

  // PECS
  const handleAddPecs = () => {
    if (!newPecsText.trim()) return;
    addPecsButton({
      id: Date.now().toString(),
      categoryId: newPecsCategory,
      text: newPecsText.trim(),
      icon: 'star',
      audioText: newPecsText.trim(),
      notifyWhatsApp: true,
    });
    clearPecsForm();
  };

  const handleEditPecs = () => {
    if (!editPecsId || !editPecsText.trim()) return;
    editPecsButton(editPecsId, {
      text: editPecsText.trim(),
      categoryId: editPecsCategory,
    });
    clearPecsForm();
  };

  // Remover com confirmação
  const confirmRemovePecs = (id: string) => {
    Alert.alert('Remover', 'Remover este botão PECS?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Remover', style: 'destructive', onPress: () => removePecsButton(id) },
    ]);
  };

  const confirmRemoveRoutine = (id: string) => {
    Alert.alert('Remover', 'Remover esta atividade?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Remover', style: 'destructive', onPress: () => removeRoutineItem(id) },
    ]);
  };

  const renderRoutineList = () =>
    routine.map(item => (
      <View key={item.id} style={styles.listRow}>
        <Text style={styles.itemText}>{item.title}</Text>

        <TouchableOpacity
          onPress={() => {
            setEditRoutineId(item.id);
            setEditRoutineTitle(item.title);
          }}
          style={styles.smallAction}
        >
          <Text style={styles.editButton}>Editar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => confirmRemoveRoutine(item.id)} style={styles.smallAction}>
          <Text style={styles.removeButton}>Remover</Text>
        </TouchableOpacity>
      </View>
    ));

  const renderPecsList = () =>
    pecsButtons.map(item => (
      <View key={item.id} style={styles.listRow}>
        <Text style={styles.itemText}>
          {item.text}
          <Text style={styles.itemMeta}>
            {' '}— {pecsCategories.find(c => c.id === item.categoryId)?.name || '—'}
          </Text>
        </Text>

        <TouchableOpacity
          onPress={() => {
            setEditPecsId(item.id);
            setEditPecsText(item.text);
            setEditPecsCategory(item.categoryId || DEFAULT_CATEGORY);
          }}
          style={styles.smallAction}
        >
          <Text style={styles.editButton}>Editar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => confirmRemovePecs(item.id)} style={styles.smallAction}>
          <Text style={styles.removeButton}>Remover</Text>
        </TouchableOpacity>
      </View>
    ));

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 0}
      >
        <FlatList
          data={[]}
          ListHeaderComponent={
            <View style={styles.content}>
              {/* Perfil */}
              <Text style={styles.header}>Perfil da Criança</Text>

              <Text style={styles.label}>Nome</Text>
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Nome da Criança"
                placeholderTextColor={colors.disabled}
                returnKeyType="done"
              />

              <Text style={styles.label}>Telefone do cuidador</Text>
              <TextInput
                style={styles.input}
                value={phone}
                onChangeText={setPhone}
                placeholder="Ex: +5531999999999"
                placeholderTextColor={colors.disabled}
                keyboardType="phone-pad"
                returnKeyType="done"
              />

              {/* PIN DE CONFIGURAÇÃO */}
              <Text style={styles.label}>PIN de Configuração (6 dígitos)</Text>
              <TextInput
                style={styles.input}
                value={pin}
                onChangeText={setPin}
                placeholder={hasPin ? 'Alterar PIN' : 'Criar PIN de 6 dígitos'}
                placeholderTextColor={colors.disabled}
                keyboardType="number-pad"
                maxLength={6}
                secureTextEntry
              />

              <Text style={styles.label}>Confirmar PIN</Text>
              <TextInput
                style={styles.input}
                value={pinConfirm}
                onChangeText={setPinConfirm}
                placeholder="Repita o PIN"
                placeholderTextColor={colors.disabled}
                keyboardType="number-pad"
                maxLength={6}
                secureTextEntry
              />

              <View style={styles.rowButtons}>
                <View style={styles.buttonWrapper}>
                  <Button title="Salvar PIN" onPress={handleSavePin} color={colors.primary} />
                </View>
              </View>

              <View style={styles.rowButtons}>
                <View style={styles.buttonWrapper}>
                  <Button title="Salvar Perfil" onPress={handleSaveProfile} color={colors.primary} />
                </View>
              </View>

              <View style={styles.divider} />

              {/* Rotina */}
              <Text style={styles.header}>Editar Rotina</Text>

              <TextInput
                style={styles.input}
                value={editRoutineId ? editRoutineTitle : newRoutineTitle}
                onChangeText={editRoutineId ? setEditRoutineTitle : setNewRoutineTitle}
                placeholder={editRoutineId ? 'Editar atividade' : 'Nova atividade'}
                placeholderTextColor={colors.disabled}
                returnKeyType="done"
              />

              <View style={styles.rowButtons}>
                <View style={styles.buttonWrapper}>
                  <Button
                    title={editRoutineId ? 'Salvar Edição' : 'Adicionar Atividade'}
                    onPress={editRoutineId ? handleEditRoutine : handleAddRoutine}
                    color={colors.primary}
                  />
                </View>

                {editRoutineId ? (
                  <TouchableOpacity
                    style={styles.ghostButton}
                    onPress={() => clearRoutineForm()}
                  >
                    <Text style={styles.ghostButtonText}>Cancelar</Text>
                  </TouchableOpacity>
                ) : null}
              </View>

              <View style={styles.sectionList}>
                {routine.length ? (
                  renderRoutineList()
                ) : (
                  <Text style={styles.placeholder}>Nenhuma atividade cadastrada.</Text>
                )}
              </View>

              <View style={styles.divider} />

              {/* PECS */}
              <Text style={styles.header}>Editar Botões "Quero Dizer"</Text>

              <TextInput
                style={styles.input}
                value={editPecsId ? editPecsText : newPecsText}
                onChangeText={editPecsId ? setEditPecsText : setNewPecsText}
                placeholder={editPecsId ? 'Editar frase' : 'Nova frase PECS'}
                placeholderTextColor={colors.disabled}
                returnKeyType="done"
              />

              <Text style={styles.label}>Categoria</Text>
              <View style={styles.categoryContainer}>
                {pecsCategories.map(cat => {
                  const isSelected = (editPecsId ? editPecsCategory : newPecsCategory) === cat.id;
                  return (
                    <TouchableOpacity
                      key={cat.id}
                      onPress={() =>
                        editPecsId ? setEditPecsCategory(cat.id) : setNewPecsCategory(cat.id)
                      }
                      style={[
                        styles.categoryButton,
                        isSelected ? styles.categoryButtonSelected : null,
                      ]}
                      activeOpacity={0.85}
                    >
                      <Text style={[styles.categoryText, isSelected ? styles.categoryTextSelected : null]}>
                        {cat.name}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>

              <View style={styles.rowButtons}>
                <View style={styles.buttonWrapper}>
                  <Button
                    title={editPecsId ? 'Salvar Edição' : 'Adicionar Botão'}
                    onPress={editPecsId ? handleEditPecs : handleAddPecs}
                    color={colors.primary}
                  />
                </View>

                {editPecsId ? (
                  <TouchableOpacity style={styles.ghostButton} onPress={() => clearPecsForm()}>
                    <Text style={styles.ghostButtonText}>Cancelar</Text>
                  </TouchableOpacity>
                ) : null}
              </View>

              <View style={styles.sectionList}>
                {pecsButtons.length ? (
                  renderPecsList()
                ) : (
                  <Text style={styles.placeholder}>Nenhum botão PECS cadastrado.</Text>
                )}
              </View>

              <View style={{ height: 36 }} />
            </View>
          }
          keyExtractor={() => 'k'}
          renderItem={null}
          showsVerticalScrollIndicator={false}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 30,
    maxWidth: 900,
    width: '100%',
    alignSelf: 'center',
  },
  header: {
    ...typography.subtitle,
    fontSize: 18,
    color: colors.text,
    marginBottom: 12,
    marginTop: 6,
  },
  label: {
    ...typography.body,
    fontSize: 14,
    color: colors.text,
    marginBottom: 6,
  },
  input: {
    ...typography.body,
    backgroundColor: colors.white,
    borderColor: colors.disabled,
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginBottom: 12,
    color: colors.text,
  },
  divider: {
    height: 1,
    backgroundColor: colors.disabled,
    marginVertical: 22,
  },
  rowButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  buttonWrapper: {
    flex: 0,
    marginRight: 12,
    minWidth: 150,
  },
  ghostButton: {
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  ghostButtonText: {
    color: colors.accent,
    ...typography.body,
  },
  sectionList: {
    marginTop: 6,
    marginBottom: 6,
  },
  listRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: colors.surface || colors.white,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.disabled,
  },
  itemText: {
    flex: 1,
    ...typography.body,
    color: colors.text,
  },
  itemMeta: {
    ...typography.caption,
    color: colors.disabled,
  },
  smallAction: {
    marginLeft: 8,
  },
  editButton: {
    color: colors.accent,
    ...typography.button,
  },
  removeButton: {
    color: colors.danger,
    ...typography.button,
  },
  placeholder: {
    ...typography.body,
    color: colors.disabled,
    fontStyle: 'italic',
    textAlign: 'center',
    paddingVertical: 14,
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 14,
  },
  categoryButton: {
    borderWidth: 1,
    borderColor: colors.disabled,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
    marginBottom: 8,
    backgroundColor: colors.white,
  },
  categoryButtonSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  categoryText: {
    ...typography.body,
    color: colors.text,
  },
  categoryTextSelected: {
    color: colors.white,
  },
});

export default ConfigScreen;
