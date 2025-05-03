
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout/Layout';

const Index = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <section className="py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">
              Create and Share <span className="wishify-gradient-text">Wishlists</span> with Anyone
            </h1>
            <p className="text-xl mb-8 text-muted-foreground">
              Build collaborative wishlists for any occasion. Invite friends and family to add their suggestions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="wishify-gradient-bg">
                <Link to="/signup">Get Started</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/login">Log in</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 border-t">
          <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 border rounded-xl hover:shadow-md transition-shadow">
              <h3 className="font-bold text-xl mb-3">Create Wishlists</h3>
              <p className="text-muted-foreground">
                Easily create and manage wishlists for any occasion, from birthdays to holidays.
              </p>
            </div>
            <div className="p-6 border rounded-xl hover:shadow-md transition-shadow">
              <h3 className="font-bold text-xl mb-3">Collaborate</h3>
              <p className="text-muted-foreground">
                Invite friends and family to add and edit items on your wishlists.
              </p>
            </div>
            <div className="p-6 border rounded-xl hover:shadow-md transition-shadow">
              <h3 className="font-bold text-xl mb-3">Track Products</h3>
              <p className="text-muted-foreground">
                Add product details like images, prices, and descriptions to stay organized.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 border-t">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-xl mb-8 text-muted-foreground">
              Join thousands of users creating and sharing wishlists today.
            </p>
            <Button asChild size="lg" className="wishify-gradient-bg">
              <Link to="/signup">Sign Up Now</Link>
            </Button>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Index;
