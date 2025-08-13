import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import RestaurantCard from '../components/RestaurantCard';
import FoodCard from '../components/FoodCard';

// Mock data
const mockSearchData = {
  recentSearches: ['Pizza', 'Burger', 'Sushi', 'Pasta'],
  trendingSearches: ['Thai Food', 'Healthy Bowls', 'Ice Cream', 'Coffee'],
  restaurants: [
    {
      id: 1,
      name: 'Pizza Palace',
      image: '🍕',
      rating: 4.5,
      deliveryTime: '25-30',
      deliveryFee: 2.99,
      category: 'Pizza',
    },
    {
      id: 2,
      name: 'Burger Barn',
      image: '🍔',
      rating: 4.3,
      deliveryTime: '20-25',
      deliveryFee: 1.99,
      category: 'Burger',
    },
  ],
  foods: [
    {
      id: 1,
      name: 'Margherita Pizza',
      restaurant: 'Pizza Palace',
      price: 12.99,
      image: '🍕',
      rating: 4.5,
    },
    {
      id: 2,
      name: 'Classic Burger',
      restaurant: 'Burger Barn',
      price: 8.99,
      image: '🍔',
      rating: 4.3,
    },
  ],
};

export default function SearchScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [activeTab, setActiveTab] = useState('restaurants'); // 'restaurants' or 'foods'
  const [isSearching, setIsSearching] = useState(false);
  
  const { theme } = useTheme();

  useEffect(() => {
    if (searchQuery.length > 2) {
      setIsSearching(true);
      // Simulate search delay
      const searchTimeout = setTimeout(() => {
        setSearchResults({
          restaurants: mockSearchData.restaurants.filter(restaurant =>
            restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            restaurant.category.toLowerCase().includes(searchQuery.toLowerCase())
          ),
          foods: mockSearchData.foods.filter(food =>
            food.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            food.restaurant.toLowerCase().includes(searchQuery.toLowerCase())
          ),
        });
        setIsSearching(false);
      }, 500);

      return () => clearTimeout(searchTimeout);
    } else {
      setSearchResults(null);
      setIsSearching(false);
    }
  }, [searchQuery]);

  const handleRecentSearch = (query) => {
    setSearchQuery(query);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults(null);
  };

  const renderSearchHeader = () => (
    <View style={styles.header}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <Ionicons name="arrow-back" size={24} color={theme.colors.text} />
      </TouchableOpacity>

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color={theme.colors.textSecondary} style={styles.searchIcon} />
        <TextInput
          style={[styles.searchInput, { color: theme.colors.text }]}
          placeholder="Search restaurants, food..."
          placeholderTextColor={theme.colors.textSecondary}
          value={searchQuery}
          onChangeText={setSearchQuery}
          autoFocus
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
            <Ionicons name="close-circle" size={20} color={theme.colors.textSecondary} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  const renderSuggestions = () => (
    <ScrollView style={styles.suggestionsContainer}>
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          Recent Searches
        </Text>
        <View style={styles.tagsContainer}>
          {mockSearchData.recentSearches.map((search, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.tag, { borderColor: theme.colors.border }]}
              onPress={() => handleRecentSearch(search)}
            >
              <Ionicons name="time-outline" size={16} color={theme.colors.textSecondary} />
              <Text style={[styles.tagText, { color: theme.colors.text }]}>{search}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          Trending Searches
        </Text>
        <View style={styles.tagsContainer}>
          {mockSearchData.trendingSearches.map((search, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.tag, { borderColor: theme.colors.border }]}
              onPress={() => handleRecentSearch(search)}
            >
              <Ionicons name="trending-up" size={16} color={theme.colors.primary} />
              <Text style={[styles.tagText, { color: theme.colors.text }]}>{search}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );

  const renderSearchTabs = () => (
    <View style={styles.tabsContainer}>
      <TouchableOpacity
        style={[
          styles.tab,
          activeTab === 'restaurants' && { borderBottomColor: theme.colors.primary }
        ]}
        onPress={() => setActiveTab('restaurants')}
      >
        <Text style={[
          styles.tabText,
          { color: activeTab === 'restaurants' ? theme.colors.primary : theme.colors.textSecondary }
        ]}>
          Restaurants ({searchResults?.restaurants?.length || 0})
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={[
          styles.tab,
          activeTab === 'foods' && { borderBottomColor: theme.colors.primary }
        ]}
        onPress={() => setActiveTab('foods')}
      >
        <Text style={[
          styles.tabText,
          { color: activeTab === 'foods' ? theme.colors.primary : theme.colors.textSecondary }
        ]}>
          Foods ({searchResults?.foods?.length || 0})
        </Text>
      </TouchableOpacity>
    </View>
  );

  const renderSearchResults = () => {
    if (isSearching) {
      return (
        <View style={styles.loadingContainer}>
          <Text style={[styles.loadingText, { color: theme.colors.textSecondary }]}>
            Searching...
          </Text>
        </View>
      );
    }

    if (!searchResults) {
      return null;
    }

    const hasResults = (searchResults.restaurants?.length > 0) || (searchResults.foods?.length > 0);

    if (!hasResults) {
      return (
        <View style={styles.noResultsContainer}>
          <Text style={styles.noResultsEmoji}>🔍</Text>
          <Text style={[styles.noResultsTitle, { color: theme.colors.text }]}>
            No Results Found
          </Text>
          <Text style={[styles.noResultsText, { color: theme.colors.textSecondary }]}>
            Try searching for something else
          </Text>
        </View>
      );
    }

    return (
      <View style={styles.resultsContainer}>
        {renderSearchTabs()}
        
        <ScrollView showsVerticalScrollIndicator={false}>
          {activeTab === 'restaurants' && (
            <FlatList
              data={searchResults.restaurants}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <RestaurantCard
                  restaurant={item}
                  onPress={() => navigation.navigate('Restaurant', { restaurant: item })}
                />
              )}
              scrollEnabled={false}
            />
          )}
          
          {activeTab === 'foods' && (
            <FlatList
              data={searchResults.foods}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <View style={styles.foodCardContainer}>
                  <FoodCard
                    food={item}
                    onPress={() => navigation.navigate('FoodDetail', { food: item })}
                  />
                </View>
              )}
              numColumns={2}
              scrollEnabled={false}
              columnWrapperStyle={styles.foodRow}
            />
          )}
        </ScrollView>
      </View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {renderSearchHeader()}
      {searchQuery.length <= 2 ? renderSuggestions() : renderSearchResults()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  backButton: {
    marginRight: 16,
  },
  searchContainer: {
    flex: 1,
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
  clearButton: {
    padding: 4,
  },
  suggestionsContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    fontSize: 14,
    marginLeft: 6,
  },
  tabsContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E1E8ED',
    paddingHorizontal: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '600',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  noResultsEmoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  noResultsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  noResultsText: {
    fontSize: 16,
    textAlign: 'center',
  },
  resultsContainer: {
    flex: 1,
  },
  foodCardContainer: {
    flex: 1,
    paddingHorizontal: 8,
  },
  foodRow: {
    justifyContent: 'space-between',
    paddingHorizontal: 12,
  },
});
