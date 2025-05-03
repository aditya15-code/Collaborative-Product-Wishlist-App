
import React from 'react';
import Layout from '@/components/Layout/Layout';

const About: React.FC = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">About Wishify</h1>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-3">Our Mission</h2>
            <p className="text-lg text-muted-foreground">
              Wishify was created to make collaborative wishlist creation simple and enjoyable. 
              We believe that sharing your wishes with friends and family should be easy, 
              whether it's for a birthday, wedding, holiday, or any other occasion.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-3">Our Story</h2>
            <p className="text-lg text-muted-foreground mb-4">
              Wishify started as a simple idea: make it easier for groups to plan gifts together. 
              Too often, gift-giving becomes complicated when multiple people want to coordinate.
            </p>
            <p className="text-lg text-muted-foreground">
              Our platform helps solve this problem by providing a central place for wishlist 
              creation and collaboration, ensuring that everyone stays on the same page.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-3">Our Technology</h2>
            <p className="text-lg text-muted-foreground mb-4">
              Wishify is built using modern web technologies to ensure a fast, responsive, 
              and user-friendly experience:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>React for interactive user interfaces</li>
              <li>Tailwind CSS for beautiful, responsive designs</li>
              <li>TypeScript for type-safe code</li>
              <li>Vite for lightning-fast development</li>
            </ul>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default About;
