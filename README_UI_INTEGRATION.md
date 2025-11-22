# UniBid UI Integration Guide

This document outlines how to connect the React frontend to the backend (Node/Express + Supabase + Socket.io).

## 1. Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Run locally:
   ```bash
   npm run dev
   ```

## 2. Environment Variables

Create a `.env` file in the root directory for your local build or configure in your deployment pipeline:

```env
VITE_API_BASE_URL=http://localhost:4000/api
VITE_SOCKET_URL=http://localhost:4000
VITE_SUPABASE_URL=your_project_url
VITE_SUPABASE_KEY=your_anon_key
```

## 3. Connecting Supabase

1. Open `src/hooks/useAuth.ts`.
2. Uncomment the import for `supabaseClient` (you need to create `src/services/supabaseClient.ts`).
3. Replace the mock `useEffect` with `supabase.auth.getSession()`.
4. Example usage:
   ```javascript
   const { data: { session } } = await supabase.auth.getSession();
   setUser(session?.user);
   ```

## 4. Connecting Socket.io

1. Open `src/hooks/useSocket.ts`.
2. Uncomment `import { io } from 'socket.io-client'`.
3. In `useEffect`, replace the mock object with:
   ```javascript
   socketRef.current = io(import.meta.env.VITE_SOCKET_URL, {
     transports: ['websocket']
   });
   ```

### Socket Events Contract

**Client -> Server:**
* `join_auction` { auctionId, userId }
* `leave_auction` { auctionId, userId }
* `place_bid` { auctionId, userId, bidAmount, timestamp }

**Server -> Client:**
* `bid_update` { auctionId, bid: { userId, amount, timestamp } }
* `auction_ended` { auctionId, winnerId }

## 5. API Endpoints Required

The UI expects the following JSON endpoints (configure in `src/constants.ts` if paths differ):

* `GET /api/auctions` - List active auctions
* `GET /api/auctions/:id` - Get auction detail
* `POST /api/auctions` - Create auction
  * Body: `{ title, description, startingPrice, minIncrement, startTime, endTime, creatorId }`
* `POST /api/auctions/:id/bid` - (Optional if using pure Sockets, but good for persistence)

## 6. Changing Mock Data

Delete or modify `src/mock/auctions.ts` once the API is live. Update `pages/Home.tsx` and `pages/AuctionDetail.tsx` to `fetch` or `axios.get` from the real API instead of importing `MOCK_AUCTIONS`.
