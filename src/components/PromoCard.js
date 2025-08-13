import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function PromoCard({ promo }) {
  return (
    <TouchableOpacity style={styles.container}>
      <LinearGradient
        colors={promo.backgroundColor}
        style={styles.card}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.content}>
          <View style={styles.textContainer}>
            <Text style={styles.title}>{promo.title}</Text>
            <Text style={styles.subtitle}>{promo.subtitle}</Text>
            <Text style={styles.description}>{promo.description}</Text>
            
            <TouchableOpacity style={styles.claimButton}>
              <Text style={styles.claimButtonText}>Claim Now</Text>
              <Ionicons name="arrow-forward" size={16} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.imageContainer}>
            <Text style={styles.promoImage}>{promo.image}</Text>
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginRight: 16,
    width: width * 0.8,
  },
  card: {
    borderRadius: 16,
    overflow: 'hidden',
    height: 140,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    padding: 20,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 8,
  },
  description: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 12,
  },
  claimButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  claimButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
    marginRight: 4,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 16,
  },
  promoImage: {
    fontSize: 50,
  },
});
