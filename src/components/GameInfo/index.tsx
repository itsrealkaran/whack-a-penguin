import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/store';
import { fetchGameStats, leaderboardSelector } from '@/store/slices/leaderboard';
import { useStacks } from '@/contexts/StacksContext';
import { GameInfoContainer, PoolAmount, ConnectionStatus } from './styles';

const GameInfo: React.FC = () => {
  const dispatch = useAppDispatch();
  const { poolAmount, isLoading, error } = useSelector(leaderboardSelector);
  const { isConnected, userData } = useStacks();

  useEffect(() => {
    // Fetch game stats on component mount
    const fetchStats = async () => {
      await dispatch(fetchGameStats());
    };
    
    fetchStats();
    
    // Set up interval to refresh stats every 30 seconds
    const interval = setInterval(fetchStats, 30000);

    return () => clearInterval(interval);
  }, [dispatch]);

  const formatPoolAmount = (amount: number) => {
    if (amount === 0) return '0 μSTX';
    if (amount >= 1_000_000) {
      return `${(amount / 1_000_000).toFixed(2)}M μSTX`;
    }
    if (amount >= 1_000) {
      return `${(amount / 1_000).toFixed(1)}K μSTX`;
    }
    return `${amount} μSTX`;
  };

  const getConnectionText = () => {
    if (!isConnected) return '🔴 Local Mode';
    if (userData?.profile?.stxAddress?.testnet) {
      const address = userData.profile.stxAddress.testnet;
      return `🟢 ${address.slice(0, 4)}...${address.slice(-4)}`;
    }
    return '🟢 Connected';
  };

  return (
    <GameInfoContainer>
      <ConnectionStatus isConnected={isConnected}>
        {getConnectionText()}
      </ConnectionStatus>
      <PoolAmount>
        💰 Prize Pool: {
          error ? 'Error loading' : 
          isLoading ? '...' : 
          formatPoolAmount(typeof poolAmount === 'number' ? poolAmount : 0)
        }
      </PoolAmount>
    </GameInfoContainer>
  );
};

export default GameInfo;
