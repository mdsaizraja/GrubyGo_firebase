
import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import GrubygoLogo from './GrubygoLogo';
import { addLogBoxLog } from 'react-native-reanimated/lib/typescript/logger';

const Header = () => {
  return (
    <View style={styles.container}>
      <View style={styles.allContent}>
      <View style={styles.topRow}>
        <GrubygoLogo size={24} color={Colors.primary} />
        <Ionicons name="person-circle-outline" size={30} color={Colors.primary} />
      </View>
      <Text style={styles.deliveryText}>Delivery in 20 mins</Text>
      <Text style={styles.addressText}>Current Location Address</Text>
      <View style={styles.searchBar}>
        <Ionicons name="search-outline" size={24} color={Colors.primary} />
        <TextInput style={styles.searchInput} placeholder="Search for food" />
      </View>
      </View>
          </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  deliveryText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  addressText: {
    fontSize: 16,
    color: 'gray',
    marginTop: 5,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
  },
  searchInput: {
    marginLeft: 10,
    fontSize: 16,
  },
  allContent:{
    paddingTop:20
  }
});

export default Header;
