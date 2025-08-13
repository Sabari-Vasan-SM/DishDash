import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

const { width } = Dimensions.get('window');

export default function FoodCard({ food, onPress }) {
  const { theme } = useTheme();

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={[styles.card, { backgroundColor: theme.colors.surface }]}>
        {food.isPopular && (
          <View style={styles.popularBadge}>
            <Ionicons name="flame" size={12} color="#FFFFFF" />
            <Text style={styles.popularText}>Popular</Text>
          </View>
        )}
        
        <View style={styles.imageContainer}>
          <Text style={styles.foodImage}>{food.image}</Text>
        </View>

        <View style={styles.content}>
          <Text style={[styles.name, { color: theme.colors.text }]} numberOfLines={1}>
            {food.name}
          </Text>
          <Text style={[styles.restaurant, { color: theme.colors.textSecondary }]} numberOfLines={1}>
            {food.restaurant}
          </Text>
          
          <View style={styles.footer}>
            <Text style={[styles.price, { color: theme.colors.primary }]}>
              ${food.price}
            </Text>
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={12} color="#F39C12" />
              <Text style={[styles.rating, { color: theme.colors.textSecondary }]}>
                {food.rating}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginRight: 16,
    width: width * 0.4,
  },
  card: {
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  popularBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#E74C3C',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 10,
    zIndex: 1,
  },
  popularText: {
    color: '#FFFFFF',
    fontSize: 8,
    fontWeight: 'bold',
    marginLeft: 2,
  },
  imageContainer: {
    height: 100,
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  foodImage: {
    fontSize: 40,
  },
  content: {
    padding: 12,
  },
  name: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  restaurant: {
    fontSize: 12,
    marginBottom: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 12,
    marginLeft: 2,
  },
});
