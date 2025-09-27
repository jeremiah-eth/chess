import { useState, useEffect } from 'react';
import { FarcasterUser, SocialGameEvent } from '../types/farcaster';

// Mock Farcaster SDK - replace with actual SDK when available
const mockSDK = {
  actions: {
    ready: async () => {
      console.log('Farcaster SDK ready');
      return Promise.resolve();
    },
    getUser: async (): Promise<FarcasterUser> => {
      return Promise.resolve({
        fid: 12345,
        username: 'chessplayer',
        displayName: 'Chess Player',
        pfpUrl: 'https://example.com/avatar.jpg',
        bio: 'Chess enthusiast',
        followerCount: 100,
        followingCount: 50
      });
    },
    cast: async (text: string, embeds?: any[]) => {
      console.log('Casting:', text, embeds);
      return Promise.resolve({ hash: 'mock-hash', success: true });
    },
    showNotification: async (notification: { title: string; body: string; icon?: string }) => {
      console.log('Notification:', notification);
      return Promise.resolve();
    }
  },
  events: {
    on: (event: string, _callback: (data: any) => void) => {
      console.log('Listening for event:', event);
    }
  }
};

export const useFarcaster = () => {
  const [user, setUser] = useState<FarcasterUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const initializeFarcaster = async () => {
      try {
        await mockSDK.actions.ready();
        const userData = await mockSDK.actions.getUser();
        setUser(userData);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Failed to initialize Farcaster:', error);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    initializeFarcaster();
  }, []);

  const castMove = async (move: string, gameId: string) => {
    try {
      const castText = `♟️ Chess move: ${move} in game ${gameId}`;
      await mockSDK.actions.cast(castText);
      return { success: true };
    } catch (error) {
      console.error('Failed to cast move:', error);
      return { success: false, error };
    }
  };

  const castGameEvent = async (event: SocialGameEvent) => {
    try {
      let castText = '';
      switch (event.type) {
        case 'move':
          castText = `♟️ ${event.player.displayName} played ${event.data.notation}`;
          break;
        case 'check':
          castText = `⚠️ Check! ${event.player.displayName} has the king in check`;
          break;
        case 'checkmate':
          castText = `🏆 Checkmate! ${event.player.displayName} wins!`;
          break;
        case 'challenge':
          castText = `⚔️ Chess challenge from ${event.player.displayName}! Join: ${event.data.gameUrl}`;
          break;
        case 'game_start':
          castText = `♟️ New chess game started between ${event.data.players.join(' vs ')}`;
          break;
        case 'game_end':
          castText = `🏁 Game ended: ${event.data.result}`;
          break;
      }

      await mockSDK.actions.cast(castText);
      return { success: true };
    } catch (error) {
      console.error('Failed to cast game event:', error);
      return { success: false, error };
    }
  };

  const showNotification = async (title: string, body: string, icon?: string) => {
    try {
      await mockSDK.actions.showNotification({ title, body, icon });
      return { success: true };
    } catch (error) {
      console.error('Failed to show notification:', error);
      return { success: false, error };
    }
  };

  const challengeUser = async (_opponentFid: number, gameUrl: string) => {
    try {
      const challengeText = `⚔️ Chess challenge! Play me: ${gameUrl}`;
      await mockSDK.actions.cast(challengeText);
      return { success: true };
    } catch (error) {
      console.error('Failed to challenge user:', error);
      return { success: false, error };
    }
  };

  return {
    user,
    isLoading,
    isAuthenticated,
    castMove,
    castGameEvent,
    showNotification,
    challengeUser
  };
};
