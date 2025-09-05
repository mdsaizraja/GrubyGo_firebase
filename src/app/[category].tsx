import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import Header from '../components/Header';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '../constants/Colors';
import products from '../data/products.json';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
}

export default function CategoryDashboard() {
  const { category } = useLocalSearchParams();

  if (category === 'Services') {
    return (
      <LinearGradient
        colors={[Colors.primary, Colors.secondary]}
        style={styles.container}
      >
        <Header />
        <View style={styles.comingSoonContainer}>
          <Text style={styles.title}>{category}</Text>
          <Text style={styles.comingSoonText}>Coming Soon</Text>
        </View>
      </LinearGradient>
    );
  }

  const categoryProducts = products.filter(
    (p: Product) => p.category === category
  );

  return (
    <LinearGradient
      colors={[Colors.primary, Colors.secondary]}
      style={styles.container}
    >
      <Header />
      <View style={styles.content}>
        <Text style={styles.title}>{category} Dashboard</Text>
        <FlatList
          data={categoryProducts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.productContainer}>
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
            </View>
          )}
        />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginVertical: 20,
  },
  productContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginVertical: 5,
    marginHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productName: {
    fontSize: 16,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  comingSoonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  comingSoonText: {
    fontSize: 20,
    color: 'white',
    marginTop: 10,
  }
});
