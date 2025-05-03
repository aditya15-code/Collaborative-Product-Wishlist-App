
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

export interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  currentUser: User | null;
  login: (email: string, password: string) => Promise<User>;
  signup: (name: string, email: string, password: string) => Promise<User>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  
  useEffect(() => {
    // Check for stored user on component mount
    const storedUser = localStorage.getItem('wishify_user');
    if (storedUser) {
      try {
        setCurrentUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing stored user', error);
        localStorage.removeItem('wishify_user');
      }
    }
  }, []);

  const login = async (email: string, password: string): Promise<User> => {
    try {
      console.log('Attempting to log in with:', email);
      // Check if user exists in the database
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .single();

      if (userError || !userData) {
        console.error('User not found:', userError);
        toast.error('Invalid email or password');
        throw new Error('Invalid email or password');
      }

      // Simple password check (in a real app, you would use proper hashing)
      if (userData.password !== password) {
        console.error('Password mismatch');
        toast.error('Invalid email or password');
        throw new Error('Invalid email or password');
      }
      
      const user: User = {
        id: userData.id,
        name: userData.name,
        email: userData.email
      };

      setCurrentUser(user);
      localStorage.setItem('wishify_user', JSON.stringify(user));
      
      toast.success('Logged in successfully');
      return user;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const signup = async (name: string, email: string, password: string): Promise<User> => {
    try {
      console.log('Attempting to sign up with:', email);
      // Check if user already exists
      const { data: existingUser, error: checkError } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .maybeSingle();
      
      if (checkError) {
        console.error('Error checking existing user:', checkError);
      }
      
      if (existingUser) {
        console.error('User already exists');
        toast.error('Email already in use');
        throw new Error('Email already in use');
      }
      
      // Insert new user
      const { data: newUserData, error: insertError } = await supabase
        .from('users')
        .insert([
          {
            name,
            email,
            password // In a real app, you would hash this password
          }
        ])
        .select()
        .single();
      
      if (insertError) {
        console.error('Error creating user:', insertError);
        toast.error('Error creating account: ' + insertError.message);
        throw new Error('Error creating account');
      }
      
      if (!newUserData) {
        console.error('No user data returned after insert');
        toast.error('Error creating account: No data returned');
        throw new Error('Error creating account');
      }
      
      console.log('User created successfully:', newUserData);
      
      const user: User = {
        id: newUserData.id,
        name: newUserData.name,
        email: newUserData.email
      };
      
      setCurrentUser(user);
      localStorage.setItem('wishify_user', JSON.stringify(user));
      
      toast.success('Account created successfully');
      return user;
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('wishify_user');
    toast.success('Logged out successfully');
  };

  const value = {
    currentUser,
    login,
    signup,
    logout,
    isAuthenticated: !!currentUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
