
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Colors from '../constants/Colors';

interface GrubygoLogoProps {
  size?: number;
  color?: string;
}

export default function GrubygoLogo({ size = 72, color = Colors.accent }: GrubygoLogoProps) {
  return (
    <View style={styles.logoContainer}>
      <Text style={[styles.sloganBig, { fontSize: size, color: color }]}>Gruby</Text>
      <Text style={[styles.sloganBig, styles.goText, { fontSize: size, color: Colors.text }]}>Go</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sloganBig: {
    textShadowColor: 'rgba(0, 0, 0, 0.7)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 3,
    fontWeight: 'bold',
  },
  goText: {
    color: Colors.text,
  },
});
