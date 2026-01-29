import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import wishlistReducer from './wishlistSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer,
  },
});

// Subscribe to store changes to persist data to localStorage
store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem('smartcart_items', JSON.stringify(state.cart));
  localStorage.setItem('smartcart_wishlist', JSON.stringify(state.wishlist.items));
});
