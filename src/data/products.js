import headphonesImg from '../assets/wireless headphones.jpg';
import smartWatchImg from '../assets/smart watch.jpg';
import speakerImg from '../assets/speaker.jpg';
import bagImg from '../assets/bag.jpg';
import gamingMouseImg from '../assets/gaming-mouse.avif';
import monitorImg from '../assets/4k-monitor.jpg';
import keyboardImg from '../assets/mechanical-keyboard.jpg';
import hubImg from '../assets/usb-c-hub.webp';

const products = [
  {
    id: 1,
    name: 'Wireless Headphones',
    price: 99.99,
    image: headphonesImg,
    category: 'Audio',
    description: 'High quality wireless headphones with noise cancellation.',
  },
  {
    id: 2,
    name: 'Smart Watch',
    price: 199.99,
    image: smartWatchImg,
    category: 'Wearables',
    description: 'Feature-rich smart watch with fitness tracking.',
  },
  {
    id: 3,
    name: 'Bluetooth Speaker',
    price: 49.99,
    image: speakerImg,
    category: 'Audio',
    description: 'Portable Bluetooth speaker with rich sound.',
  },
  {
    id: 4,
    name: 'Laptop Backpack',
    price: 79.99,
    image: bagImg,
    category: 'Accessories',
    description: 'Durable backpack with laptop compartment.',
  },
  {
    id: 5,
    name: 'Gaming Mouse',
    price: 59.99,
    image: gamingMouseImg,
    category: 'PC Gaming',
    description: 'Ergonomic gaming mouse with customizable DPI.',
  },
  {
    id: 6,
    name: '4K Monitor',
    price: 299.99,
    image: monitorImg,
    category: 'Electronics',
    description: '27-inch 4K UHD monitor with ultra-thin bezels.',
  },
  {
    id: 7,
    name: 'Mechanical Keyboard',
    price: 89.99,
    image: keyboardImg,
    category: 'PC Gaming',
    description: 'RGB mechanical keyboard with blue switches.',
  },
  {
    id: 8,
    name: 'USB-C Hub',
    price: 39.99,
    image: hubImg,
    category: 'Accessories',
    description: '7-in-1 USB-C hub with HDMI, SD, and USB ports.',
  },
];

export default products;