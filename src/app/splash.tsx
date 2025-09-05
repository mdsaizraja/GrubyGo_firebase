
import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '../constants/Colors';
import GrubygoLogo from '../components/GrubygoLogo';

export default function SplashScreen() {
  const slideAnim = useRef(new Animated.Value(-500)).current;

  useEffect(() => {
    // Slide-in animation for the logo
    Animated.timing(
      slideAnim,
      {
        toValue: 0,
        duration: 300, // Fast animation
        easing: Easing.in(Easing.ease),
        useNativeDriver: true,
      }
    ).start();
  }, [slideAnim]);

  return (
    <LinearGradient
      colors={[Colors.primary, Colors.secondary]} 
      style={styles.container}
    >
      <View style={styles.sloganContainer}>
        <Text style={styles.sloganSmall}>All Go with</Text>
        <Animated.View style={[{ transform: [{ translateX: slideAnim }] }]}>
          <GrubygoLogo />
        </Animated.View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sloganContainer: {
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  sloganSmall: {
    fontSize: 22,
    color: Colors.text,
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
});
