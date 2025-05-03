
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { getWishlistById, inviteCollaborator } from '@/services/wishlistService';
import { Wishlist } from '@/services/wishlistService';
import ProductItem from '@/components/Product/ProductItem';
import AddProductForm from '@/components/Product/AddProductForm';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Share } from 'lucide-react';
import InviteCollaboratorDialog from '@/components/Wishlist/InviteCollaboratorDialog';

const WishlistDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [wishlist, setWishlist] = useState<Wishlist | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!id) {
      navigate('/dashboard');
      return;
    }
    
    const fetchWishlist = async () => {
      try {
        const data = await getWishlistById(id);
        if (data) {
          setWishlist(data);
        } else {
          toast.error('Wishlist not found');
          navigate('/dashboard');
        }
      } catch (error) {
        console.error('Error fetching wishlist:', error);
        toast.error('Failed to load wishlist');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchWishlist();
  }, [id, navigate]);

  const handleProductAdded = (updatedWishlist: Wishlist) => {
    setWishlist(updatedWishlist);
  };

  const handleProductRemoved = (productId: string) => {
    if (!wishlist) return;
    
    setWishlist({
      ...wishlist,
      products: wishlist.products.filter(p => p.id !== productId)
    });
  };

  const handleInviteCollaborator = async (email: string) => {
    if (!wishlist || !id) return;
    
    try {
      await inviteCollaborator(id, email);
      
      // Refresh wishlist data
      const updatedWishlist = await getWishlistById(id);
      if (updatedWishlist) {
        setWishlist(updatedWishlist);
      }
    } catch (error) {
      console.error('Error inviting collaborator:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 animate-pulse">
        <div className="h-8 bg-muted rounded w-1/3 mb-4"></div>
        <div className="h-4 bg-muted rounded w-1/2 mb-8"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-64 bg-muted rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  if (!wishlist) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Wishlist not found</h2>
        <p className="mb-6">The wishlist you're looking for doesn't seem to exist.</p>
        <Button asChild>
          <Link to="/dashboard">Go back to dashboard</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-3xl font-bold">{wishlist.name}</h1>
            <Badge variant="outline" className="ml-2">
              {wishlist.products.length} {wishlist.products.length === 1 ? 'item' : 'items'}
            </Badge>
          </div>
          <p className="text-muted-foreground">{wishlist.description}</p>
        </div>
        
        <div className="flex gap-2">
          <InviteCollaboratorDialog onInvite={handleInviteCollaborator} />
          <AddProductForm wishlistId={wishlist.id} onProductAdded={handleProductAdded} />
        </div>
      </div>
      
      <Separator className="my-6" />
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Collaborators</h2>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2 p-2 border rounded-lg">
            <Avatar className="w-8 h-8">
              <AvatarFallback>{wishlist.createdBy.name.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium text-sm">{wishlist.createdBy.name}</p>
              <p className="text-xs text-muted-foreground">Owner</p>
            </div>
          </div>
          
          {wishlist.collaborators.map(collaborator => (
            <div key={collaborator.id} className="flex items-center gap-2 p-2 border rounded-lg">
              <Avatar className="w-8 h-8">
                <AvatarFallback>{collaborator.name.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-sm">{collaborator.name}</p>
                <p className="text-xs text-muted-foreground">Collaborator</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <h2 className="text-xl font-semibold mb-4">Products</h2>
      {wishlist.products.length === 0 ? (
        <div className="text-center py-12 border rounded-lg">
          <p className="text-muted-foreground mb-4">No products in this wishlist yet.</p>
          <AddProductForm wishlistId={wishlist.id} onProductAdded={handleProductAdded} />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.products.map(product => (
            <ProductItem
              key={product.id}
              product={product}
              wishlistId={wishlist.id}
              onProductRemoved={handleProductRemoved}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistDetail;
