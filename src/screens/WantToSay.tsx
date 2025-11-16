import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'; 
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppContext } from '../context/AppContext';
import PECSButton from '../components/PECSButton';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { PECSButton as PECSButtonType } from '../data/types';

const WantToSayScreen = () => {
  const { pecsCategories, pecsButtons, speak, notifyCaregiverWhatsApp } = useAppContext();
  const [selectedCategoryId, setSelectedCategoryId] = useState(
    pecsCategories[0]?.id || null
  );

  const filteredButtons = useMemo(() => {
    return pecsButtons.filter((btn) => btn.categoryId === selectedCategoryId);
  }, [pecsButtons, selectedCategoryId]);

  const handlePressButton = (item: PECSButtonType) => {
    speak(item.audioText);
    // Notifica no WhatsApp TODAS as seleções:
    notifyCaregiverWhatsApp(`Seu filho selecionou: ${item.text}`);
    // Para notificar só alguns, use:
    // if (item.notifyWhatsApp) notifyCaregiverWhatsApp(`Seu filho selecionou: ${item.text}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={filteredButtons}
        keyExtractor={(item) => item.id}
        numColumns={3}
        renderItem={({ item }) => (
          <PECSButton
            iconName={item.icon as any}
            text={item.text}
            onPress={() => handlePressButton(item)}
          />
        )}
        contentContainerStyle={styles.grid}
        style={styles.listContainer}
      />
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
              <Text style={textStyle}>{category.name}</Text>
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
    paddingVertical: 12,
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
