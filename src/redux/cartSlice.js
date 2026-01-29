import { createSlice } from '@reduxjs/toolkit';

const savedCart = localStorage.getItem('smartcart_items');
const initialState = savedCart ? JSON.parse(savedCart) : {
  items: [],  // {id, name, price, quantity}
  totalItems: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const product = action.payload;
      const existing = state.items.find(item => item.id === product.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...product, quantity: 1 });
      }
      state.totalItems += 1;
      state.totalPrice += product.price;
    },
    removeFromCart(state, action) {
      const id = action.payload;
      const index = state.items.findIndex(item => item.id === id);
      if (index !== -1) {
        state.totalItems -= state.items[index].quantity;
        state.totalPrice -= state.items[index].price * state.items[index].quantity;
        state.items.splice(index, 1);
      }
    },
    updateQuantity(state, action) {
      const { id, quantity } = action.payload;
      const item = state.items.find(item => item.id === id);
      if (item && quantity > 0) {
        const diff = quantity - item.quantity;
        item.quantity = quantity;
        state.totalItems += diff;
        state.totalPrice += item.price * diff;
      }
    },
    clearCart(state) {
      state.items = [];
      state.totalItems = 0;
      state.totalPrice = 0;
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
