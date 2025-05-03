
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Wishlist } from '@/services/wishlistService';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface WishlistCardProps {
  wishlist: Wishlist;
}

const WishlistCard: React.FC<WishlistCardProps> = ({ wishlist }) => {
  return (
    <Card className="wishify-card overflow-hidden h-full flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="truncate">{wishlist.name}</CardTitle>
        </div>
        <p className="text-muted-foreground text-sm truncate">{wishlist.description}</p>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium mb-1">Products</h4>
            <p className="text-2xl font-semibold">{wishlist.products.length}</p>
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-1">Collaborators</h4>
            <div className="flex -space-x-2">
              <Avatar className="border-2 border-background w-8 h-8">
                <AvatarFallback className="text-xs">
                  {wishlist.createdBy.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              
              {wishlist.collaborators.slice(0, 3).map((collaborator) => (
                <Avatar key={collaborator.id} className="border-2 border-background w-8 h-8">
                  <AvatarFallback className="text-xs">
                    {collaborator.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              ))}
              
              {wishlist.collaborators.length > 3 && (
                <Avatar className="border-2 border-background w-8 h-8">
                  <AvatarFallback className="text-xs bg-muted text-muted-foreground">
                    +{wishlist.collaborators.length - 3}
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          </div>
          
          {wishlist.products.length > 0 && (
            <div>
              <h4 className="text-sm font-medium mb-1">Recent Items</h4>
              <ul className="space-y-1">
                {wishlist.products.slice(0, 2).map((product) => (
                  <li key={product.id} className="text-sm truncate">
                    {product.name} - ${product.price.toFixed(2)}
                  </li>
                ))}
                {wishlist.products.length > 2 && (
                  <li className="text-sm text-muted-foreground">
                    +{wishlist.products.length - 2} more
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="pt-4 border-t flex justify-between items-center">
        <Badge variant="outline">
          Created {new Date(wishlist.createdAt).toLocaleDateString()}
        </Badge>
        <Button asChild>
          <Link to={`/wishlist/${wishlist.id}`}>View</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default WishlistCard;
