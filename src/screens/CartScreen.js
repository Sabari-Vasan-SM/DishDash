import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';

export default function CartScreen({ navigation }) {
  const { theme } = useTheme();
  const { items, total, getItemCount } = useCart();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.title, { color: theme.colors.text }]}>
        Shopping Cart
      </Text>
      <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
        {getItemCount()} items - ${total.toFixed(2)}
      </Text>
      <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
        Cart functionality coming soon...
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 8,
  },
});
