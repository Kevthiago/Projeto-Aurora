// src/screens/MyRoutine.tsx
import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppContext } from '../context/AppContext';
import { RoutineItem } from '../data/types';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import IconButton from '../components/IconButton';

const MyRoutineScreen = () => {
  const { routine, toggleRoutineItem } = useAppContext();

  const handleToggle = (id: string) => {
    toggleRoutineItem(id);
  };

  const renderItem = ({ item }: { item: RoutineItem }) => {
    const accessibilityLabel = item.completed
      ? `Tarefa ${item.title} às ${item.time}, completa. Toque para desmarcar.`
      : `Tarefa ${item.title} às ${item.time}, pendente. Toque para completar.`;

    return (
      <View
        style={[styles.card, item.completed && styles.cardCompleted]}
        accessible={true}
        accessibilityLabel={accessibilityLabel}
      >
        <MaterialCommunityIcons
          name={item.icon as any}
          size={48}
          color={item.completed ? colors.success : colors.primary}
        />
        <View style={styles.textContainer}>
          {/*
            REFAKTOR: Esta é a nova informação de CONTEXTO
            Só aparece se 'item.category' existir nos seus dados
          */}
          {item.category && (
            <Text style={[styles.category, item.completed && styles.textCompletedOpacity]}>
              {item.category.toUpperCase()}
            </Text>
          )}

          <Text style={[styles.title, item.completed && styles.textCompleted]}>
            {item.title}
          </Text>
          <Text style={[styles.time, item.completed && styles.textCompleted]}>
            {item.time}
          </Text>
        </View>
        <IconButton
          iconName={item.completed ? 'check-circle' : 'checkbox-blank-circle-outline'}
          size={40}
          color={item.completed ? colors.success : colors.disabled}
          onPress={() => handleToggle(item.id)}
          accessibilityLabel={item.completed ? 'Desmarcar tarefa' : 'Completar tarefa'}
        />
        {item.completed && (
          <MaterialCommunityIcons
            name="star"
            size={30}
            color="#FFD700"
            style={styles.star}
          />
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={routine}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.listContainer}
        // @ts-ignore (Mantendo o ignore para o bug de cache)
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  listContainer: {
    width: '100%',
  },
  listContent: {
    // REFAKTOR: Cards com 100% de largura
    // Removido 'maxWidth' e 'alignSelf'
    width: '100%',
    padding: 20,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  cardCompleted: {
    backgroundColor: '#F0FFF0',
    opacity: 0.7,
  },
  textContainer: {
    flex: 1,
    marginLeft: 16,
  },
  // REFAKTOR: Novo estilo para a Categoria
  category: {
    ...typography.caption, // Usa um estilo de fonte menor
    color: colors.primary,
    fontWeight: '700',
    marginBottom: 4,
    opacity: 0.9,
    fontSize: 14,
  },
  title: {
    ...typography.subtitle,
    color: colors.text,
    fontSize: 22,
  },
  textCompleted: {
    textDecorationLine: 'line-through',
    color: colors.disabled,
  },
  // REFAKTOR: Estilo separado para a opacidade da categoria
  textCompletedOpacity: {
     color: colors.disabled,
     opacity: 0.7,
  },
  time: {
    ...typography.body,
    color: colors.text,
    opacity: 0.7,
  },
  separator: {
    height: 16, // Espaçamento vertical entre os cards
  },
  star: {
    position: 'absolute',
    top: -10,
    right: -10,
    transform: [{ rotate: '15deg' }],
  },
});

export default MyRoutineScreen;