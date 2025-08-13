import React, { createContext, useContext, useReducer } from 'react';

const AppContext = createContext();

const initialState = {
  user: null,
  location: null,
  restaurants: [],
  categories: [],
  orders: [],
  notifications: [],
  settings: {
    notifications: true,
    darkMode: false,
    language: 'en',
  },
};

function appReducer(state, action) {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'SET_LOCATION':
      return { ...state, location: action.payload };
    case 'SET_RESTAURANTS':
      return { ...state, restaurants: action.payload };
    case 'SET_CATEGORIES':
      return { ...state, categories: action.payload };
    case 'ADD_ORDER':
      return { ...state, orders: [action.payload, ...state.orders] };
    case 'ADD_NOTIFICATION':
      return { ...state, notifications: [action.payload, ...state.notifications] };
    case 'UPDATE_SETTINGS':
      return { ...state, settings: { ...state.settings, ...action.payload } };
    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const setUser = (user) => dispatch({ type: 'SET_USER', payload: user });
  const setLocation = (location) => dispatch({ type: 'SET_LOCATION', payload: location });
  const setRestaurants = (restaurants) => dispatch({ type: 'SET_RESTAURANTS', payload: restaurants });
  const setCategories = (categories) => dispatch({ type: 'SET_CATEGORIES', payload: categories });
  const addOrder = (order) => dispatch({ type: 'ADD_ORDER', payload: order });
  const addNotification = (notification) => dispatch({ type: 'ADD_NOTIFICATION', payload: notification });
  const updateSettings = (settings) => dispatch({ type: 'UPDATE_SETTINGS', payload: settings });

  const value = {
    ...state,
    setUser,
    setLocation,
    setRestaurants,
    setCategories,
    addOrder,
    addNotification,
    updateSettings,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
