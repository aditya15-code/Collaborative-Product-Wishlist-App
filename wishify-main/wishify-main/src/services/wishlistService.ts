
import { User } from "../contexts/AuthContext";
import { toast } from 'sonner';

export interface Product {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
  createdBy: User;
  createdAt: string;
}

export interface Wishlist {
  id: string;
  name: string;
  description: string;
  createdBy: User;
  createdAt: string;
  collaborators: User[];
  products: Product[];
}

// In-memory storage for wishlists
let wishlists: Wishlist[] = [];

// Generate some mock data
const generateMockWishlists = (currentUser: User) => {
  if (wishlists.length > 0) return; // Only generate once
  
  const mockUser1 = { id: '2', name: 'Jane Smith', email: 'jane@example.com' };
  const mockUser2 = { id: '3', name: 'Sam Wilson', email: 'sam@example.com' };
  
  wishlists = [
    {
      id: '1',
      name: 'Birthday Wishlist',
      description: 'Things I would love to get for my birthday',
      createdBy: currentUser,
      createdAt: new Date().toISOString(),
      collaborators: [mockUser1, mockUser2],
      products: [
        {
          id: '1',
          name: 'Wireless Headphones',
          imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80',
          price: 129.99,
          createdBy: currentUser,
          createdAt: new Date().toISOString(),
        },
        {
          id: '2',
          name: 'Smart Watch',
          imageUrl: 'https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?w=500&q=80',
          price: 249.99,
          createdBy: mockUser1,
          createdAt: new Date().toISOString(),
        }
      ]
    },
    {
      id: '2',
      name: 'Home Decor Ideas',
      description: 'Things to make my new apartment feel like home',
      createdBy: currentUser,
      createdAt: new Date().toISOString(),
      collaborators: [mockUser2],
      products: [
        {
          id: '3',
          name: 'Plant Stand',
          imageUrl: 'https://images.unsplash.com/photo-1602730331172-1cf9e6451b3c?w=500&q=80',
          price: 49.99,
          createdBy: currentUser,
          createdAt: new Date().toISOString(),
        },
        {
          id: '4',
          name: 'Throw Pillows (Set of 2)',
          imageUrl: 'https://images.unsplash.com/photo-1565697510270-27a8f531c67c?w=500&q=80',
          price: 34.99,
          createdBy: mockUser2,
          createdAt: new Date().toISOString(),
        }
      ]
    }
  ];
};

// Get all wishlists for a user
export const getUserWishlists = async (user: User): Promise<Wishlist[]> => {
  // Generate mock data if empty
  generateMockWishlists(user);
  
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Return wishlists created by user or where user is a collaborator
  return wishlists.filter(
    wishlist => wishlist.createdBy.id === user.id || 
    wishlist.collaborators.some(collaborator => collaborator.id === user.id)
  );
};

// Get a single wishlist by ID
export const getWishlistById = async (wishlistId: string): Promise<Wishlist | null> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const wishlist = wishlists.find(w => w.id === wishlistId);
  return wishlist || null;
};

// Create a new wishlist
export const createWishlist = async (
  name: string, 
  description: string, 
  currentUser: User
): Promise<Wishlist> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const newWishlist: Wishlist = {
    id: Date.now().toString(),
    name,
    description,
    createdBy: currentUser,
    createdAt: new Date().toISOString(),
    collaborators: [],
    products: []
  };
  
  wishlists.push(newWishlist);
  toast.success('Wishlist created successfully');
  return newWishlist;
};

// Add a product to a wishlist
export const addProductToWishlist = async (
  wishlistId: string,
  productData: { name: string; imageUrl: string; price: number },
  currentUser: User
): Promise<Product> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const wishlist = wishlists.find(w => w.id === wishlistId);
  if (!wishlist) {
    toast.error('Wishlist not found');
    throw new Error('Wishlist not found');
  }
  
  const newProduct: Product = {
    id: Date.now().toString(),
    ...productData,
    createdBy: currentUser,
    createdAt: new Date().toISOString()
  };
  
  wishlist.products.push(newProduct);
  toast.success('Product added successfully');
  return newProduct;
};

// Update a product in a wishlist
export const updateProduct = async (
  wishlistId: string,
  productId: string,
  productData: { name?: string; imageUrl?: string; price?: number }
): Promise<Product> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const wishlist = wishlists.find(w => w.id === wishlistId);
  if (!wishlist) {
    toast.error('Wishlist not found');
    throw new Error('Wishlist not found');
  }
  
  const productIndex = wishlist.products.findIndex(p => p.id === productId);
  if (productIndex === -1) {
    toast.error('Product not found');
    throw new Error('Product not found');
  }
  
  wishlist.products[productIndex] = {
    ...wishlist.products[productIndex],
    ...productData,
  };
  
  toast.success('Product updated successfully');
  return wishlist.products[productIndex];
};

// Remove a product from a wishlist
export const removeProduct = async (wishlistId: string, productId: string): Promise<void> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const wishlist = wishlists.find(w => w.id === wishlistId);
  if (!wishlist) {
    toast.error('Wishlist not found');
    throw new Error('Wishlist not found');
  }
  
  const initialLength = wishlist.products.length;
  wishlist.products = wishlist.products.filter(p => p.id !== productId);
  
  if (wishlist.products.length === initialLength) {
    toast.error('Product not found');
    throw new Error('Product not found');
  }
  
  toast.success('Product removed successfully');
};

// Invite a user to collaborate on a wishlist
export const inviteCollaborator = async (wishlistId: string, email: string): Promise<User> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const wishlist = wishlists.find(w => w.id === wishlistId);
  if (!wishlist) {
    toast.error('Wishlist not found');
    throw new Error('Wishlist not found');
  }
  
  // For demo purposes, create a mock user with the provided email
  const mockUser: User = {
    id: `mock-${Date.now()}`,
    name: email.split('@')[0], // Use part of email as name
    email
  };
  
  // Check if user is already a collaborator
  if (wishlist.collaborators.some(c => c.email === email)) {
    toast.error('User is already a collaborator');
    throw new Error('User is already a collaborator');
  }
  
  wishlist.collaborators.push(mockUser);
  toast.success('Invitation sent successfully');
  return mockUser;
};
