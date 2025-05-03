
import React from 'react';
import Layout from '@/components/Layout/Layout';
import WishlistDetail from '@/components/Wishlist/WishlistDetail';

const WishlistView: React.FC = () => {
  return (
    <Layout requireAuth>
      <WishlistDetail />
    </Layout>
  );
};

export default WishlistView;
