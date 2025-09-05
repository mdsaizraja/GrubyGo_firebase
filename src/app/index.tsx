import { ScrollView, StyleSheet, View } from 'react-native';
import Header from '../components/Header';
import Colors from '../constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';
import CategoryCard from '../components/CategoryCard';
import AdBanner from '../components/AdBanner';

const categories = [
  { name: 'Grocery', icon: 'cart-outline' },
  { name: 'Food', icon: 'restaurant-outline' },
  { name: 'Pharmacy', icon: 'medkit-outline' },
  { name: 'Print', icon: 'print-outline' },
  { name: 'Services', icon: 'build-outline' },
  { name: 'Tobacco', icon: 'flame-outline' },
];

export default function Index() {
  return (
    <LinearGradient
      colors={[Colors.primary, Colors.secondary]}
      style={styles.container}
    >
      <Header />
      <ScrollView showsVerticalScrollIndicator={false}>
        <AdBanner />
        <View style={styles.listContainer}>
          {categories.map((item) => (
            <CategoryCard key={item.name} category={item.name} icon={item.icon as any} />
          ))}
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    paddingHorizontal: 5,
  },
});