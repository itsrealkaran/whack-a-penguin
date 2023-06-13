import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/store";
import { gameSelector, setIsPlaying } from "@/store/slices/game";
import { addRecord, setNewRecord } from "@/store/slices/leaderboard";
import ButtonLink from "../ButtonLink";
import { FinalScoreContainer } from "./styles";

interface FinalScoreProps {
  score: number;
}

const FinalScore = ({ score }: FinalScoreProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { playerName } = useSelector(gameSelector);

  useEffect(() => {
    if (score > 0) {
      dispatch(
        addRecord({
          playerName,
          score,
        })
      );
    }
  }, []);

  const handleOnPlayAgain = () => {
    dispatch(setIsPlaying(false));
  };

  const handleGoToLeaderboard = () => {
    dispatch(setIsPlaying(false));
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
