import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import AuctionDetail from './pages/AuctionDetail';
import CreateAuction from './pages/CreateAuction';
import AdminDashboard from './pages/AdminDashboard';
import Profile from './pages/Profile';

const App: React.FC = () => {
  return (
    <HashRouter>
      <div className="min-h-screen flex flex-col font-sans antialiased">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auction/:id" element={<AuctionDetail />} />
            <Route path="/create" element={<CreateAuction />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </main>
        <footer className="bg-white border-t border-slate-200 dark:bg-slate-900 dark:border-slate-700">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <p className="text-center text-sm text-slate-500">
              &copy; {new Date().getFullYear()} UniBid. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </HashRouter>
  );
};

export default App;