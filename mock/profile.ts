import { Auction } from '../types';

export interface UserProfileStats {
  totalBids: number;
  auctionsWon: number;
  totalSpent: number;
  activeListings: number;
}

export interface MyBid {
  id: string;
  auctionId: string;
  auctionTitle: string;
  auctionImage: string;
  amount: number;
  timestamp: string;
  status: 'winning' | 'outbid' | 'won' | 'lost';
  endTime: string;
}

export const MOCK_USER_STATS: UserProfileStats = {
  totalBids: 42,
  auctionsWon: 7,
  totalSpent: 1250,
  activeListings: 3,
};

export const MOCK_MY_BIDS: MyBid[] = [
  {
    id: 'b1',
    auctionId: '1',
    auctionTitle: 'MacBook Pro M1 2020',
    auctionImage: 'https://picsum.photos/id/1/800/600',
    amount: 650,
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    status: 'winning',
    endTime: new Date(Date.now() + 3600000).toISOString(),
  },
  {
    id: 'b2',
    auctionId: '2',
    auctionTitle: 'Sony WH-1000XM4 Headphones',
    auctionImage: 'https://picsum.photos/id/2/800/600',
    amount: 115,
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    status: 'outbid',
    endTime: new Date(Date.now() + 86400000).toISOString(),
  },
  {
    id: 'b3',
    auctionId: '5',
    auctionTitle: 'Gaming Monitor 27"',
    auctionImage: 'https://picsum.photos/id/3/800/600',
    amount: 100,
    timestamp: new Date(Date.now() - 600000000).toISOString(),
    status: 'won',
    endTime: new Date(Date.now() - 100000).toISOString(),
  }
];

export const MOCK_MY_LISTINGS: Auction[] = [
  {
    id: '4',
    title: 'Electric Scooter',
    description: 'Xiaomi Mi Electric Scooter. Battery health 90%.',
    startingPrice: 150,
    currentPrice: 200,
    minIncrement: 10,
    startTime: new Date(Date.now() - 200000).toISOString(),
    endTime: new Date(Date.now() + 7200000).toISOString(),
    creatorId: 'user_123',
    image: 'https://picsum.photos/id/133/800/600',
    status: 'active',
  },
  {
    id: '99',
    title: 'Mechanical Keyboard Keycaps',
    description: 'Custom PBT keycaps, gradient purple.',
    startingPrice: 40,
    currentPrice: 40,
    minIncrement: 5,
    startTime: new Date(Date.now() + 86400000).toISOString(),
    endTime: new Date(Date.now() + 172800000).toISOString(),
    creatorId: 'user_123',
    image: 'https://picsum.photos/id/134/800/600',
    status: 'upcoming',
  }
];