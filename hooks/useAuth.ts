import { useState, useEffect } from 'react';
import { User } from '../types';

// TODO: Import supabase client
// import { supabase } from '../services/supabaseClient';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // TODO: Check active session with Supabase
    // const session = supabase.auth.session();
    // if (session) fetchUserProfile(session.user.id);

    // MOCK AUTH
    const mockUser: User = {
      id: 'user_123',
      username: 'DemoStudent',
      email: 'student@university.edu',
      role: 'student'
    };
    
    // Simulating async auth check
    setTimeout(() => {
      setUser(mockUser);
      setIsLoading(false);
    }, 500);
  }, []);

  const login = async () => {
    // TODO: Implement Supabase Login
    console.log("Login triggered");
  };

  const logout = async () => {
    // TODO: Implement Supabase Logout
    setUser(null);
  };

  return { user, isLoading, login, logout, isAuthenticated: !!user };
};