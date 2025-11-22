import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { MOCK_USER_STATS, MOCK_MY_BIDS, MOCK_MY_LISTINGS, MyBid } from '../mock/profile';
import RealTimeTicker from '../components/RealTimeTicker';

const Profile: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'bids' | 'listings'>('bids');

  if (!user) return null; // Or redirect

  const StatusBadge = ({ status }: { status: MyBid['status'] }) => {
    const styles = {
      winning: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800',
      outbid: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800',
      won: 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400 border-primary-200 dark:border-primary-800',
      lost: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400 border-slate-200 dark:border-slate-700',
    };

    const labels = {
      winning: 'Highest Bidder',
      outbid: 'Outbid',
      won: 'Won',
      lost: 'Lost',
    };

    return (
      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold border ${styles[status]}`}>
        {status === 'winning' && <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse"></span>}
        {labels[status]}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-bg-light dark:bg-bg-dark relative">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-96 overflow-hidden z-0 pointer-events-none">
        <div className="absolute -top-20 -right-20 w-[500px] h-[500px] rounded-full bg-primary-500/10 blur-3xl"></div>
        <div className="absolute top-40 -left-20 w-[400px] h-[400px] rounded-full bg-accent-500/10 blur-3xl"></div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="relative rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-white/20 dark:border-slate-700 p-8 shadow-xl shadow-slate-200/50 dark:shadow-none mb-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            {/* Avatar */}
            <div className="relative group">
              <div className="h-24 w-24 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 p-[3px] shadow-lg">
                <div className="h-full w-full rounded-full bg-white dark:bg-slate-900 flex items-center justify-center text-3xl font-bold text-slate-800 dark:text-white">
                  {user.username.charAt(0).toUpperCase()}
                </div>
              </div>
              <button className="absolute bottom-0 right-0 rounded-full bg-slate-900 p-1.5 text-white shadow-md hover:bg-primary-600 transition-colors">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
              </button>
            </div>

            {/* User Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">{user.username}</h1>
              <p className="text-slate-500 dark:text-slate-400 font-medium">{user.email}</p>
              <div className="mt-3 flex flex-wrap justify-center md:justify-start gap-2">
                <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wide">
                  {user.role}
                </span>
                <span className="px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-900/20 text-xs font-bold text-amber-700 dark:text-amber-400 flex items-center gap-1">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                  4.9 Rating
                </span>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-4 w-full md:w-auto mt-6 md:mt-0">
              <div className="text-center p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50">
                <p className="text-2xl font-black text-slate-900 dark:text-white">{MOCK_USER_STATS.totalBids}</p>
                <p className="text-xs font-bold text-slate-400 uppercase">Bids</p>
              </div>
              <div className="text-center p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50">
                <p className="text-2xl font-black text-primary-600 dark:text-primary-400">{MOCK_USER_STATS.auctionsWon}</p>
                <p className="text-xs font-bold text-slate-400 uppercase">Won</p>
              </div>
              <div className="text-center p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50">
                <p className="text-2xl font-black text-slate-900 dark:text-white">{MOCK_USER_STATS.activeListings}</p>
                <p className="text-xs font-bold text-slate-400 uppercase">Listed</p>
              </div>
            </div>
          </div>
        </div>

        {/* Content Tabs */}
        <div className="space-y-6">
          <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-200/50 dark:bg-slate-800/50 w-fit backdrop-blur-sm">
            <button 
              onClick={() => setActiveTab('bids')}
              className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${
                activeTab === 'bids' 
                ? 'bg-white text-slate-900 shadow-md dark:bg-slate-700 dark:text-white' 
                : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
              }`}
            >
              My Bids
            </button>
            <button 
              onClick={() => setActiveTab('listings')}
              className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${
                activeTab === 'listings' 
                ? 'bg-white text-slate-900 shadow-md dark:bg-slate-700 dark:text-white' 
                : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
              }`}
            >
              My Listings
            </button>
          </div>

          {/* List View */}
          <div className="space-y-4">
            {activeTab === 'bids' ? (
              MOCK_MY_BIDS.length > 0 ? (
                MOCK_MY_BIDS.map((bid) => (
                  <div key={bid.id} className="group relative flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-surface-dark border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5">
                    <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-slate-100">
                      <img src={bid.auctionImage} alt={bid.auctionTitle} className="h-full w-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <h3 className="font-bold text-slate-900 dark:text-white truncate pr-4">{bid.auctionTitle}</h3>
                        <StatusBadge status={bid.status} />
                      </div>
                      <div className="mt-1 flex items-center gap-4 text-sm">
                        <span className="text-slate-500 dark:text-slate-400">Your bid: <span className="font-bold text-slate-900 dark:text-white">${bid.amount}</span></span>
                        <span className="text-slate-300 dark:text-slate-600">|</span>
                        <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                          <RealTimeTicker targetDate={bid.endTime} />
                        </span>
                      </div>
                    </div>
                    <Link to={`/auction/${bid.auctionId}`} className="absolute inset-0 rounded-2xl focus:ring-2 focus:ring-primary-500"></Link>
                    <div className="hidden sm:block text-slate-300 dark:text-slate-600 group-hover:translate-x-1 transition-transform">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-20 text-slate-400">No bids placed yet.</div>
              )
            ) : (
              MOCK_MY_LISTINGS.length > 0 ? (
                MOCK_MY_LISTINGS.map((auction) => (
                  <div key={auction.id} className="group relative flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-surface-dark border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5">
                    <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-slate-100">
                      <img src={auction.image} alt={auction.title} className="h-full w-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <h3 className="font-bold text-slate-900 dark:text-white truncate pr-4">{auction.title}</h3>
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold border ${
                          auction.status === 'active' ? 'bg-green-100 text-green-700 border-green-200' : 'bg-slate-100 text-slate-600 border-slate-200'
                        }`}>
                          {auction.status.toUpperCase()}
                        </span>
                      </div>
                      <div className="mt-1 flex items-center gap-4 text-sm">
                        <span className="text-slate-500 dark:text-slate-400">Current Price: <span className="font-bold text-primary-600 dark:text-primary-400">${auction.currentPrice}</span></span>
                        <span className="text-slate-300 dark:text-slate-600">|</span>
                        <span className="text-slate-500 dark:text-slate-400">Ends: {new Date(auction.endTime).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 relative z-10">
                       <button className="p-2 text-slate-400 hover:text-primary-600 transition-colors" title="Edit">
                         <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                       </button>
                       <Link to={`/auction/${auction.id}`} className="p-2 text-slate-400 hover:text-primary-600 transition-colors" title="View">
                         <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                       </Link>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-20 text-slate-400">No listings active.</div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;