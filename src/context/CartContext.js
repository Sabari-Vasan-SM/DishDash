import React, { createContext, useContext, useReducer } from 'react';

const CartContext = createContext();

const initialState = {
  items: [],
  total: 0,
  deliveryFee: 2.99,
  tax: 0,
  discount: 0,
  restaurant: null,
};

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM':
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        const updatedItems = state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        return {
          ...state,
          items: updatedItems,
          total: calculateTotal(updatedItems),
        };
      } else {
        const newItems = [...state.items, { ...action.payload, quantity: 1 }];
        return {
          ...state,
          items: newItems,
          total: calculateTotal(newItems),
          restaurant: action.payload.restaurant,
        };
      }

    case 'REMOVE_ITEM':
      const filteredItems = state.items.filter(item => item.id !== action.payload);
      return {
        ...state,
        items: filteredItems,
        total: calculateTotal(filteredItems),
        restaurant: filteredItems.length === 0 ? null : state.restaurant,
      };

    case 'UPDATE_QUANTITY':
      const updatedItems = state.items.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      ).filter(item => item.quantity > 0);
      
      return {
        ...state,
        items: updatedItems,
        total: calculateTotal(updatedItems),
        restaurant: updatedItems.length === 0 ? null : state.restaurant,
      };

    case 'CLEAR_CART':
      return {
        ...initialState,
      };

    case 'APPLY_DISCOUNT':
      return {
        ...state,
        discount: action.payload,
      };

    default:
      return state;
  }
}

function calculateTotal(items) {
  return items.reduce((total, item) => total + (item.price * item.quantity), 0);
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addItem = (item) => dispatch({ type: 'ADD_ITEM', payload: item });
  const removeItem = (itemId) => dispatch({ type: 'REMOVE_ITEM', payload: itemId });
  const updateQuantity = (itemId, quantity) => 
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id: itemId, quantity } });
  const clearCart = () => dispatch({ type: 'CLEAR_CART' });
  const applyDiscount = (discount) => dispatch({ type: 'APPLY_DISCOUNT', payload: discount });

  const getItemCount = () => state.items.reduce((count, item) => count + item.quantity, 0);
  const getFinalTotal = () => {
    const subtotal = state.total;
    const tax = subtotal * 0.08; // 8% tax
    return subtotal + state.deliveryFee + tax - state.discount;
  };

  const value = {
    ...state,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    applyDiscount,
    getItemCount,
    getFinalTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
