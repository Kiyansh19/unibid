export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  role: 'student' | 'admin';
}

export interface Bid {
  userId: string;
  username?: string; // Added for UI display convenience
  amount: number;
  timestamp: string;
}

export interface Auction {
  id: string;
  title: string;
  description: string;
  startingPrice: number;
  currentPrice: number;
  minIncrement: number;
  startTime: string;
  endTime: string;
  creatorId: string;
  image: string;
  status: 'upcoming' | 'active' | 'ended';
  bids?: Bid[];
}

export enum SocketEvents {
  JOIN_AUCTION = 'join_auction',
  LEAVE_AUCTION = 'leave_auction',
  PLACE_BID = 'place_bid',
  REPORT_AUCTION = 'report_auction',
  BID_UPDATE = 'bid_update',
  AUCTION_STARTED = 'auction_started',
  AUCTION_ENDED = 'auction_ended',
  ADMIN_NOTIFICATION = 'admin_notification',
  AUCTION_DELETED = 'auction_deleted',
  USER_BANNED = 'user_banned',
}