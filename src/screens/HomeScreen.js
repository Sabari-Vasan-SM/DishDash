import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  FlatList,
  Image,
  Dimensions,
  RefreshControl,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

// Import components
import RestaurantCard from '../components/RestaurantCard';
import CategoryItem from '../components/CategoryItem';
import FoodCard from '../components/FoodCard';
import PromoCard from '../components/PromoCard';

const { width } = Dimensions.get('window');

// Mock data
const mockCategories = [
  { id: 1, name: 'Pizza', icon: '🍕', color: '#E74C3C' },
  { id: 2, name: 'Burger', icon: '🍔', color: '#F39C12' },
  { id: 3, name: 'Sushi', icon: '🍣', color: '#3498DB' },
  { id: 4, name: 'Italian', icon: '🍝', color: '#27AE60' },
  { id: 5, name: 'Chinese', icon: '🥡', color: '#9B59B6' },
  { id: 6, name: 'Dessert', icon: '🍰', color: '#E91E63' },
];

const mockRestaurants = [
  {
    id: 1,
    name: 'Pizza Palace',
    image: '🍕',
    rating: 4.5,
    deliveryTime: '25-30',
    deliveryFee: 2.99,
    category: 'Pizza',
    isPromoted: true,
    tags: ['Fast', 'Popular'],
  },
  {
    id: 2,
    name: 'Burger Barn',
    image: '🍔',
    rating: 4.3,
    deliveryTime: '20-25',
    deliveryFee: 1.99,
    category: 'Burger',
    tags: ['Healthy', 'Quick'],
  },
  {
    id: 3,
    name: 'Sushi Zen',
    image: '🍣',
    rating: 4.7,
    deliveryTime: '35-40',
    deliveryFee: 3.99,
    category: 'Sushi',
    isPromoted: true,
    tags: ['Premium', 'Fresh'],
  },
  {
    id: 4,
    name: 'Pasta Point',
    image: '🍝',
    rating: 4.4,
    deliveryTime: '30-35',
    deliveryFee: 2.49,
    category: 'Italian',
    tags: ['Authentic', 'Family'],
  },
];

const mockPromotions = [
  {
    id: 1,
    title: '50% OFF',
    subtitle: 'On your first order',
    description: 'Use code WELCOME50',
    backgroundColor: ['#FF6B35', '#F7931E'],
    image: '🎉',
  },
  {
    id: 2,
    title: 'Free Delivery',
    subtitle: 'Orders above $25',
    description: 'No minimum order required',
    backgroundColor: ['#3498DB', '#2980B9'],
    image: '🚚',
  },
];

const mockPopularFoods = [
  {
    id: 1,
    name: 'Margherita Pizza',
    restaurant: 'Pizza Palace',
    price: 12.99,
    image: '🍕',
    rating: 4.5,
    isPopular: true,
  },
  {
    id: 2,
    name: 'Classic Burger',
    restaurant: 'Burger Barn',
    price: 8.99,
    image: '🍔',
    rating: 4.3,
    isPopular: true,
  },
  {
    id: 3,
    name: 'Salmon Roll',
    restaurant: 'Sushi Zen',
    price: 15.99,
    image: '🍣',
    rating: 4.7,
    isPopular: true,
  },
];

export default function HomeScreen({ navigation }) {
  const [refreshing, setRefreshing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  const { theme } = useTheme();
  const { user } = useAuth();
  const { getItemCount } = useCart();

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const filteredRestaurants = selectedCategory
    ? mockRestaurants.filter(restaurant => restaurant.category === selectedCategory)
    : mockRestaurants;

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.headerTop}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Ionicons name="menu" size={24} color={theme.colors.text} />
        </TouchableOpacity>
        
        <View style={styles.locationContainer}>
          <Ionicons name="location-outline" size={16} color={theme.colors.primary} />
          <Text style={[styles.locationText, { color: theme.colors.text }]}>
            Downtown, NY
          </Text>
          <Ionicons name="chevron-down" size={16} color={theme.colors.textSecondary} />
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate('Cart')}
          style={styles.cartButton}
        >
          <Ionicons name="bag-outline" size={24} color={theme.colors.text} />
          {getItemCount() > 0 && (
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>{getItemCount()}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <Text style={[styles.greeting, { color: theme.colors.text }]}>
        Hello {user?.name || 'User'}! 👋
      </Text>
      <Text style={[styles.subGreeting, { color: theme.colors.textSecondary }]}>
        What would you like to eat today?
      </Text>

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color={theme.colors.textSecondary} style={styles.searchIcon} />
        <TextInput
          style={[styles.searchInput, { color: theme.colors.text }]}
          placeholder="Search restaurants, food..."
          placeholderTextColor={theme.colors.textSecondary}
          value={searchQuery}
          onChangeText={setSearchQuery}
          onFocus={() => navigation.navigate('Search')}
        />
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="options-outline" size={20} color={theme.colors.primary} />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderPromotions = () => (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
        Special Offers
      </Text>
      <FlatList
        data={mockPromotions}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <PromoCard promo={item} />}
        contentContainerStyle={styles.horizontalList}
      />
    </View>
  );

  const renderCategories = () => (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          Categories
        </Text>
        <TouchableOpacity>
          <Text style={[styles.seeAllText, { color: theme.colors.primary }]}>
            See All
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={mockCategories}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <CategoryItem
            category={item}
            isSelected={selectedCategory === item.name}
            onPress={() => setSelectedCategory(
              selectedCategory === item.name ? null : item.name
            )}
          />
        )}
        contentContainerStyle={styles.horizontalList}
      />
    </View>
  );

  const renderPopularFoods = () => (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          Popular Right Now
        </Text>
        <TouchableOpacity>
          <Text style={[styles.seeAllText, { color: theme.colors.primary }]}>
            See All
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={mockPopularFoods}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <FoodCard
            food={item}
            onPress={() => navigation.navigate('FoodDetail', { food: item })}
          />
        )}
        contentContainerStyle={styles.horizontalList}
      />
    </View>
  );

  const renderRestaurants = () => (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          {selectedCategory ? `${selectedCategory} Restaurants` : 'Recommended'}
        </Text>
        <TouchableOpacity>
          <Text style={[styles.seeAllText, { color: theme.colors.primary }]}>
            See All
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={filteredRestaurants}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <RestaurantCard
            restaurant={item}
            onPress={() => navigation.navigate('Restaurant', { restaurant: item })}
          />
        )}
        scrollEnabled={false}
      />
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {renderHeader()}
        {renderPromotions()}
        {renderCategories()}
        {renderPopularFoods()}
        {renderRestaurants()}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  locationText: {
    fontSize: 16,
    fontWeight: '600',
    marginHorizontal: 4,
  },
  cartButton: {
    position: 'relative',
  },
  cartBadge: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#E74C3C',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subGreeting: {
    fontSize: 16,
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 50,
    borderWidth: 1,
    borderColor: '#E1E8ED',
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  filterButton: {
    padding: 4,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  seeAllText: {
    fontSize: 14,
    fontWeight: '600',
  },
  horizontalList: {
    paddingHorizontal: 20,
  },
});
