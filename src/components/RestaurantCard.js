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
import { useTheme } from '../context/ThemeContext';

const { width } = Dimensions.get('window');

export default function RestaurantCard({ restaurant, onPress }) {
  const { theme } = useTheme();

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={[styles.card, { backgroundColor: theme.colors.surface }]}>
        {restaurant.isPromoted && (
          <View style={styles.promotedBadge}>
            <Text style={styles.promotedText}>PROMOTED</Text>
          </View>
        )}
        
        <View style={styles.imageContainer}>
          <Text style={styles.restaurantImage}>{restaurant.image}</Text>
        </View>

        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={[styles.name, { color: theme.colors.text }]} numberOfLines={1}>
              {restaurant.name}
            </Text>
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={16} color="#F39C12" />
              <Text style={[styles.rating, { color: theme.colors.text }]}>
                {restaurant.rating}
              </Text>
            </View>
          </View>

          <View style={styles.tagsContainer}>
            {restaurant.tags?.map((tag, index) => (
              <View key={index} style={styles.tag}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>

          <View style={styles.footer}>
            <View style={styles.deliveryInfo}>
              <Ionicons name="time-outline" size={14} color={theme.colors.textSecondary} />
              <Text style={[styles.deliveryTime, { color: theme.colors.textSecondary }]}>
                {restaurant.deliveryTime} min
              </Text>
            </View>
            <View style={styles.deliveryInfo}>
              <Ionicons name="bicycle-outline" size={14} color={theme.colors.textSecondary} />
              <Text style={[styles.deliveryFee, { color: theme.colors.textSecondary }]}>
                ${restaurant.deliveryFee}
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
    marginHorizontal: 20,
    marginBottom: 16,
  },
  card: {
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  promotedBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#E74C3C',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    zIndex: 1,
  },
  promotedText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  imageContainer: {
    height: 160,
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E1E8ED',
  },
  restaurantImage: {
    fontSize: 60,
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    marginRight: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 4,
  },
  tagsContainer: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  tag: {
    backgroundColor: '#E8F4FD',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
  },
  tagText: {
    color: '#3498DB',
    fontSize: 12,
    fontWeight: '500',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  deliveryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deliveryTime: {
    fontSize: 14,
    marginLeft: 4,
  },
  deliveryFee: {
    fontSize: 14,
    marginLeft: 4,
  },
});
