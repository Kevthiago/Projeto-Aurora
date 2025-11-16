import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAppContext } from "../context/AppContext";
import { colors } from "../theme/colors";
import { typography } from "../theme/typography";
import { PECSButton as PECSButtonType } from "../data/types";

const WantToSayScreen = () => {
  const {
    pecsCategories,
    pecsButtons,
    speak,
    notifyCaregiverWhatsApp,
  } = useAppContext();

  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

  // Botões filtrados pela categoria selecionada
 const filteredButtons = useMemo(() => {
  if (!selectedCategoryId) return [];
  return pecsButtons.filter((btn) => btn.categoryId === selectedCategoryId);
}, [pecsButtons, selectedCategoryId]);

  const handlePressButton = (item: PECSButtonType) => {
    speak(item.audioText);
    notifyCaregiverWhatsApp(`Seu filho selecionou: ${item.text}`);
  };

  // Botão de voltar para categorias
  const goBack = () => setSelectedCategoryId(null);

  return (
    <SafeAreaView style={styles.container}>
      {/* ========== TELA DE CATEGORIAS ========== */}
      {!selectedCategoryId && (
        <FlatList
          data={pecsCategories}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={styles.grid}
          ListHeaderComponent={
            <Text style={styles.header}>O que você quer dizer?</Text>
          }
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.categoryCard}
              onPress={() => setSelectedCategoryId(item.id)}
            >
              <MaterialCommunityIcons
                name={item.icon as any}
                size={48}
                color={colors.primary}
              />
              <Text style={styles.categoryLabel}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      )}

      {/* ========== TELA DE BOTÕES DA CATEGORIA ========== */}
      {selectedCategoryId && (
        <View style={{ flex: 1 }}>
          <TouchableOpacity onPress={goBack} style={styles.backBtn}>
            <Text style={styles.backTxt}>← Voltar</Text>
          </TouchableOpacity>
          <FlatList
            data={filteredButtons}
            keyExtractor={(item) => item.id}
            numColumns={3}
            contentContainerStyle={styles.gridButtons}
            columnWrapperStyle={{ justifyContent: "space-between" }}
            ListHeaderComponent={
              <Text style={styles.headerSmall}>
                {pecsCategories.find((c) => c.id === selectedCategoryId)?.name}
              </Text>
            }
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.buttonCard}
                onPress={() => handlePressButton(item)}
              >
                <MaterialCommunityIcons
                  name={item.icon as any}
                  size={40}
                  color={colors.primary}
                />
                <Text style={styles.buttonLabel}>{item.text}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    ...typography.title,
    fontSize: 26,
    textAlign: "center",
    marginBottom: 20,
    color: colors.text,
    fontWeight: "700",
  },
  headerSmall: {
    ...typography.title,
    fontSize: 22,
    textAlign: "center",
    marginBottom: 16,
    color: colors.text,
    fontWeight: "600",
  },
  grid: {
    padding: 20,
    gap: 20,
  },
  categoryCard: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: 16,
    paddingVertical: 26,
    margin: 8,
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
  },
  categoryLabel: {
    marginTop: 10,
    fontSize: 16,
    color: colors.text,
    fontWeight: "600",
  },
  gridButtons: { padding: 20 },
  buttonCard: {
    flexBasis: "30%",
    maxWidth: "30%",
    backgroundColor: colors.surface,
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 10,
    margin: 6,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  buttonLabel: {
    marginTop: 8,
    textAlign: "center",
    fontSize: 14,
    color: colors.text,
    fontWeight: "600",
  },
  backBtn: {
    marginLeft: 10,
    marginTop: 6,
    alignSelf: "flex-start",
  },
  backTxt: {
    color: colors.primary,
    fontSize: 17,
    fontWeight: "bold",
  },
});

export default WantToSayScreen;
