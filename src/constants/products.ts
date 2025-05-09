// constants/products.ts
export const PRODUCTS = [
  {
    id: '1',
    name: 'Wireless Headphones',
    price: 129.99,
    image: 'https://th.bing.com/th/id/OIP.V7IGZ3EZ__peC1jLOpTrywHaE8?w=272&h=181&c=7&r=0&o=5&dpr=1.3&pid=1.7',
    description: 'High-quality wireless headphones with noise cancellation.',
    category: 'Electronics',
    subcategory: 'Audio'
  },
  {
    id: '2',
    name: 'Smart HeadPhones',
    price: 199.99,
    image: 'https://cdn.pixabay.com/photo/2020/04/19/16/33/headphones-5064411_1280.jpg',
    description: 'Track your fitness and stay connected with this smart watch.',
    category: 'Electronics',
    subcategory: 'Wearables'
  },
  {
    id: '3',
    name: 'Running Shoes',
    price: 89.99,
    image: 'https://m.media-amazon.com/images/I/61BYQOF1nOL._AC_UL480_FMwebp_QL65_.jpg',
    description: 'Comfortable running shoes with advanced cushioning.',
    category: 'Sports',
    subcategory: 'Footwear'
  },
  {
    id: '4',
    name: 'Cotton T-Shirt',
    price: 24.99,
    image: 'https://m.media-amazon.com/images/I/519cECQlGoL._AC_UL480_FMwebp_QL65_.jpg',
    description: 'Soft and comfortable 100% cotton t-shirt.',
    category: 'Clothing',
    subcategory: 'Men'
  },
  {
    id: '5',
    name: 'Air Fryer',
    price: 79.99,
    image: 'https://m.media-amazon.com/images/I/71NZiryyhbL._AC_UY327_FMwebp_QL65_.jpg',
    description: 'Oil-free cooking made easy with this air fryer.',
    category: 'Home',
    subcategory: 'Kitchen'
  },
  {
    id: '6',
    name: 'Minimalist Watch',
    price: 109.99,
    image: 'https://m.media-amazon.com/images/I/61bCDqUNmYL._AC_UL480_FMwebp_QL65_.jpg',
    description: 'Modern design watch perfect for everyday use.',
    category: 'Trending',
    subcategory: 'Accessories'
  },
  {
    id: '7',
    name: 'Smart Watch',
    price: 199.99,
    image: 'https://m.media-amazon.com/images/I/71Iit7U1S+L._AC_UY327_FMwebp_QL65_.jpg',
    description: 'Track your fitness and stay connected with this smart watch.',
    category: 'Electronics',
    subcategory: 'Wearables'
  },
];

export const CATEGORIES = [
  'Electronics',
  'Clothing',
  'Sports',
  'Home',
  'Trending'
];
export const SUBCATEGORIES = {
  Electronics: ['Audio', 'Wearables', 'Computers', 'Mobiles', 'Accessories'],
  Clothing: ['Men', 'Women', 'Kids', 'Winterwear', 'Footwear'],
  Sports: ['Footwear', 'Fitness', 'Cricket', 'Football', 'Accessories'],
  Home: ['Kitchen', 'Decor', 'Furniture', 'Cleaning'],
  Trending: ['Electronics', 'Fashion', 'Accessories', 'Deals']
};


