import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MOCK_AUCTIONS } from '../mock/auctions';
import { Auction, Bid, SocketEvents } from '../types';
import RealTimeTicker from '../components/RealTimeTicker';
import { useSocket } from '../hooks/useSocket';
import { useAuth } from '../hooks/useAuth';

const AuctionDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const { joinAuction, leaveAuction, placeBid, subscribe, unsubscribe } = useSocket();
  
  const [auction, setAuction] = useState<Auction | null>(null);
  const [bidHistory, setBidHistory] = useState<Bid[]>([]);
  const [bidAmount, setBidAmount] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Fetch Initial Data
  useEffect(() => {
    // TODO: Replace with api.get(`/auctions/${id}`)
    const found = MOCK_AUCTIONS.find(a => a.id === id);
    if (found) {
      setAuction(found);
      setBidAmount(found.currentPrice + found.minIncrement);
      
      // Mock Bid History
      setBidHistory([
        { userId: 'user_99', username: 'User_99', amount: found.currentPrice, timestamp: new Date().toISOString() },
        { userId: 'user_88', username: 'User_88', amount: found.currentPrice - found.minIncrement, timestamp: new Date().toISOString() }
      ]);
    }
  }, [id]);

  // Socket Listeners
  useEffect(() => {
    if (!id || !user) return;

    joinAuction(id, user.id);

    subscribe(SocketEvents.BID_UPDATE, (data: { bid: Bid, auctionId: string }) => {
      if (data.auctionId === id) {
        setAuction(prev => prev ? { ...prev, currentPrice: data.bid.amount } : null);
        setBidHistory(prev => [data.bid, ...prev]);
        setSuccessMsg(`New highest bid: $${data.bid.amount}`);
        setTimeout(() => setSuccessMsg(null), 3000);
      }
    });

    return () => {
      leaveAuction(id, user.id);
      unsubscribe(SocketEvents.BID_UPDATE);
    };
  }, [id, user, joinAuction, leaveAuction, subscribe, unsubscribe]);

  const handlePlaceBid = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!auction || !user) return;

    if (bidAmount < auction.currentPrice + auction.minIncrement) {
      setError(`Bid must be at least $${auction.currentPrice + auction.minIncrement}`);
      return;
    }

    // Optimistic Update
    const newBid: Bid = {
      userId: user.id,
      username: user.username,
      amount: bidAmount,
      timestamp: new Date().toISOString(),
    };

    setBidHistory(prev => [newBid, ...prev]);
    setAuction(prev => prev ? { ...prev, currentPrice: bidAmount } : null);

    // Emit event
    placeBid(auction.id, user.id, bidAmount);
    
    setSuccessMsg("Bid placed successfully!");
    setBidAmount(bidAmount + auction.minIncrement); // Prepare next increment
    setTimeout(() => setSuccessMsg(null), 3000);
  };

  if (!auction) return (
    <div className="flex h-screen items-center justify-center">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary-200 border-t-primary-600"></div>
    </div>
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {successMsg && (
        <div className="fixed top-24 right-5 z-50 flex items-center gap-2 rounded-xl bg-green-500 px-5 py-3 font-semibold text-white shadow-lg shadow-green-500/30 animate-float">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
          {successMsg}
        </div>
      )}
      
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        {/* Left Column: Images & Details (Span 7) */}
        <div className="lg:col-span-7 space-y-8">
          <div className="overflow-hidden rounded-3xl bg-slate-100 dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700">
            <img src={auction.image} alt={auction.title} className="w-full h-auto object-cover max-h-[600px]" />
          </div>

          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">{auction.title}</h1>
              <button className="mt-1 text-sm font-semibold text-slate-400 hover:text-red-500 transition-colors flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                Report
              </button>
            </div>
            <div className="flex items-center gap-3 text-sm">
               <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300 font-medium">Electronics</span>
               <span className="text-slate-400">•</span>
               <span className="text-slate-500 dark:text-slate-400">Listed by <span className="font-semibold text-primary-600 dark:text-primary-400">User_{auction.creatorId.slice(0,4)}</span></span>
            </div>
            <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">{auction.description}</p>
          </div>
        </div>

        {/* Right Column: Bidding Card (Span 5) - Sticky */}
        <div className="lg:col-span-5">
          <div className="sticky top-28 space-y-6">
            {/* Status Card */}
            <div className="rounded-3xl bg-white p-8 shadow-xl shadow-slate-200/50 dark:bg-surface-dark dark:shadow-none border border-slate-100 dark:border-slate-700">
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-secondary-500"></span>
                  </span>
                  <span className="text-sm font-bold uppercase tracking-wider text-secondary-600 dark:text-secondary-400">Live Auction</span>
                </div>
                <div className="text-right">
                   <p className="text-xs font-bold uppercase text-slate-400 mb-1">Time Remaining</p>
                   <div className="text-xl"><RealTimeTicker targetDate={auction.endTime} /></div>
                </div>
              </div>

              <div className="mb-8 text-center">
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">Current Highest Bid</p>
                <p className="text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  ${auction.currentPrice.toLocaleString()}
                </p>
              </div>

              {/* Bidding Control */}
              <form onSubmit={handlePlaceBid} className="space-y-4">
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                    <span className="text-slate-400 font-bold text-lg">$</span>
                  </div>
                  <input 
                    type="number"
                    value={bidAmount}
                    onChange={(e) => setBidAmount(parseFloat(e.target.value))}
                    className="block w-full rounded-2xl border-2 border-slate-200 bg-slate-50 py-4 pl-10 pr-4 text-xl font-bold text-slate-900 placeholder:text-slate-400 focus:border-primary-500 focus:bg-white focus:ring-0 dark:border-slate-700 dark:bg-slate-900/50 dark:text-white transition-all"
                  />
                </div>
                
                <button 
                  type="submit"
                  disabled={auction.status !== 'active'}
                  className="w-full rounded-2xl bg-slate-900 py-4 text-lg font-bold text-white shadow-lg shadow-slate-900/20 hover:bg-primary-600 hover:shadow-primary-600/30 hover:-translate-y-0.5 disabled:bg-slate-300 disabled:cursor-not-allowed disabled:shadow-none disabled:translate-y-0 dark:bg-white dark:text-slate-900 dark:hover:bg-primary-400 transition-all duration-200"
                >
                  Place Bid
                </button>
                
                <div className="flex justify-between text-xs font-medium text-slate-500 px-2">
                  <span>Min increment: ${auction.minIncrement}</span>
                  <span>{bidHistory.length} bids placed</span>
                </div>
                
                {error && (
                  <div className="rounded-xl bg-red-50 p-3 text-sm font-medium text-red-600 dark:bg-red-900/20 dark:text-red-300 text-center border border-red-100 dark:border-red-800">
                    {error}
                  </div>
                )}
              </form>
            </div>

            {/* Bid History */}
            <div className="rounded-3xl bg-white p-6 shadow-lg shadow-slate-200/50 border border-slate-100 dark:bg-surface-dark dark:border-slate-700 dark:shadow-none">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-5 flex items-center gap-2">
                <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                Recent Activity
              </h3>
              <div className="relative space-y-6 pl-2 before:absolute before:left-5 before:top-2 before:h-full before:w-0.5 before:bg-slate-100 dark:before:bg-slate-800">
                {bidHistory.map((bid, index) => (
                  <div key={index} className="relative flex items-center justify-between pl-8">
                    {/* Timeline Dot */}
                    <div className={`absolute left-[14px] h-3 w-3 -translate-x-1/2 rounded-full ring-4 ring-white dark:ring-slate-800 ${index === 0 ? 'bg-primary-500' : 'bg-slate-300 dark:bg-slate-600'}`}></div>
                    
                    <div className="flex flex-col">
                      <span className={`text-sm font-bold ${index === 0 ? 'text-slate-900 dark:text-white' : 'text-slate-500 dark:text-slate-400'}`}>
                        {bid.userId === user?.id ? 'You' : bid.username || `User_${bid.userId.slice(0,4)}`}
                      </span>
                      <span className="text-xs text-slate-400">{new Date(bid.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                    </div>
                    <div className={`font-mono font-bold ${index === 0 ? 'text-primary-600 dark:text-primary-400 text-lg' : 'text-slate-600 dark:text-slate-400'}`}>
                      ${bid.amount}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuctionDetail;