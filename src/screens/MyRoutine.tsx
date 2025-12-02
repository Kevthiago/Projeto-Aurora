import React, { useMemo } from 'react';
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

  // Ordenação automática por horário (Crescente)
  const sortedRoutine = useMemo(() => {
    return [...routine].sort((a, b) => a.time.localeCompare(b.time));
  }, [routine]);

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
        {/* Ícone Lateral */}
        <View style={styles.iconContainer}>
            <MaterialCommunityIcons
            name={item.icon as any || 'calendar-check'} 
            size={40}
            color={item.completed ? colors.success : colors.primary}
            />
        </View>

        <View style={styles.textContainer}>
          {/* REFAKTOR: Agora mostramos 'GERAL' se não tiver categoria.
             Isso corrige o visual para tarefas criadas anteriormente.
          */}
          <Text style={[styles.category, item.completed && styles.textCompletedOpacity]}>
            {(item.category || 'Geral').toUpperCase()}
          </Text>

          {/* Título da Atividade */}
          <Text style={[styles.title, item.completed && styles.textCompleted]}>
            {item.title}
          </Text>

          {/* Horário */}
          <View style={styles.timeContainer}>
            <MaterialCommunityIcons name="clock-outline" size={14} color={item.completed ? colors.disabled : colors.text} />
            <Text style={[styles.time, item.completed && styles.textCompleted]}>
                {' '}{item.time}
            </Text>
          </View>
        </View>

        {/* Botão de Check */}
        <IconButton
          iconName={item.completed ? 'check-circle' : 'checkbox-blank-circle-outline'}
          size={44}
          color={item.completed ? colors.success : colors.disabled}
          onPress={() => handleToggle(item.id)}
          accessibilityLabel={item.completed ? 'Desmarcar tarefa' : 'Completar tarefa'}
        />

        {/* Estrela de Recompensa */}
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

  // Estado Vazio
  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
        <MaterialCommunityIcons name="emoticon-happy-outline" size={80} color={colors.disabled} />
        <Text style={styles.emptyText}>Tudo pronto por hoje!</Text>
        <Text style={styles.emptySubText}>Aproveite seu tempo livre.</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={sortedRoutine} 
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.listContainer}
        // @ts-ignore
        contentContainerStyle={sortedRoutine.length === 0 ? styles.centerContent : styles.listContent}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={renderEmpty}
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
    width: '100%',
    padding: 20,
    paddingBottom: 40,
  },
  centerContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 20, 
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 3,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  cardCompleted: {
    backgroundColor: '#F4F9F4', 
    opacity: 0.8,
    borderColor: '#E0E0E0',
    elevation: 0,
  },
  iconContainer: {
    marginRight: 16,
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  category: {
    ...typography.caption,
    color: colors.accent,
    fontWeight: '800',
    marginBottom: 2,
    fontSize: 12,
    letterSpacing: 0.5,
  },
  title: {
    ...typography.subtitle,
    color: colors.text,
    fontSize: 20, 
    marginBottom: 4,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  time: {
    ...typography.body,
    color: colors.text,
    opacity: 0.7,
    fontSize: 16,
    fontWeight: '500',
  },
  textCompleted: {
    textDecorationLine: 'line-through',
    color: colors.disabled,
  },
  textCompletedOpacity: {
     color: colors.disabled,
     opacity: 0.6,
  },
  separator: {
    height: 16,
  },
  star: {
    position: 'absolute',
    top: 10,
    right: 50, 
    transform: [{ rotate: '15deg' }],
    opacity: 0.8,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  emptyText: {
    ...typography.subtitle,
    color: colors.disabled,
    marginTop: 20,
    fontSize: 20,
  },
  emptySubText: {
    ...typography.body,
    color: colors.disabled,
    marginTop: 8,
  },
});

export default MyRoutineScreen;