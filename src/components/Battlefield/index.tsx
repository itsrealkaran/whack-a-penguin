import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { BattlefieldContainer, Field, Score } from "./styles";
import Mole from "../Mole";
import { gsap } from "gsap";
import ButtonLink from "../ButtonLink";
import Header from "../Header";
import { incrementScore, loseLife, setIsPlaying } from "@/store/slices/game";
import { useAppDispatch } from "@/store";
import { useSelector } from "react-redux";
import Lives from "../Lives";
import FinalScore from "../FinalScore";
import gameConfig from "@gameconfig/index";
import { playGame, fetchGameStats } from "@/store/slices/leaderboard";
import { useStacks } from "@/contexts/StacksContext";
import GameInfo from "../GameInfo";

export interface MoleType {
  id: string;
  delay: number;
  speed: number;
}

const Battlefield = () => {
  const dispatch = useAppDispatch();
  const { lives, score } = useSelector((state: any) => state.gameReducer);
  const { isConnected } = useStacks();

  const [molesArray, setMoles] = useState<MoleType[]>([]);
  const [gameOver, setGameOver] = useState(false);

  const onMoleClick = async () => {
    // Increment local score first for immediate feedback
    dispatch(incrementScore(gameConfig.INCREMENT_SCORE_BY));
    
    // If wallet is connected, also play on blockchain
    if (isConnected) {
      try {
        await dispatch(playGame());
        // Refresh game stats after successful play
        dispatch(fetchGameStats());
      } catch (error) {
        console.error('Error playing on blockchain:', error);
        // Don't revert local score, let user continue playing locally
      }
    }
  };

  const onEmptyHoleClick = () => {
    dispatch(loseLife());
  };

  useEffect(() => {
    const molesArray = Array.from(Array(gameConfig.MOLES_COUNT).keys()).map(
      () => ({
        delay: gsap.utils.random(0.1, 0.3),
        id: uuidv4(),
        speed: gsap.utils.random(0.05, 0.2),
      })
    );

    setMoles(molesArray);
  }, []);

  const handleGoBack = () => {
    dispatch(setIsPlaying(false));
  };

  useEffect(() => {
    if (lives <= 0) {
      setGameOver(true);
    }
  }, [lives]);

  return (
    <BattlefieldContainer data-testid="battlefield">
      {!gameOver ? (
        <>
          <Header>
            <ButtonLink onClick={handleGoBack}>back</ButtonLink>
            <Score>score: {score}</Score>
          </Header>
          <GameInfo />
          <Field data-testid="field">
            {molesArray.map((mole, index) => (
              <Mole 
                key={index} 
                mole={mole} 
                onMoleClick={onMoleClick}
                onEmptyHoleClick={onEmptyHoleClick}
              />
            ))}
          </Field>
          <Lives />
        </>
      ) : (
        <FinalScore score={score} />
      )}
    </BattlefieldContainer>
  );
};

export default Battlefield;
