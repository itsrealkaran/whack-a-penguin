import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/store";
import { resetGame } from "@/store/slices/game";
import { fetchGameStats, leaderboardSelector } from "@/store/slices/leaderboard";
import { useStacks } from "@/contexts/StacksContext";
import ButtonLink from "../ButtonLink";
import { FinalScoreContainer } from "./styles";

interface FinalScoreProps {
  score: number;
}

const FinalScore = ({ score }: FinalScoreProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { poolAmount, leaderboard } = useSelector(leaderboardSelector);
  // Safely access Stacks context; fall back to disconnected state if provider is absent
  let isConnected = false as boolean;
  let userData: any = null;
  try {
    const stacks = useStacks();
    isConnected = stacks.isConnected;
    userData = stacks.userData;
  } catch (_err) {
    // No provider in context (e.g., during tests); proceed as disconnected
  }

  useEffect(() => {
    // Refresh leaderboard data when game ends (only when connected)
    if (isConnected) {
      dispatch(fetchGameStats());
    }
  }, [dispatch, isConnected]);

  const handleOnPlayAgain = () => {
    dispatch(resetGame());
  };

  const handleGoToLeaderboard = () => {
    dispatch(resetGame());
    navigate("/leaderboard");
  };

  const getUserRank = () => {
    if (!isConnected || !userData?.profile?.stxAddress?.testnet) return null;
    
    const userAddress = userData.profile.stxAddress.testnet;
    const userIndex = leaderboard.findIndex((entry: any) => entry.player === userAddress);
    return userIndex !== -1 ? userIndex + 1 : null;
  };

  const userRank = getUserRank();

  return (
    <FinalScoreContainer>
      <h2>Game Over!</h2>
      <p>Final score: {score} hits</p>
      
      {isConnected && (
        <div>
          <h3>🎯 Blockchain Stats</h3>
          <div>
            <div>Prize Pool: {typeof poolAmount === 'number' ? poolAmount : 0} μSTX</div>
            {userRank && (
              <div>Your Rank: #{userRank}</div>
            )}
            <div>Mode: On-chain</div>
          </div>
        </div>
      )}
      
      {!isConnected && (
        <div>
          <h3>🎮 Local Game</h3>
          <div>
            <div>Connect wallet for blockchain rewards!</div>
          </div>
        </div>
      )}

      <ButtonLink onClick={handleGoToLeaderboard}>view leaderboard</ButtonLink>
      <ButtonLink onClick={handleOnPlayAgain}>play again</ButtonLink>
    </FinalScoreContainer>
  );
};

export default FinalScore;
