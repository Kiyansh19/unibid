import { Auction } from '../types';

export const MOCK_AUCTIONS: Auction[] = [
  {
    id: '1',
    title: 'MacBook Pro M1 2020',
    description: 'Slightly used MacBook Pro, 16GB RAM, 512GB SSD. Great for CS students.',
    startingPrice: 500,
    currentPrice: 650,
    minIncrement: 25,
    startTime: new Date(Date.now() - 86400000).toISOString(), // Started yesterday
    endTime: new Date(Date.now() + 3600000).toISOString(), // Ends in 1 hour
    creatorId: 'user_1',
    image: 'https://picsum.photos/id/1/800/600',
    status: 'active',
  },
  {
    id: '2',
    title: 'Sony WH-1000XM4 Headphones',
    description: 'Noise cancelling headphones, mint condition. Comes with case.',
    startingPrice: 100,
    currentPrice: 120,
    minIncrement: 5,
    startTime: new Date(Date.now() - 100000).toISOString(),
    endTime: new Date(Date.now() + 86400000).toISOString(), // Ends tomorrow
    creatorId: 'user_2',
    image: 'https://picsum.photos/id/2/800/600',
    status: 'active',
  },
  {
    id: '3',
    title: 'Vintage Calculus Textbook',
    description: 'Calculus: Early Transcendentals (8th Edition). No scribbles.',
    startingPrice: 30,
    currentPrice: 30,
    minIncrement: 2,
    startTime: new Date(Date.now() + 86400000).toISOString(), // Starts tomorrow
    endTime: new Date(Date.now() + 172800000).toISOString(),
    creatorId: 'user_3',
    image: 'https://picsum.photos/id/24/800/600',
    status: 'upcoming',
  },
  {
    id: '4',
    title: 'Electric Scooter',
    description: 'Xiaomi Mi Electric Scooter. Battery health 90%. Pickup only at dorms.',
    startingPrice: 150,
    currentPrice: 200,
    minIncrement: 10,
    startTime: new Date(Date.now() - 200000).toISOString(),
    endTime: new Date(Date.now() + 7200000).toISOString(),
    creatorId: 'user_4',
    image: 'https://picsum.photos/id/133/800/600',
    status: 'active',
  },
  {
    id: '5',
    title: 'Gaming Monitor 27"',
    description: '144Hz IPS panel. No dead pixels.',
    startingPrice: 100,
    currentPrice: 100,
    minIncrement: 5,
    startTime: new Date(Date.now() - 500000).toISOString(),
    endTime: new Date(Date.now() - 100000).toISOString(), // Ended
    creatorId: 'user_1',
    image: 'https://picsum.photos/id/3/800/600',
    status: 'ended',
  }
];