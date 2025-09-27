export interface FarcasterUser {
  fid: number;
  username: string;
  displayName: string;
  pfpUrl?: string;
  bio?: string;
  followerCount: number;
  followingCount: number;
}

export interface Cast {
  hash: string;
  text: string;
  timestamp: string;
  author: FarcasterUser;
  embeds?: CastEmbed[];
  reactions?: CastReaction[];
}

export interface CastEmbed {
  url: string;
  title?: string;
  description?: string;
  imageUrl?: string;
}

export interface CastReaction {
  type: 'like' | 'recast' | 'reply';
  count: number;
  userReacted: boolean;
}

export interface GameChallenge {
  id: string;
  challenger: FarcasterUser;
  challenged: FarcasterUser;
  gameUrl: string;
  timestamp: string;
  status: 'pending' | 'accepted' | 'declined' | 'expired';
}

export interface SocialGameEvent {
  type: 'move' | 'check' | 'checkmate' | 'challenge' | 'game_start' | 'game_end';
  gameId: string;
  player: FarcasterUser;
  data: any;
  timestamp: string;
}
