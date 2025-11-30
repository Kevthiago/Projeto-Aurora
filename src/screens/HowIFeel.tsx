// src/screens/HowIFeel.tsx
import React, { 
  useState, 
  useRef, 
  useEffect
} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Easing,
  SafeAreaView,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppContext } from '../context/AppContext';
import { colors } from '../theme/colors'; 
import { typography } from '../theme/typography';

type Mode = 'menu' | 'breathe' | 'messages' | 'timer';

const POSITIVE_MESSAGES = [
  'Está tudo bem.',
  'Eu estou seguro.',
  'Eu consigo lidar com isso.',
  'Respire fundo.',
  'Você é amado.',
];

const HowIFeelScreen = () => {
  const { notifyCaregiverWhatsApp } = useAppContext();
  const [mode, setMode] = useState<Mode>('menu');
  const [messageIndex, setMessageIndex] = useState(0);
  const [breathePhase, setBreathePhase] = useState<'inspire' | 'expire'>('inspire');

  const scaleAnim = useRef(new Animated.Value(1)).current;

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

      // Alternar texto entre Inspire e Expire
      const phaseInterval = setInterval(() => {
        setBreathePhase(prev => prev === 'inspire' ? 'expire' : 'inspire');
      }, 5000);

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

  const nextMessage = () => {
    setMessageIndex((i) => (i + 1) % POSITIVE_MESSAGES.length);
  };

  const handleNeedAMinute = () => {
    setMode('timer');
    notifyCaregiverWhatsApp('precisa de um minuto.');
    setTimeout(() => {
      setMode((currentMode) => (currentMode === 'timer' ? 'menu' : currentMode));
    }, 5000); 
  };

  const renderMenu = () => (
    <View style={styles.menuContainer}>
      <TouchableOpacity
        style={[styles.menuButton, { backgroundColor: colors.accent }]}
        onPress={() => setMode('breathe')}
        accessibilityLabel="Respirar. Iniciar exercício de respiração."
      >
        <MaterialCommunityIcons name="weather-night" size={60} color={colors.white} />
        <Text style={styles.menuButtonText}>Respirar</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.menuButton, { backgroundColor: colors.secondary }]}
        onPress={() => {
          setMessageIndex(0);
          setMode('messages');
        }}
        accessibilityLabel="Mensagens Positivas. Ver mensagens de apoio."
      >
        <MaterialCommunityIcons name="comment-quote-outline" size={60} color={colors.white} />
        <Text style={styles.menuButtonText}>Mensagens Positivas</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.menuButton, { backgroundColor: colors.primary }]}
        onPress={handleNeedAMinute}
        accessibilityLabel="Preciso de um Minuto. Avisar cuidador e iniciar timer."
      >
        <MaterialCommunityIcons name="timer-sand" size={60} color={colors.white} />
        <Text style={styles.menuButtonText}>Preciso de um Minuto</Text>
      </TouchableOpacity>
    </View>
  );

  const renderBreathe = () => (
    <View style={styles.centerContainer}>
      <Text style={styles.breathePhaseText}>
        {breathePhase === 'inspire' ? 'Inspire...' : 'Expire...'}
      </Text>
      <Animated.View
        style={[styles.breatheCircle, { transform: [{ scale: scaleAnim }] }]}
      />
      <Text style={styles.instructionText}>Respire com o círculo</Text>
      <TouchableOpacity onPress={() => setMode('menu')} style={styles.backButton}>
        <Text style={styles.backButtonText}>Parar</Text>
      </TouchableOpacity>
    </View>
  );

  const renderMessages = () => (
    <View style={styles.centerContainer}>
      <Text style={styles.messageText}>{POSITIVE_MESSAGES[messageIndex]}</Text>
      <TouchableOpacity onPress={nextMessage} style={styles.nextButton}>
        <Text style={styles.backButtonText}>Próxima</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setMode('menu')} style={styles.backButton}>
        <Text style={styles.backButtonText}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
  
  const renderTimer = () => (
    <View style={styles.centerContainer}>
      <Text style={styles.instructionText}>Tudo bem...</Text>
      <Text style={styles.instructionText}>Aguarde um minuto.</Text>
      <MaterialCommunityIcons 
        name="clock-outline" 
        size={100} 
        color={colors.white} 
        style={{marginVertical: 40}} 
      />
      <Text style={styles.instructionText}>(Aviso enviado ao cuidador)</Text>
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
    backgroundColor: colors.backgroundCalm,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  // Menu
  menuContainer: {
    width: '100%',
    maxWidth: 500,
    alignItems: 'center',
  },
  menuButton: {
    width: '90%',
    height: 150,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  menuButtonText: {
    ...typography.subtitle,
    color: colors.white,
    marginTop: 10,
  },
  // Comum
  centerContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    marginTop: 40,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    backgroundColor: colors.white,
  },
  backButtonText: {
    ...typography.bodyBold,
    color: colors.text,
  },
  instructionText: {
    ...typography.subtitle,
    color: colors.white,
    opacity: 0.6,
    textAlign: 'center',
    marginTop: 40,
  },
  // Respirar
  breathePhaseText: {
    ...typography.title,
    color: colors.white,
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 40,
    textAlign: 'center',
  },
  breatheCircle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: colors.accent,
    marginVertical: 60,
  },
  // Mensagens
  messageText: {
    ...typography.title,
    color: colors.white,
    textAlign: 'center',
    marginHorizontal: 20,
    marginVertical: 60,
  },
  nextButton: {
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    backgroundColor: colors.secondary,
  }
});

export default HowIFeelScreen;
