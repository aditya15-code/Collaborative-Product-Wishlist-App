
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Product, removeProduct } from '@/services/wishlistService';
import { toast } from 'sonner';
import { Trash } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface ProductItemProps {
  product: Product;
  wishlistId: string;
  onProductRemoved: (productId: string) => void;
}

const ProductItem: React.FC<ProductItemProps> = ({ product, wishlistId, onProductRemoved }) => {
  const [isLoading, setIsLoading] = useState(false);
  
  const handleRemove = async () => {
    setIsLoading(true);
    
    try {
      await removeProduct(wishlistId, product.id);
      onProductRemoved(product.id);
    } catch (error) {
      console.error('Error removing product:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formattedDate = new Date(product.createdAt).toLocaleDateString();

  return (
    <Card className="wishify-card overflow-hidden h-full flex flex-col">
      <div className="aspect-video overflow-hidden">
        <img 
          src={product.imageUrl || '/placeholder.svg'} 
          alt={product.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            // Fallback to placeholder if image fails to load
            (e.target as HTMLImageElement).src = '/placeholder.svg';
          }}
        />
      </div>
      <CardContent className="flex-grow p-4">
        <div className="mb-2 flex justify-between items-start">
          <h3 className="font-medium">{product.name}</h3>
          <span className="text-lg font-semibold">${product.price.toFixed(2)}</span>
        </div>
        
        <div className="flex items-center gap-2 mt-4">
          <Avatar className="w-6 h-6">
            <AvatarFallback className="text-xs">
              {product.createdBy.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="text-sm text-muted-foreground">
            Added by {product.createdBy.name} on {formattedDate}
          </div>
        </div>
        
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline" size="sm" className="mt-4">
              <Trash className="h-4 w-4 mr-2" />
              Remove
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently remove {product.name} from the wishlist.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction 
                onClick={handleRemove} 
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                {isLoading ? 'Removing...' : 'Remove'}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardContent>
    </Card>
  );
};

export default ProductItem;
