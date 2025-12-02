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
import { MaterialCommunityIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
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

  // --- ESTADOS DE SEGURANÇA ---
  const [isLoading, setIsLoading] = useState(true);
  const [isLocked, setIsLocked] = useState(true);
  const [storedPin, setStoredPin] = useState<string | null>(null);
  const [unlockInput, setUnlockInput] = useState('');
  
  // Controle para exibir/esconder a área de TROCAR SENHA
  const [showChangePin, setShowChangePin] = useState(false);

  useEffect(() => {
    const checkSecurity = async () => {
      const pin = await storageService.loadConfigPin();
      setStoredPin(pin);
      if (pin) {
        setIsLocked(true);
      } else {
        setIsLocked(false);
      }
      setIsLoading(false);
    };
    checkSecurity();
  }, []);

  const handleUnlock = () => {
    if (unlockInput === storedPin) {
      setIsLocked(false);
      setUnlockInput('');
    } else {
      if (Platform.OS === 'web') alert('Senha incorreta');
      else Alert.alert('Acesso Negado', 'PIN incorreto.');
      setUnlockInput('');
    }
  };

  // --- DADOS DO FORMULÁRIO ---
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

  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  
  const [newPin, setNewPin] = useState('');
  const [newPinConfirm, setNewPinConfirm] = useState('');

  // --- ROTINA ---
  const [newRoutineTitle, setNewRoutineTitle] = useState('');
  const [newRoutineTime, setNewRoutineTime] = useState(''); // <--- NOVO
  const [editRoutineId, setEditRoutineId] = useState<string | null>(null);
  const [editRoutineTitle, setEditRoutineTitle] = useState('');
  const [editRoutineTime, setEditRoutineTime] = useState(''); // <--- NOVO

  const [newPecsText, setNewPecsText] = useState('');
  const [editPecsId, setEditPecsId] = useState<string | null>(null);
  const [editPecsText, setEditPecsText] = useState('');
  const [newPecsCategory, setNewPecsCategory] = useState<string>(DEFAULT_CATEGORY);
  const [editPecsCategory, setEditPecsCategory] = useState<string>(DEFAULT_CATEGORY);

  // --- TIME PICKER ---
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [pickerDate, setPickerDate] = useState(new Date());
  const [isEditingTime, setIsEditingTime] = useState(false);

  const stringToDate = (timeString: string) => {
    const d = new Date();
    if (!timeString) return d;
    const [hours, minutes] = timeString.split(':').map(Number);
    d.setHours(hours || 0); d.setMinutes(minutes || 0);
    return d;
  };

  const openTimePicker = (isEdit: boolean) => {
    const currentTimeString = isEdit ? editRoutineTime : newRoutineTime;
    setPickerDate(stringToDate(currentTimeString));
    setIsEditingTime(isEdit);
    setShowTimePicker(true);
  };

  const onTimeChange = (event: any, selectedDate?: Date) => {
    if (Platform.OS === 'android') setShowTimePicker(false);
    if (selectedDate) {
      const hours = selectedDate.getHours().toString().padStart(2, '0');
      const minutes = selectedDate.getMinutes().toString().padStart(2, '0');
      const timeString = `${hours}:${minutes}`;
      isEditingTime ? setEditRoutineTime(timeString) : setNewRoutineTime(timeString);
    }
  };

  // --- AÇÕES ---
  const handleSavePin = async () => {
    if (newPin.length !== 6 || newPinConfirm.length !== 6) {
      alert('O PIN deve ter 6 dígitos.');
      return;
    }
    if (newPin !== newPinConfirm) {
      alert('Os PINs não conferem.');
      return;
    }
    const ok = await storageService.saveConfigPin(newPin);
    if (ok) {
      setStoredPin(newPin);
      setNewPin('');
      setNewPinConfirm('');
      setShowChangePin(false); // Esconde o formulário após salvar
      alert('Novo PIN salvo com sucesso.');
    } else {
      alert('Erro ao salvar PIN.');
    }
  };

  const handleSaveProfile = () => {
    if (!name.trim()) {
      alert('Informe o nome da criança.');
      return;
    }
    updateUser(name.trim(), phone.trim());
    if (Platform.OS === 'web') alert('Perfil salvo!');
    else Alert.alert('Sucesso', 'Perfil salvo.');
  };

  // ... (Helpers de limpar form mantidos igual)
  const clearRoutineForm = () => {
    setNewRoutineTitle('');
    setNewRoutineTime(''); // <--- NOVO
    setEditRoutineId(null);
    setEditRoutineTitle('');
    setEditRoutineTime(''); // <--- NOVO
  };
  const clearPecsForm = () => {
    setNewPecsText('');
    setNewPecsCategory(DEFAULT_CATEGORY);
    setEditPecsId(null);
    setEditPecsText('');
    setEditPecsCategory(DEFAULT_CATEGORY);
  };

  // ... (Handlers de Rotina e PECS mantidos igual, omitindo para brevidade pois funcionam)
  // --- HANDLERS ROTINA ---
  const handleAddRoutine = () => {
    if (!newRoutineTitle.trim()) {
        alert("Digite o nome da atividade");
        return;
    }
    // Se não digitar hora, usa 08:00 como padrão
    const time = newRoutineTime.trim() || '08:00'; 

    addRoutineItem && addRoutineItem({
      id: Date.now().toString(),
      title: newRoutineTitle.trim(),
      time: time, // <--- USA O TIME
      icon: 'calendar',
      completed: false,
      category: '',
    });
    clearRoutineForm();
  };

  const handleEditRoutine = () => {
    if (!editRoutineId) return;
    const time = editRoutineTime.trim() || '08:00';
    
    editRoutineItem && editRoutineItem(editRoutineId, { 
        title: editRoutineTitle.trim(),
        time: time // <--- USA O TIME
    });
    clearRoutineForm();
  };
  const confirmRemoveRoutine = (id: string) => {
    if(Platform.OS === 'web') { if(confirm('Remover?')) removeRoutineItem(id); }
    else Alert.alert('Remover', 'Confirmar?', [{text:'Cancelar'}, {text:'Sim', onPress:()=>removeRoutineItem(id)}]);
  };
  const handleAddPecs = () => {
    if(!newPecsText.trim()) return;
    addPecsButton && addPecsButton({ id: Date.now().toString(), categoryId: newPecsCategory, text: newPecsText.trim(), icon: 'star', audioText: newPecsText.trim(), notifyWhatsApp: true });
    clearPecsForm();
  };
  const handleEditPecs = () => {
    if(!editPecsId) return;
    editPecsButton && editPecsButton(editPecsId, { text: editPecsText.trim(), categoryId: editPecsCategory });
    clearPecsForm();
  };
  const confirmRemovePecs = (id: string) => {
    if(Platform.OS === 'web') { if(confirm('Remover?')) removePecsButton(id); }
    else Alert.alert('Remover', 'Confirmar?', [{text:'Cancelar'}, {text:'Sim', onPress:()=>removePecsButton(id)}]);
  };


  // --- RENDERS ---
  // --- ORDERNAR POR HORÁRIO ---
  const sortedRoutine = useMemo(() => {
    // Cria uma cópia da rotina [...] para não afetar o original
    // e ordena comparando a string de tempo (a.time vs b.time)
    return [...routine].sort((a, b) => a.time.localeCompare(b.time));
  }, [routine]);
  const renderRoutineList = () =>
    // REFAKTOR: Mudamos de 'routine.map' para 'sortedRoutine.map'
    sortedRoutine.map(item => (
      <View key={item.id} style={styles.listRow}>
        <View style={{flex: 1}}>
            <Text style={styles.itemTime}>{item.time}</Text>
            <Text style={styles.itemText}>{item.title}</Text>
        </View>
        
        <TouchableOpacity
          onPress={() => {
            setEditRoutineId(item.id);
            setEditRoutineTitle(item.title);
            setEditRoutineTime(item.time);
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

  const renderPecsList = () => pecsButtons.map(item => (
    <View key={item.id} style={styles.listRow}>
      <Text style={styles.itemText}>{item.text} <Text style={styles.itemMeta}>— {pecsCategories.find(c => c.id === item.categoryId)?.name}</Text></Text>
      <TouchableOpacity onPress={() => { setEditPecsId(item.id); setEditPecsText(item.text); setEditPecsCategory(item.categoryId || DEFAULT_CATEGORY); }} style={styles.smallAction}><Text style={styles.editButton}>Editar</Text></TouchableOpacity>
      <TouchableOpacity onPress={() => confirmRemovePecs(item.id)} style={styles.smallAction}><Text style={styles.removeButton}>Remover</Text></TouchableOpacity>
    </View>
  ));


  // 1. TELA DE CARREGAMENTO
  if (isLoading) {
    return <SafeAreaView style={styles.safeCenter}><Text>Carregando...</Text></SafeAreaView>;
  }

  // 2. TELA DE BLOQUEIO (LOCK SCREEN)
  if (isLocked) {
    return (
      <SafeAreaView style={styles.safeCenter}>
        <View style={styles.lockContainer}>
          <MaterialCommunityIcons name="shield-lock" size={64} color={colors.primary} />
          <Text style={styles.lockTitle}>Área do Cuidador</Text>
          <Text style={styles.lockSubtitle}>Digite seu PIN para configurar</Text>
          
          <TextInput
            style={styles.lockInput}
            value={unlockInput}
            onChangeText={setUnlockInput}
            placeholder="PIN"
            keyboardType="number-pad"
            maxLength={6}
            secureTextEntry
            autoFocus
          />
          <Button title="Desbloquear" onPress={handleUnlock} color={colors.primary} />
        </View>
      </SafeAreaView>
    );
  }

  // 3. TELA DE CONFIGURAÇÃO (LIBERADA)
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
              <Text style={styles.screenTitle}>Configurações</Text>

              {/* SEÇÃO SEGURANÇA (Colapsável) */}
              <View style={styles.cardSection}>
                <TouchableOpacity 
                    style={styles.sectionHeaderClickable} 
                    onPress={() => setShowChangePin(!showChangePin)}
                >
                    <Text style={styles.header}>Segurança e Acesso</Text>
                    <MaterialCommunityIcons name={showChangePin ? "chevron-up" : "chevron-down"} size={24} color={colors.text} />
                </TouchableOpacity>
                
                {showChangePin ? (
                    <View style={{ marginTop: 10 }}>
                        <Text style={styles.label}>{storedPin ? "Definir novo PIN" : "Criar PIN inicial"}</Text>
                        <TextInput style={styles.input} value={newPin} onChangeText={setNewPin} placeholder="Novo PIN (6 dígitos)" keyboardType="number-pad" maxLength={6} secureTextEntry />
                        <TextInput style={styles.input} value={newPinConfirm} onChangeText={setNewPinConfirm} placeholder="Confirme o PIN" keyboardType="number-pad" maxLength={6} secureTextEntry />
                        <Button title="Salvar Novo PIN" onPress={handleSavePin} color={colors.primary} />
                    </View>
                ) : (
                    <Text style={styles.helperText}>
                        {storedPin ? "PIN cadastrado. Toque para alterar." : "Nenhum PIN cadastrado. Toque para proteger."}
                    </Text>
                )}
              </View>

              {/* SEÇÃO PERFIL */}
              <View style={styles.cardSection}>
                  <Text style={styles.header}>Perfil</Text>
                  <Text style={styles.label}>Nome da Criança</Text>
                  <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Nome" />
                  <Text style={styles.label}>Telefone (WhatsApp)</Text>
                  <TextInput style={styles.input} value={phone} onChangeText={setPhone} placeholder="+55..." keyboardType="phone-pad" />
                  <Button title="Salvar Perfil" onPress={handleSaveProfile} color={colors.primary} />
              </View>

              {/* SEÇÃO ROTINA (COM HORÁRIO) */}
              <View style={styles.cardSection}>
                  <Text style={styles.header}>Atividades da Rotina</Text>
                  
                  {/* Inputs em linha para Horário e Nome */}
                  <View style={styles.rowInputs}>
                    <View style={{flex: 1, marginRight: 10}}>
                        <Text style={styles.label}>Horário</Text>
                        
                        {/* --- CORREÇÃO: Botão clicável no lugar do TextInput manual --- */}
                        <TouchableOpacity 
                            style={styles.inputClickable} 
                            onPress={() => openTimePicker(!!editRoutineId)}
                        >
                            <Text style={styles.inputText}>
                                {(editRoutineId ? editRoutineTime : newRoutineTime) || "00:00"}
                            </Text>
                            <MaterialCommunityIcons name="clock-outline" size={20} color={colors.disabled} />
                        </TouchableOpacity>
                    </View>

                    <View style={{flex: 2}}>
                        <Text style={styles.label}>Atividade</Text>
                        <TextInput 
                            style={styles.input} 
                            value={editRoutineId ? editRoutineTitle : newRoutineTitle} 
                            onChangeText={editRoutineId ? setEditRoutineTitle : setNewRoutineTitle} 
                            placeholder="Nome da atividade" 
                        />
                    </View>
                  </View>

                  {/* --- CORREÇÃO: O componente do relógio precisa estar aqui --- */}
                  {showTimePicker && (
                    <DateTimePicker
                        value={pickerDate}
                        mode="time"
                        is24Hour={true}
                        display="default"
                        onChange={onTimeChange}
                    />
                  )}

                  <View style={styles.rowButtons}>
                    <View style={styles.buttonWrapper}>
                        <Button 
                            title={editRoutineId ? 'Salvar' : 'Adicionar'} 
                            onPress={editRoutineId ? handleEditRoutine : handleAddRoutine} 
                            color={colors.primary} 
                        />
                    </View>
                    {editRoutineId && <TouchableOpacity onPress={clearRoutineForm}><Text style={styles.ghostButtonText}>Cancelar</Text></TouchableOpacity>}
                  </View>
                  <View style={styles.sectionList}>
                    {sortedRoutine.length ? renderRoutineList() : <Text style={styles.placeholder}>Lista vazia</Text>}
                  </View>
              </View>

              {/* SEÇÃO PECS */}
              <View style={styles.cardSection}>
                  <Text style={styles.header}>Botões de Fala</Text>
                  <TextInput style={styles.input} value={editPecsId ? editPecsText : newPecsText} onChangeText={editPecsId ? setEditPecsText : setNewPecsText} placeholder="Texto falado" />
                  <Text style={styles.label}>Categoria</Text>
                  <View style={styles.categoryContainer}>
                    {pecsCategories.map(cat => (
                        <TouchableOpacity key={cat.id} onPress={() => editPecsId ? setEditPecsCategory(cat.id) : setNewPecsCategory(cat.id)} style={[styles.categoryButton, (editPecsId ? editPecsCategory : newPecsCategory) === cat.id && styles.categoryButtonSelected]}>
                          <Text style={[styles.categoryText, (editPecsId ? editPecsCategory : newPecsCategory) === cat.id && styles.categoryTextSelected]}>{cat.name}</Text>
                        </TouchableOpacity>
                    ))}
                  </View>
                  <View style={styles.rowButtons}>
                    <View style={styles.buttonWrapper}><Button title={editPecsId ? 'Salvar' : 'Adicionar'} onPress={editPecsId ? handleEditPecs : handleAddPecs} color={colors.primary} /></View>
                    {editPecsId && <TouchableOpacity onPress={clearPecsForm}><Text style={styles.ghostButtonText}>Cancelar</Text></TouchableOpacity>}
                  </View>
                  <View style={styles.sectionList}>{pecsButtons.length ? renderPecsList() : <Text style={styles.placeholder}>Lista vazia</Text>}</View>
              </View>
              
              <View style={{height: 40}} />
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
  safeCenter: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 30,
    width: '100%',
    maxWidth: 800,
    alignSelf: 'center',
  },
  screenTitle: {
    ...typography.title,
    color: colors.primary,
    marginBottom: 20,
  },
  cardSection: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#eee',
  },
  sectionHeaderClickable: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
  },
  header: {
    ...typography.subtitle,
    fontSize: 18,
    color: colors.text,
  },
  helperText: {
    ...typography.caption,
    color: colors.disabled,
    marginTop: 4,
  },
  label: {
    ...typography.body,
    fontSize: 14,
    color: colors.text,
    marginTop: 10,
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#f9f9f9',
    borderWidth: 1,
    borderColor: colors.disabled,
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  
  // --- Estilos para o botão que "imita" um input (Time Picker) ---
  inputClickable: {
    backgroundColor: '#f9f9f9',
    borderWidth: 1,
    borderColor: colors.disabled,
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputText: {
    ...typography.body,
    color: colors.text,
  },
  rowInputs: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  
  // --- Botões e Ações ---
  rowButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonWrapper: {
    marginRight: 10,
  },
  ghostButtonText: {
    color: colors.danger,
  },
  
  // --- Lista ---
  sectionList: {
    marginTop: 10,
  },
  listRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#f0f0f0',
  },
  itemText: {
    flex: 1,
    color: colors.text,
  },
  itemMeta: {
    color: colors.disabled,
    fontSize: 12,
  },
  itemTime: {
    fontSize: 13,
    color: colors.primary,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  smallAction: {
    marginLeft: 15,
  },
  editButton: {
    color: colors.accent,
    fontWeight: '600',
  },
  removeButton: {
    color: colors.danger,
    fontWeight: '600',
  },
  placeholder: {
    color: colors.disabled,
    fontStyle: 'italic',
    textAlign: 'center',
    padding: 10,
  },
  
  // --- Categorias ---
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoryButton: {
    borderWidth: 1,
    borderColor: colors.disabled,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  categoryButtonSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  categoryText: {
    color: colors.text,
    fontSize: 12,
  },
  categoryTextSelected: {
    color: colors.white,
  },
  
  // --- Lock Screen ---
  lockContainer: {
    width: '90%',
    maxWidth: 350,
    backgroundColor: colors.white,
    padding: 30,
    borderRadius: 20,
    alignItems: 'center',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  lockTitle: {
    ...typography.title,
    fontSize: 22,
    marginTop: 15,
    color: colors.text,
  },
  lockSubtitle: {
    color: colors.disabled,
    marginBottom: 20,
    textAlign: 'center',
  },
  lockInput: {
    fontSize: 24,
    letterSpacing: 5,
    textAlign: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 10,
    width: '100%',
    marginBottom: 20,
  },
});

export default ConfigScreen;