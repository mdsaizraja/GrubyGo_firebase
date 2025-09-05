import React from 'react';
import { Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import { Link } from 'expo-router';

interface CategoryCardProps {
  category: string;
  icon: keyof typeof Ionicons.glyphMap;
}

const { width } = Dimensions.get('window');
const cardWidth = (width - 60) / 2;

const CategoryCard: React.FC<CategoryCardProps> = ({ category, icon }) => {
  return (
    <Link href={`/${category}`} asChild>
      <TouchableOpacity style={styles.card}>
        <Ionicons name={icon} size={cardWidth / 3} color={Colors.primary} />
        <Text style={styles.cardText}>{category}</Text>
      </TouchableOpacity>
    </Link>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    margin: 10,
    width: cardWidth,
    height: cardWidth,
  },
  cardText: {
    marginTop: 10,
    fontSize: cardWidth / 9,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default CategoryCard;
