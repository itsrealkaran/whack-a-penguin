import ButtonLink from "../ButtonLink";
import { setIsPlaying } from "@/store/slices/game";
import { useAppDispatch } from "@/store";
import { FinalScoreContainer } from "./styles";

interface FinalScoreProps {
  score: number;
}

const FinalScore = ({ score }: FinalScoreProps) => {
  const dispatch = useAppDispatch();

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
