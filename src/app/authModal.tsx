
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons'; // Import icons
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Animated,
  Keyboard,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import GrubygoLogo from '../components/GrubygoLogo';
import Colors from '../constants/Colors';
import { customerLogin } from '@/service/authServices';
import { useAuthStore } from '@/state/authStore';

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
  const [serviceIndex, setServiceIndex] = useState(0);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;
  const [showUserTypeOptions, setShowUserTypeOptions] = useState(false);
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const { setUser } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);


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

  const handleContinue = async () => {
    Keyboard.dismiss();
    setLoading(true);
    setError(null);
    try {
      const res = await customerLogin(phone);
      if (res) {
        setUser(res);
        onClose();
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'An unexpected error occurred.');
      console.log(JSON.stringify(err));
    } finally {
      setLoading(false);
    }
  };

  const handleSkip = () => {
    onClose();
  };

  const toggleUserTypeOptions = () => {
    setShowUserTypeOptions(!showUserTypeOptions);
  };

  const selectUserType = (path: string) => {
    router.push(path);
    onClose();
  };


  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
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
                onChangeText={(text) => {
                  setPhone(text);
                  setError(null);
                }}
                value={phone}
                editable={!loading}
              />
            </View>
            {error && <Text style={styles.errorText}>{error}</Text>}
            <TouchableOpacity style={[styles.continueButton, loading && styles.continueButtonDisabled]} onPress={handleContinue} disabled={loading}>
              {loading ? <ActivityIndicator color="#FFFFFF" /> : <Text style={styles.continueButtonText}>Continue</Text>}
            </TouchableOpacity>
          </View>
          <View style={styles.userTypeContainer}>
            <TouchableOpacity onPress={toggleUserTypeOptions} style={styles.userTypeIcon}>
              <FontAwesome5 name="users-cog" size={24} color={Colors.text} />
            </TouchableOpacity>
            {showUserTypeOptions && (
              <View style={styles.userTypeOptionsContainer}>
                <TouchableOpacity onPress={() => selectUserType('/deliveryPartnerLogin')} style={styles.userTypeOption}>
                  <MaterialCommunityIcons name="motorbike" size={24} color={Colors.text} />
                  <Text style={styles.userTypeOptionText}>Delivery Partner</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => selectUserType('/sellerLogin')} style={styles.userTypeOption}>
                   <MaterialCommunityIcons name="store" size={24} color={Colors.text} />
                  <Text style={styles.userTypeOptionText}>Seller</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </LinearGradient>
      </TouchableWithoutFeedback>
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
  continueButtonDisabled: {
    backgroundColor: Colors.accent,
    opacity: 0.5,
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
   errorText: {
    color: '#ff3333',
    textAlign: 'center',
    marginBottom: 10,
    fontWeight: 'bold'
  },
  userTypeContainer: {
    position: 'absolute',
    bottom: 30,
    left: 20,
  },
  userTypeIcon: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 10,
    borderRadius: 10,
  },
  userTypeOptionsContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 10,
    position: 'absolute',
    bottom: 50,
    width: 220,
  },
  userTypeOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  userTypeOptionText: {
    color: Colors.text,
    fontSize: 16,
    marginLeft: 10,
  },
});
