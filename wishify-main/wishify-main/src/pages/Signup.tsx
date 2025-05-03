
import React from 'react';
import Layout from '@/components/Layout/Layout';
import SignupForm from '@/components/Auth/SignupForm';

const Signup: React.FC = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto">
          <SignupForm />
        </div>
      </div>
    </Layout>
  );
};

export default Signup;
