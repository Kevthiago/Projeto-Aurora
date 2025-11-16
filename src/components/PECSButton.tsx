import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // npm install @react-native-picker/picker
import { useAppContext } from '../context/AppContext';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';

// Formulário de cadastro de botão PECS
const AddPECSButtonForm = () => {
  const { addPecsButton, pecsCategories } = useAppContext();

  const [newPecsText, setNewPecsText] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState(
    pecsCategories[0]?.id || ''
  );
  const [icon, setIcon] = useState('food-apple-outline'); // Ícone padrão

  const handleAddPecsButton = () => {
    if (!newPecsText.trim() || !selectedCategoryId) return;

    // Debug para garantir que o id está correto
    console.log('Categoria escolhida:', selectedCategoryId);

    // ADICIONA O BOTÃO USANDO O ID DA CATEGORIA ESCOLHIDA
    addPecsButton({
      id: Date.now().toString(),
      categoryId: selectedCategoryId, // Usa sempre o id (ex: 'c2' para comida)
      text: newPecsText,
      icon: icon,
      audioText: newPecsText,
      notifyWhatsApp: true,
    });

    setNewPecsText('');
  };

  return (
    <View style={styles.section}>
      <Text style={styles.label}>Texto do botão PECS:</Text>
      <TextInput
        style={styles.input}
        value={newPecsText}
        onChangeText={setNewPecsText}
        placeholder="Ex: Bolo, Lasanha, Parquinho"
      />
      <Text style={styles.label}>Categoria:</Text>
  <Picker
  selectedValue={selectedCategoryId}
  onValueChange={setSelectedCategoryId}
  style={styles.input}
>
  {pecsCategories.map(cat => (
    <Picker.Item key={cat.id} label={cat.name} value={cat.id} />
  ))}
</Picker>
      <Button
        title="Adicionar Botão"
        onPress={handleAddPecsButton}
        color={colors.primary}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginVertical: 20,
    padding: 16,
    backgroundColor: colors.white,
    borderRadius: 8,
  },
  label: {
    ...typography.body,
    color: colors.text,
    marginBottom: 8,
  },
  input: {
    ...typography.body,
    backgroundColor: colors.background,
    borderColor: colors.disabled,
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
});

export default AddPECSButtonForm;
