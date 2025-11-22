import React, { useEffect, useState } from 'react';
import AuctionCard from '../components/AuctionCard';
import { MOCK_AUCTIONS } from '../mock/auctions';
import { Auction } from '../types';

const Home: React.FC = () => {
  const [auctions, setAuctions] = useState<Auction[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // TODO: Replace with API call
    // api.get('/auctions').then(res => setAuctions(res.data));
    
    // Simulate fetch
    setTimeout(() => {
      setAuctions(MOCK_AUCTIONS);
      setIsLoading(false);
    }, 500);
  }, []);

  return (
    <div className="min-h-screen bg-bg-light dark:bg-bg-dark pb-20">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-slate-900 pt-24 pb-32 lg:pt-32 lg:pb-40">
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
           <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-primary-600/20 blur-3xl"></div>
           <div className="absolute top-32 right-0 w-80 h-80 rounded-full bg-accent-500/20 blur-3xl"></div>
           <div className="absolute bottom-0 left-1/2 w-full h-64 -translate-x-1/2 bg-gradient-to-t from-bg-light dark:from-bg-dark to-transparent z-10"></div>
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm mb-6">
            <span className="flex h-2 w-2 rounded-full bg-green-400 animate-pulse"></span>
            <span className="text-xs font-medium text-white tracking-wide">LIVE AUCTIONS RUNNING</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-6 drop-shadow-sm">
            Buy & Sell <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-accent-400">Campus Gear</span>
          </h1>
          <p className="mt-4 text-xl text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
            The safe, real-time auction platform exclusively for students. Upgrade your dorm setup without breaking the bank.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-24 relative z-20">
        {/* Search Bar */}
        <div className="rounded-2xl bg-white/90 dark:bg-slate-800/90 p-3 shadow-2xl backdrop-blur-xl border border-white/20 dark:border-slate-700">
          <div className="flex flex-col md:flex-row gap-2">
             <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input 
                  type="text" 
                  placeholder="Search for textbooks, electronics, furniture..." 
                  className="block w-full rounded-xl border-0 bg-slate-100 dark:bg-slate-900/50 py-3.5 pl-10 text-slate-900 placeholder:text-slate-500 focus:ring-2 focus:ring-primary-500 dark:text-white sm:text-sm sm:leading-6 font-medium transition-all"
                />
             </div>
             <div className="flex gap-2">
               <select className="rounded-xl border-0 bg-slate-100 dark:bg-slate-900/50 py-3.5 px-4 text-slate-900 focus:ring-2 focus:ring-primary-500 dark:text-white sm:text-sm font-medium cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">
                 <option>All Categories</option>
                 <option>Electronics</option>
                 <option>Textbooks</option>
                 <option>Dorm Life</option>
               </select>
               <button className="rounded-xl bg-primary-600 px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-primary-600/30 hover:bg-primary-500 hover:shadow-primary-600/50 hover:-translate-y-0.5 transition-all duration-200">
                 Search
               </button>
             </div>
          </div>
        </div>

        {/* Filter Tags */}
        <div className="mt-8 flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
          {['Recent', 'Ending Soon', 'Electronics', 'Textbooks', 'Furniture', 'Misc'].map((tag, i) => (
            <button key={tag} className={`whitespace-nowrap rounded-full px-5 py-2 text-sm font-medium border transition-all ${i === 0 ? 'bg-slate-900 text-white border-slate-900 dark:bg-white dark:text-slate-900' : 'bg-white border-slate-200 text-slate-600 hover:border-primary-500 hover:text-primary-600 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300'}`}>
              {tag}
            </button>
          ))}
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
            <span className="bg-gradient-to-r from-primary-500 to-accent-500 h-8 w-1 rounded-full"></span>
            Trending Auctions
          </h2>
          
          {isLoading ? (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="h-[400px] animate-pulse rounded-2xl bg-slate-200 dark:bg-slate-800"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {auctions.map(auction => (
                <AuctionCard key={auction.id} auction={auction} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;