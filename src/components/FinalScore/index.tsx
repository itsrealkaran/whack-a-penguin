import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/store";
import { gameSelector, setIsPlaying } from "@/store/slices/game";
import { setNewRecord } from "@/store/slices/leaderboard";
import ButtonLink from "../ButtonLink";
import { FinalScoreContainer } from "./styles";

interface FinalScoreProps {
  score: number;
}

const FinalScore = ({ score }: FinalScoreProps) => {
  const dispatch = useAppDispatch();
  const { playerName } = useSelector(gameSelector);

  useEffect(() => {
    dispatch(
      setNewRecord({
        playerName,
        score,
      })
    );
  }, []);

  const handleOnPlayAgain = () => {
    dispatch(setIsPlaying(false));
  };

  return (
    <FinalScoreContainer>
      <p>Final score: {score}</p>
      <ButtonLink onClick={handleOnPlayAgain}>back home</ButtonLink>
    </FinalScoreContainer>
  );
};

export default FinalScore;
