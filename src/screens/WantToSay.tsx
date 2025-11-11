// src/screens/WantToSay.tsx
import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  // REFAKTOR 2/3: Removido 'SafeAreaView' da importação errada
} from 'react-native';
//
// REFAKTOR 1/3: Importando o 'SafeAreaView' CORRETO
//
import { SafeAreaView } from 'react-native-safe-area-context'; 
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppContext } from '../context/AppContext';
import PECSButton from '../components/PECSButton'; // O Componente
import { colors } from '../theme/colors'; // Caminho correto
import { typography } from '../theme/typography'; // Caminho correto
import { PECSButton as PECSButtonType } from '../data/types'; // O Tipo (renomeado)

const WantToSayScreen = () => {
  const { pecsCategories, pecsButtons, speak } = useAppContext();
  const [selectedCategoryId, setSelectedCategoryId] = useState(
    pecsCategories[0]?.id || null
  );

  const filteredButtons = useMemo(() => {
    return pecsButtons.filter((btn) => btn.categoryId === selectedCategoryId);
  }, [pecsButtons, selectedCategoryId]);

  const handlePressButton = (audioText: string) => {
    speak(audioText);
  };

  return (
    // Este <SafeAreaView> agora vai funcionar
    <SafeAreaView style={styles.container}>
      
      {/* 1. Grade de Botões */}
      <FlatList
        data={filteredButtons}
        keyExtractor={(item) => item.id}
        numColumns={3}
        renderItem={({ item }: { item: PECSButtonType }) => (
          <PECSButton
            iconName={item.icon as any}
            text={item.text}
            onPress={() => handlePressButton(item.audioText)}
          />
        )}
        // @ts-ignore (Mantendo o ignore para o bug de cache)
        contentContainerStyle={styles.grid}
        style={styles.listContainer}
      />

      {/* 2. Abas de Categoria (Bottom Tab Bar) */}
      <View style={styles.categoryContainer}>
        {pecsCategories.map((category) => {
          const isActive = selectedCategoryId === category.id;
          const iconColor = isActive ? colors.primary : colors.disabled;
          const textStyle = isActive ? styles.categoryTextActive : styles.categoryText;

          return (
            <TouchableOpacity
              key={category.id}
              style={styles.categoryButton}
              onPress={() => setSelectedCategoryId(category.id)}
              accessibilityLabel={`Categoria ${category.name}`}
              accessibilityState={{ selected: isActive }}
            >
              <MaterialCommunityIcons
                name={category.icon as any}
                size={30}
                color={iconColor}
              />
              <Text style={textStyle}>
                {category.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  listContainer: {
    flex: 1, 
  },
  grid: {
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20,
  },
  categoryContainer: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.disabled,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  categoryButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12, // Controla a altura do toque
  },
  categoryText: {
    ...typography.caption,
    color: colors.text,
    fontSize: 14,
    marginTop: 4,
  },
  categoryTextActive: {
    ...typography.caption,
    color: colors.primary,
    fontSize: 14,
    marginTop: 4,
    fontWeight: '700',
  },
});

export default WantToSayScreen;