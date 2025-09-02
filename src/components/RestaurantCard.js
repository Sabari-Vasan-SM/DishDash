/**
 * RestaurantCard Component
 * 
 * A reusable card component that displays restaurant information including:
 * - Restaurant image/icon
 * - Name and rating
 * - Tags (e.g., "Fast", "Popular")
 * - Delivery time and fee
 * - Promoted badge (if applicable)
 * 
 * Props:
 * - restaurant: Object containing restaurant data (name, rating, deliveryTime, etc.)
 * - onPress: Function called when the card is pressed
 */

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

// Get screen width for responsive design
const { width } = Dimensions.get('window');

export default function RestaurantCard({ restaurant, onPress }) {
  // Access theme colors and styling from ThemeContext
  const { theme } = useTheme();

  return (
    // Main touchable container that handles press events
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {/* Card wrapper with theme-based background color and shadow */}
      <View style={[styles.card, { backgroundColor: theme.colors.surface }]}>
        
        {/* Conditional "PROMOTED" badge overlay */}
        {restaurant.isPromoted && (
          <View style={styles.promotedBadge}>
            <Text style={styles.promotedText}>PROMOTED</Text>
          </View>
        )}
        
        {/* Restaurant image/icon container */}
        <View style={styles.imageContainer}>
          {/* Using emoji as placeholder for restaurant image */}
          <Text style={styles.restaurantImage}>{restaurant.image}</Text>
        </View>

        {/* Main content area with restaurant details */}
        <View style={styles.content}>
          
          {/* Header section: Restaurant name and rating */}
          <View style={styles.header}>
            <Text style={[styles.name, { color: theme.colors.text }]} numberOfLines={1}>
              {restaurant.name}
            </Text>
            {/* Rating display with star icon */}
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={16} color="#F39C12" />
              <Text style={[styles.rating, { color: theme.colors.text }]}>
                {restaurant.rating}
              </Text>
            </View>
          </View>

          {/* Tags section: Display restaurant tags like "Fast", "Popular" */}
          <View style={styles.tagsContainer}>
            {restaurant.tags?.map((tag, index) => (
              <View key={index} style={styles.tag}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>

          {/* Footer section: Delivery time and fee information */}
          <View style={styles.footer}>
            {/* Delivery time with clock icon */}
            <View style={styles.deliveryInfo}>
              <Ionicons name="time-outline" size={14} color={theme.colors.textSecondary} />
              <Text style={[styles.deliveryTime, { color: theme.colors.textSecondary }]}>
                {restaurant.deliveryTime} min
              </Text>
            </View>
            {/* Delivery fee with bicycle icon */}
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

/**
 * StyleSheet for RestaurantCard Component
 * 
 * Defines all styling for the restaurant card including:
 * - Layout and spacing
 * - Colors and typography
 * - Shadow effects for card elevation
 * - Responsive design elements
 */
const styles = StyleSheet.create({
  // Main container with horizontal margins
  container: {
    marginHorizontal: 20,
    marginBottom: 16,
  },
  
  // Card wrapper with rounded corners and shadow
  card: {
    borderRadius: 16,
    overflow: 'hidden', // Ensures content doesn't overflow rounded corners
    elevation: 4, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  
  // Promoted badge positioned absolutely in top-right corner
  promotedBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#E74C3C',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    zIndex: 1, // Ensures badge appears above other content
  },
  
  // Promoted badge text styling
  promotedText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  
  // Container for restaurant image/icon
  imageContainer: {
    height: 160,
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E1E8ED',
  },
  
  // Restaurant image/emoji styling
  restaurantImage: {
    fontSize: 60,
  },
  
  // Main content padding
  content: {
    padding: 16,
  },
  
  // Header row with name and rating
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  
  // Restaurant name styling
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1, // Takes remaining space
    marginRight: 8,
  },
  
  // Rating container with star icon
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  // Rating text styling
  rating: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 4,
  },
  
  // Container for tag chips
  tagsContainer: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  
  // Individual tag styling
  tag: {
    backgroundColor: '#E8F4FD',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
  },
  
  // Tag text styling
  tagText: {
    color: '#3498DB',
    fontSize: 12,
    fontWeight: '500',
  },
  
  // Footer row with delivery info
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  
  // Individual delivery info item (time/fee)
  deliveryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  // Delivery time text styling
  deliveryTime: {
    fontSize: 14,
    marginLeft: 4,
  },
  
  // Delivery fee text styling
  deliveryFee: {
    fontSize: 14,
    marginLeft: 4,
  },
});
