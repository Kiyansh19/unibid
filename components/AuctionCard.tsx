import React from 'react';
import { Link } from 'react-router-dom';
import { Auction } from '../types';
import RealTimeTicker from './RealTimeTicker';

interface Props {
  auction: Auction;
}

const AuctionCard: React.FC<Props> = ({ auction }) => {
  return (
    <div className="group relative flex flex-col rounded-2xl bg-white dark:bg-surface-dark shadow-md shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-700 overflow-hidden hover:shadow-xl hover:shadow-primary-900/5 dark:hover:shadow-slate-900/50 hover:-translate-y-1 transition-all duration-300">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
        <img
          src={auction.image}
          alt={auction.title}
          className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        <div className="absolute top-3 right-3">
          <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-bold backdrop-blur-md shadow-sm ${
            auction.status === 'active' 
              ? 'bg-white/90 text-green-700 dark:bg-slate-900/80 dark:text-green-400' 
              : auction.status === 'upcoming' 
                ? 'bg-white/90 text-blue-700 dark:bg-slate-900/80 dark:text-blue-400' 
                : 'bg-slate-100 text-slate-600'
          }`}>
            {auction.status === 'active' && <span className="mr-1.5 h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>}
            {auction.status === 'active' ? 'LIVE' : auction.status === 'upcoming' ? 'SOON' : 'CLOSED'}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white truncate leading-tight group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
          {auction.title}
        </h3>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 line-clamp-2 flex-1">
          {auction.description}
        </p>

        <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-700/50 grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-slate-400 dark:text-slate-500">Current Bid</p>
            <p className="text-xl font-extrabold text-slate-900 dark:text-white">
              ${auction.currentPrice.toLocaleString()}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs font-medium uppercase tracking-wider text-slate-400 dark:text-slate-500">Ends In</p>
            <RealTimeTicker targetDate={auction.endTime} />
          </div>
        </div>

        <div className="mt-5">
          <Link
            to={`/auction/${auction.id}`}
            className="flex w-full items-center justify-center rounded-xl bg-slate-900 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-slate-900/20 transition-all hover:bg-primary-600 hover:shadow-primary-600/30 active:scale-95 dark:bg-white dark:text-slate-900 dark:hover:bg-primary-400"
          >
            Place Bid
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AuctionCard;