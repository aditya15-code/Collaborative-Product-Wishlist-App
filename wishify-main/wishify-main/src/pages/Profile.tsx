
import React from 'react';
import Layout from '@/components/Layout/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const Profile: React.FC = () => {
  const { currentUser, logout } = useAuth();
  
  const handleLogout = () => {
    logout();
  };
  
  const handleExportData = () => {
    toast.success('Data exported successfully');
  };
  
  if (!currentUser) {
    return null; // Will be handled by the Layout component
  }

  return (
    <Layout requireAuth>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Your Profile</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Your account details</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center pt-6">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarFallback className="text-2xl">
                  {currentUser.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <h2 className="text-xl font-bold">{currentUser.name}</h2>
              <p className="text-muted-foreground">{currentUser.email}</p>
              <div className="mt-8 w-full space-y-4">
                <Button onClick={handleLogout} variant="destructive" className="w-full">
                  Log Out
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="md:col-span-2">
            <CardHeader className="pb-2">
              <CardTitle>Settings</CardTitle>
              <CardDescription>Manage your account settings</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-2">Account ID</h3>
                  <p className="text-muted-foreground">{currentUser.id}</p>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Data Export</h3>
                  <p className="text-muted-foreground mb-2">
                    Export all your wishlist data in JSON format.
                  </p>
                  <Button variant="outline" onClick={handleExportData}>
                    Export Data
                  </Button>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2 text-destructive">Danger Zone</h3>
                  <p className="text-muted-foreground mb-2">
                    Permanently delete your account and all associated data.
                  </p>
                  <Button variant="outline" className="text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground">
                    Delete Account
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
