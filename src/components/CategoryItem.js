import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useTheme } from '../context/ThemeContext';

export default function CategoryItem({ category, isSelected, onPress }) {
  const { theme } = useTheme();

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: isSelected ? theme.colors.primary : theme.colors.surface,
          borderColor: isSelected ? theme.colors.primary : theme.colors.border,
        }
      ]}
      onPress={onPress}
    >
      <View style={[
        styles.iconContainer,
        { backgroundColor: isSelected ? 'rgba(255, 255, 255, 0.2)' : category.color + '20' }
      ]}>
        <Text style={styles.icon}>{category.icon}</Text>
      </View>
      <Text style={[
        styles.name,
        { color: isSelected ? '#FFFFFF' : theme.colors.text }
      ]}>
        {category.name}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginRight: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 16,
    borderWidth: 1,
    minWidth: 80,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  icon: {
    fontSize: 24,
  },
  name: {
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
});
