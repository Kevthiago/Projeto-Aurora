// src/components/PECSButton.tsx
// Botão específico para a grade PECS (Quero Dizer)
import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  Dimensions,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';

interface PECSButtonProps {
  iconName: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
  text: string;
  onPress: () => void;
}

// Calcula o tamanho do botão para uma grade 3x3
// Isso funciona bem no Expo Web também.
const { width } = Dimensions.get('window');
const ITEM_MARGIN = 12;
const ITEM_SIZE = (width - ITEM_MARGIN * 6) / 3 > 120 ? 120 : (width - ITEM_MARGIN * 6) / 3; // Max 120px

const PECSButton: React.FC<PECSButtonProps> = ({
  iconName,
  text,
  onPress,
}) => {
  const accessibilityLabel = `Dizer: ${text}`;

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      accessible={true}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="button"
    >
      <MaterialCommunityIcons name={iconName} size={ITEM_SIZE * 0.5} color={colors.text} />
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: ITEM_SIZE,
    height: ITEM_SIZE,
    backgroundColor: colors.white,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    margin: ITEM_MARGIN,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  text: {
    ...typography.body,
    fontSize: 16, // Um pouco menor para caber
    color: colors.text,
    marginTop: 8,
    textAlign: 'center',
  },
});

export default PECSButton;