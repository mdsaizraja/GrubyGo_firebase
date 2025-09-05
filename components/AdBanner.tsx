import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';

const ads = [
  { id: '1', text: 'Ad 1: Special Offer!' },
  { id: '2', text: 'Ad 2: New Arrivals!' },
  { id: '3', text: 'Ad 3: Limited Time Deal!' },
];

const { width } = Dimensions.get('window');
const adBannerWidth = width - 20;

const AdBanner = () => {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
      >
        {ads.map(ad => (
          <View key={ad.id} style={styles.adView}>
            <Text style={styles.text}>{ad.text}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 80,
    borderRadius: 10,
    overflow: 'hidden',
    marginHorizontal: 10,
    marginTop: 20,
    marginBottom: 10,
  },
  adView: {
    width: adBannerWidth,
    height: 80,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AdBanner;