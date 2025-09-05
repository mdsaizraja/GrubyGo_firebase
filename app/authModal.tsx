
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons'; // Import icons
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Colors from '../constants/Colors';
import GrubygoLogo from '../components/GrubygoLogo';

interface AuthModalProps {
  visible: boolean;
  onClose: () => void;
}

// Define the services with corresponding icons
const services = [
  { name: "Grocery", icon: <MaterialCommunityIcons name="food-apple" size={32} color={Colors.text} /> },
  { name: "Food", icon: <MaterialCommunityIcons name="food" size={32} color={Colors.text} /> },
  { name: "Pharmacy", icon: <FontAwesome5 name="pills" size={32} color={Colors.text} /> },
  { name: "Services", icon: <FontAwesome5 name="concierge-bell" size={32} color={Colors.text} /> },
];

export default function AuthModal({ visible, onClose }: AuthModalProps) {
  const router = useRouter();
  const [serviceIndex, setServiceIndex] = useState(0);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    if (visible) {
        const animate = () => {
        fadeAnim.setValue(0);
        slideAnim.setValue(20);
        Animated.sequence([
            Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
            }),
            ]),
            Animated.delay(1500),
            Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: -20,
                duration: 500,
                useNativeDriver: true,
            }),
            ]),
        ]).start(() => {
            setTimeout(() => {
                setServiceIndex((prevIndex) => (prevIndex + 1) % services.length);
            }, 0);
        });
        };
        animate();
    }
  }, [serviceIndex, visible]);

  const handleContinue = () => {
    // Implement phone number verification logic here
    console.log("Continue button pressed");
    onClose();
  };

  const handleSkip = () => {
    router.replace('/');
    onClose();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <LinearGradient
        colors={[Colors.primary, Colors.secondary]}
        style={styles.container}
      >
        <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
          <Text style={styles.skipButtonText}>Skip</Text>
        </TouchableOpacity>
        <GrubygoLogo />

        <View style={styles.animatedServiceContainer}>
            <Animated.View style={[{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
                {services[serviceIndex].icon}
            </Animated.View>
        </View>

        <View style={styles.inputContainer}>
          <View style={styles.phoneInputContainer}>
            <Text style={styles.countryCode}>+91</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your phone number"
              placeholderTextColor={Colors.accent}
              keyboardType="phone-pad"
            />
          </View>
          <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
            <Text style={styles.continueButtonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  skipButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    fontWeight: 'bold',
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 100
  },
  skipButtonText: {
    color: Colors.text,
    fontSize: 16,
  },
  animatedServiceContainer: {
    height: 50, // Provide a fixed height to prevent layout jumps
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 20,
  },
  serviceText: {
    fontSize: 24,
    color: Colors.text,
    fontWeight: '300', // Lighter font weight for a faded look
  },
  inputContainer: {
    width: '80%',
  },
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 10,
    marginBottom: 20,
  },
  countryCode: {
    color: Colors.text,
    fontWeight: 'bold',
    fontSize: 18,
    paddingLeft: 15,
  },
  input: {
    flex: 1,
    color: Colors.text,
    padding: 15,
    fontSize: 18,
  },
  continueButton: {
    backgroundColor: Colors.accent,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text
  },
});
