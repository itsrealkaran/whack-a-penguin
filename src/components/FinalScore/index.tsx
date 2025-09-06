import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/store";
import { resetGame } from "@/store/slices/game";
import { submitScore } from "@/store/slices/leaderboard";
import ButtonLink from "../ButtonLink";
import { FinalScoreContainer } from "./styles";

interface FinalScoreProps {
  score: number;
}

const FinalScore = ({ score }: FinalScoreProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (score > 0) {
      dispatch(
        submitScore(score),
      );
    }
  }, []);

  const handleOnPlayAgain = () => {
    dispatch(resetGame());
  };

  const handleGoToLeaderboard = () => {
    dispatch(resetGame());
    navigate("/leaderboard");
  };

  return (
    <FinalScoreContainer>
      <p>Final score: {score}</p>
      <ButtonLink onClick={handleGoToLeaderboard}>leaderboard</ButtonLink>
      <ButtonLink onClick={handleOnPlayAgain}>back home</ButtonLink>
    </FinalScoreContainer>
  );
};

export default FinalScore;