// constants/styles.ts
import { StyleSheet } from 'react-native';
import { dynamicSize, getFontSize } from '../utils/responsive';
import { FontFamily } from '../assets/fonts';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  // Home Screen Styles
  banner: {
    height: 180,
    backgroundColor: '#ff6347',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  bannerText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
  },
  bannerSubtext: {
    fontSize: 18,
    color: 'white',
    marginTop: 5,
  },
  sectionTitle: {
    fontSize: getFontSize(20),
    marginHorizontal: dynamicSize(16),
    marginTop: dynamicSize(16),
    marginBottom: dynamicSize(10),
    color: "#2c2c2c",
    fontFamily: FontFamily.sofiaProMedium
  },
  categoriesContainer: {
    paddingLeft: dynamicSize(16),
    // marginBottom: dynamicSize(8),
  },
  categoryItem: {
    backgroundColor: '#fff',
    paddingHorizontal: dynamicSize(16),
    paddingVertical: dynamicSize(8),
    borderRadius: dynamicSize(25),
    marginRight: dynamicSize(10),
    borderWidth: dynamicSize(1.5),
    // borderColor: '#E2E4E8',
    borderColor: "#ddd"
  },
  categoryText: {
    fontSize: getFontSize(14),
    fontFamily: FontFamily.sofiaProRegular
  },
  productList: {
    paddingLeft: dynamicSize(16),
    // marginBottom: dynamicSize(16),
  },
  productCard: {
    width: 150,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    marginRight: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  productImage: {
    width: '100%',
    height: 130,
    borderRadius: 8,
    marginBottom: 10,
  },
  productName: {
    fontSize: 14,
    fontWeight: '500',
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ff6347',
    marginTop: 5,
  },

  // Shop Screen Styles
  shopList: {
    padding: 10,
  },
  productCardGrid: {
    flex: 1,
    backgroundColor: 'white',
    margin: 5,
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  productImageGrid: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 10,
  },

  // Product Details Styles
  detailImage: {
    width: '100%',
    height: 300,
  },
  detailsContainer: {
    padding: 15,
  },
  detailName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  detailPrice: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ff6347',
    marginBottom: 10,
  },
  detailCategory: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
  },
  detailDescription: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  quantityButton: {
    backgroundColor: '#f0f0f0',
    width: 35,
    height: 35,
    borderRadius: 17.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  quantity: {
    fontSize: 18,
    marginHorizontal: 15,
  },
  addToCartButton: {
    backgroundColor: '#ff6347',
    borderRadius: 25,
    padding: 15,
    alignItems: 'center',
  },
  addToCartButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },

  // Cart Screen Styles
  cartList: {
    flex: 1,
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  cartItemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  cartItemDetails: {
    flex: 1,
    marginLeft: 15,
    justifyContent: 'center',
  },
  cartItemName: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 5,
  },
  cartItemPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ff6347',
    marginBottom: 5,
  },
  cartQuantity: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  removeButton: {
    justifyContent: 'center',
  },
  removeButtonText: {
    color: '#ff6347',
  },
  cartSummary: {
    backgroundColor: 'white',
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  cartTotal: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  checkoutButton: {
    backgroundColor: '#ff6347',
    borderRadius: 25,
    padding: 15,
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  emptyCart: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyCartText: {
    fontSize: 18,
    color: '#666',
  },

  // Profile Screen Styles
  profileHeader: {
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: 'white',
  },
  profileAvatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#ff6347',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  profileAvatarText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white',
  },
  profileName: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  profileEmail: {
    fontSize: 16,
    color: '#666',
  },
  profileMenu: {
    backgroundColor: 'white',
    marginTop: 20,
    paddingHorizontal: 15,
  },
  profileMenuItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  profileMenuItemText: {
    fontSize: 16,
  },
  logoutButton: {
    borderBottomWidth: 0,
    marginTop: 20,
  },
  logoutButtonText: {
    color: '#ff6347',
    fontSize: 16,
    fontWeight: '500',
  },

  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: dynamicSize(16),
    backgroundColor: '#f2f2f2',
    borderRadius: dynamicSize(32),
    paddingHorizontal: dynamicSize(8),
    borderWidth: dynamicSize(1.5),
    borderColor: "#E2E4E8",
    marginHorizontal: dynamicSize(16),
    height: dynamicSize(48)
  },
  searchInput: {
    flex: 1,
    fontSize: getFontSize(14),
    color: '#2c2c2c',
  },
});

// constants/color.ts
export const COLORS = {
  primary: '#ff6347',    // tomato
  secondary: '#f0f0f0',  // light gray
  background: '#f8f8f8', // off-white
  text: '#333333',       // dark gray
  textLight: '#666666',  // medium gray
  white: '#ffffff',
  black: '#000000',
  border: '#dddddd',
  error: '#ff3b30',
  success: '#34c759',
};