import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

// Subscribe to store changes to persist cart to localStorage
store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem('smartcart_items', JSON.stringify(state.cart));
});
