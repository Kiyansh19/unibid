import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Navbar: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-4 z-50 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="rounded-2xl border border-white/20 bg-white/80 backdrop-blur-xl shadow-lg dark:bg-slate-900/80 dark:border-slate-700/50 transition-all duration-300">
        <div className="flex h-16 justify-between items-center px-6">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-primary-600 text-white shadow-md group-hover:bg-primary-500 transition-colors">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">UniBid</span>
            </Link>
            
            <div className="hidden md:flex space-x-1">
              <Link 
                to="/" 
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${isActive('/') ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300' : 'text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800'}`}
              >
                Browse
              </Link>
              <Link 
                to="/create" 
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${isActive('/create') ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300' : 'text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800'}`}
              >
                Sell Item
              </Link>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <div className="hidden md:flex items-center gap-3 pl-4 border-l border-slate-200 dark:border-slate-700">
                <div className="text-right hidden lg:block">
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Welcome back</p>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white leading-tight">{user?.username}</p>
                </div>
                <Link to="/profile" className="h-10 w-10 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 p-[2px] shadow-md hover:shadow-lg transition-shadow">
                  <div className="h-full w-full rounded-full bg-white dark:bg-slate-900 flex items-center justify-center">
                     <span className="font-bold text-primary-600 dark:text-primary-400">{user?.username.charAt(0)}</span>
                  </div>
                </Link>
              </div>
            ) : (
              <div className="hidden md:flex gap-3">
                 <button className="text-sm font-semibold text-slate-600 hover:text-primary-600 dark:text-slate-300 transition-colors">Log In</button>
                 <button className="rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white shadow-md hover:bg-slate-800 hover:shadow-lg dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 transition-all">
                   Sign Up
                 </button>
              </div>
            )}
            
            {/* Mobile menu button */}
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 text-slate-600 dark:text-slate-300 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
              <span className="sr-only">Open menu</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-slate-100 dark:border-slate-700/50 p-4 space-y-2 animate-in slide-in-from-top-5 duration-200">
            <Link to="/" className="block px-4 py-3 rounded-xl text-base font-medium text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-800/50">Browse Auctions</Link>
            <Link to="/create" className="block px-4 py-3 rounded-xl text-base font-medium text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-800/50">Sell Item</Link>
            <Link to="/profile" className="block px-4 py-3 rounded-xl text-base font-medium text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-800/50">Profile</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;