import React, { 
  useState, 
  useRef, 
  useEffect,
  useMemo // Adicionado useMemo para evitar recriação
} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Easing,
  Platform,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppContext } from '../context/AppContext';
import { colors } from '../theme/colors'; 
import { typography } from '../theme/typography';

type Mode = 'menu' | 'breathe' | 'messages' | 'timer';

const { width } = Dimensions.get('window');

const POSITIVE_MESSAGES = [
  'Está tudo bem.',
  'Eu estou seguro.',
  'Eu consigo lidar com isso.',
  'Respire fundo.',
  'Você é amado.',
  'Um passo de cada vez.',
];

const HowIFeelScreen = () => {
  // REFAKTOR: Adicionamos o 'speak' do contexto
  const { notifyCaregiverWhatsApp, speak } = useAppContext();
  const [mode, setMode] = useState<Mode>('menu');
  const [messageIndex, setMessageIndex] = useState(0);
  const [breathePhase, setBreathePhase] = useState<'inspire' | 'expire'>('inspire');

  const scaleAnim = useRef(new Animated.Value(1)).current;

  // --- NOVOS EFEITOS DE FALA ---

  // 1. Fala para o exercício de respiração
  useEffect(() => {
    if (mode === 'breathe') {
      // Fala "Inspire..." ou "Expire..." sempre que a fase mudar
      speak(breathePhase === 'inspire' ? 'Inspire...' : 'Expire...');
    }
  }, [mode, breathePhase, speak]);

  // 2. Fala para as mensagens positivas
  useEffect(() => {
    if (mode === 'messages') {
      // Fala a mensagem atual sempre que ela mudar (ou ao entrar na tela)
      speak(POSITIVE_MESSAGES[messageIndex]);
    }
  }, [mode, messageIndex, speak]);

  // -----------------------------

  // --- LÓGICA DO RESPIRADOR (INTACTA) ---
  useEffect(() => {
    if (mode === 'breathe') {
      scaleAnim.setValue(1);
      setBreathePhase('inspire');
      
      const breatheAnimation = Animated.loop(
        Animated.sequence([
          Animated.timing(scaleAnim, {
            toValue: 1.5,
            duration: 4000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 6000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      );

      breatheAnimation.start();

      const phaseInterval = setInterval(() => {
        setBreathePhase(prev => prev === 'inspire' ? 'expire' : 'inspire');
      }, 5000); // Ajuste fino visual para sincronizar com a animação 4s/6s (média 5s)

      return () => {
        breatheAnimation.stop();
        clearInterval(phaseInterval);
        scaleAnim.setValue(1);
        setBreathePhase('inspire');
      };
    } else {
      scaleAnim.setValue(1);
      setBreathePhase('inspire');
    }
  }, [mode, scaleAnim]);
  // --------------------------------------

  const nextMessage = () => {
    setMessageIndex((i) => (i + 1) % POSITIVE_MESSAGES.length);
  };

  const handleNeedAMinute = () => {
    setMode('timer');
    notifyCaregiverWhatsApp('precisa de um minuto (Botão de Pânico acionado).');
    setTimeout(() => {
      setMode((currentMode) => (currentMode === 'timer' ? 'menu' : currentMode));
    }, 5000); 
  };

  // --- RENDERIZADORES DE UI ---

  const renderMenu = () => (
    <View style={styles.menuContainer}>
      <Text style={styles.menuHeader}>Como você está?</Text>
      <Text style={styles.menuSubHeader}>Escolha uma ferramenta para se acalmar</Text>

      <TouchableOpacity
        style={[styles.cardButton, { backgroundColor: colors.accent }]}
        onPress={() => setMode('breathe')}
        activeOpacity={0.9}
      >
        <View style={styles.cardIcon}>
            <MaterialCommunityIcons name="weather-windy" size={48} color={colors.white} />
        </View>
        <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>Respirar</Text>
            <Text style={styles.cardSubtitle}>Exercício guiado para relaxar</Text>
        </View>
        <MaterialCommunityIcons name="chevron-right" size={32} color="rgba(255,255,255,0.6)" />
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.cardButton, { backgroundColor: colors.secondary }]}
        onPress={() => {
          setMessageIndex(0);
          setMode('messages');
        }}
        activeOpacity={0.9}
      >
        <View style={styles.cardIcon}>
            <MaterialCommunityIcons name="cards-heart-outline" size={48} color={colors.white} />
        </View>
        <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>Mensagens</Text>
            <Text style={styles.cardSubtitle}>Palavras positivas para você</Text>
        </View>
        <MaterialCommunityIcons name="chevron-right" size={32} color="rgba(255,255,255,0.6)" />
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.cardButton, { backgroundColor: colors.primary }]}
        onPress={handleNeedAMinute}
        activeOpacity={0.9}
      >
        <View style={styles.cardIcon}>
            <MaterialCommunityIcons name="timer-sand" size={48} color={colors.white} />
        </View>
        <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>Preciso de Tempo</Text>
            <Text style={styles.cardSubtitle}>Avisar que preciso de um minuto</Text>
        </View>
        <MaterialCommunityIcons name="chevron-right" size={32} color="rgba(255,255,255,0.6)" />
      </TouchableOpacity>
    </View>
  );

  const renderBreathe = () => (
    <View style={styles.centerContainer}>
      <View style={styles.breatheTextContainer}>
        <Text style={styles.breathePhaseTitle}>
            {breathePhase === 'inspire' ? 'Inspire...' : 'Expire...'}
        </Text>
        <Text style={styles.breathePhaseSubtitle}>
            Acompanhe o círculo
        </Text>
      </View>

      <View style={styles.circleWrapper}>
        {/* Círculo de fundo estático para referência */}
        <View style={styles.staticCircle} />
        {/* Círculo animado */}
        <Animated.View
            style={[styles.breatheCircle, { transform: [{ scale: scaleAnim }] }]}
        />
      </View>

      <TouchableOpacity onPress={() => setMode('menu')} style={styles.outlineButton}>
        <Text style={styles.outlineButtonText}>Encerrar Exercício</Text>
      </TouchableOpacity>
    </View>
  );

  const renderMessages = () => (
    <View style={styles.centerContainer}>
      <MaterialCommunityIcons name="format-quote-open" size={60} color="rgba(255,255,255,0.3)" style={{ marginBottom: -20 }} />
      
      <View style={styles.messageCard}>
        <Text style={styles.messageText}>{POSITIVE_MESSAGES[messageIndex]}</Text>
      </View>
      
      <MaterialCommunityIcons name="format-quote-close" size={60} color="rgba(255,255,255,0.3)" style={{ marginTop: -20, marginBottom: 40 }} />

      <View style={styles.actionRow}>
        <TouchableOpacity onPress={() => setMode('menu')} style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>Voltar</Text>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={nextMessage} style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>Próxima</Text>
            <MaterialCommunityIcons name="arrow-right" size={20} color={colors.text} style={{ marginLeft: 8 }} />
        </TouchableOpacity>
      </View>
    </View>
  );
  
  const renderTimer = () => (
    <View style={styles.centerContainer}>
      <View style={styles.timerCircle}>
        <MaterialCommunityIcons 
            name="clock-outline" 
            size={80} 
            color={colors.white} 
        />
      </View>
      
      <Text style={styles.timerTitle}>Tudo bem...</Text>
      <Text style={styles.timerSubtitle}>Tire um momento para você.</Text>
      
      <View style={styles.timerTag}>
        <MaterialCommunityIcons name="check" size={16} color={colors.success} />
        <Text style={styles.timerTagText}>Aviso enviado ao cuidador</Text>
      </View>
    </View>
  );

  const renderContent = () => {
    switch (mode) {
      case 'breathe': return renderBreathe();
      case 'messages': return renderMessages();
      case 'timer': return renderTimer();
      case 'menu':
      default:
        return renderMenu();
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {renderContent()}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.backgroundCalm, // Azul escuro suave
  },
  container: {
    flex: 1,
    padding: 24,
  },
  
  // --- MENU STYLES ---
  menuContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  menuHeader: {
    ...typography.display,
    fontSize: 32,
    color: colors.white,
    marginBottom: 8,
    fontWeight: 'bold',
  },
  menuSubHeader: {
    ...typography.body,
    fontSize: 18,
    color: 'rgba(255,255,255,0.7)',
    marginBottom: 40,
  },
  cardButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 24,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
    height: 120, // Altura fixa para consistência
  },
  cardIcon: {
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContent: {
    flex: 1,
    paddingHorizontal: 12,
  },
  cardTitle: {
    ...typography.subtitle,
    color: colors.white,
    fontSize: 22,
    marginBottom: 4,
  },
  cardSubtitle: {
    ...typography.body,
    color: 'rgba(255,255,255,0.9)',
    fontSize: 14,
  },

  // --- COMMON STYLES ---
  centerContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  // --- BREATHING STYLES ---
  breatheTextContainer: {
    position: 'absolute',
    top: '10%',
    alignItems: 'center',
    width: '100%',
  },
  breathePhaseTitle: {
    ...typography.display,
    color: colors.white,
    fontSize: 42,
    fontWeight: 'bold',
    letterSpacing: 1,
    marginBottom: 8,
  },
  breathePhaseSubtitle: {
    ...typography.body,
    color: 'rgba(255,255,255,0.6)',
    fontSize: 16,
  },
  circleWrapper: {
    width: 300,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  staticCircle: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  breatheCircle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: colors.accent, // Círculo principal
    shadowColor: colors.accent,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 20,
    elevation: 10,
  },
  
  // --- MESSAGE STYLES ---
  messageCard: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 30,
    padding: 30,
    width: '100%',
    minHeight: 200,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  messageText: {
    ...typography.title,
    color: colors.white,
    textAlign: 'center',
    fontSize: 28,
    lineHeight: 40,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 40,
    paddingHorizontal: 20,
  },
  
  // --- BUTTONS ---
  primaryButton: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 50,
    alignItems: 'center',
    elevation: 3,
  },
  primaryButtonText: {
    ...typography.button,
    color: colors.text,
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryButton: {
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  secondaryButtonText: {
    ...typography.button,
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  outlineButton: {
    position: 'absolute',
    bottom: 40,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.5)',
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  outlineButtonText: {
    ...typography.bodyBold,
    color: colors.white,
    fontSize: 14,
    letterSpacing: 1,
  },

  // --- TIMER STYLES ---
  timerCircle: {
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 4,
    borderColor: 'rgba(255,255,255,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  timerTitle: {
    ...typography.title,
    color: colors.white,
    fontSize: 32,
    marginBottom: 10,
  },
  timerSubtitle: {
    ...typography.body,
    color: 'rgba(255,255,255,0.7)',
    fontSize: 18,
    marginBottom: 40,
  },
  timerTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  timerTagText: {
    color: 'rgba(255,255,255,0.8)',
    marginLeft: 8,
    fontSize: 14,
  },
});

export default HowIFeelScreen;