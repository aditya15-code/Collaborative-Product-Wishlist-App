
import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { getUserWishlists, Wishlist } from '@/services/wishlistService';
import WishlistCard from '@/components/Wishlist/WishlistCard';
import CreateWishlist from '@/components/Wishlist/CreateWishlist';
import { toast } from 'sonner';

const Dashboard: React.FC = () => {
  const { currentUser } = useAuth();
  const [wishlists, setWishlists] = useState<Wishlist[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) return;

    const fetchWishlists = async () => {
      try {
        const data = await getUserWishlists(currentUser);
        setWishlists(data);
      } catch (error) {
        console.error('Error fetching wishlists:', error);
        toast.error('Failed to load wishlists');
      } finally {
        setIsLoading(false);
      }
    };

    fetchWishlists();
  }, [currentUser]);

  return (
    <Layout requireAuth>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold">Your Wishlists</h1>
            <p className="text-muted-foreground">
              Manage your wishlists and collaborations
            </p>
          </div>
          <CreateWishlist />
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-64 bg-muted rounded-xl animate-pulse"></div>
            ))}
          </div>
        ) : wishlists.length === 0 ? (
          <div className="text-center py-16">
            <h2 className="text-xl font-semibold mb-4">No wishlists yet</h2>
            <p className="text-muted-foreground mb-6">
              Create your first wishlist to get started
            </p>
            <CreateWishlist />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlists.map(wishlist => (
              <WishlistCard key={wishlist.id} wishlist={wishlist} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Dashboard;
