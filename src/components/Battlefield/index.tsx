import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { BattlefieldContainer, Field, Score } from "./styles";
import Mole from "../Mole";
import { gsap } from "gsap";
import ButtonLink from "../ButtonLink";
import Header from "../Header";
import { setIsPlaying } from "@/store/slices/game";
import { useAppDispatch } from "@/store";
import Timer from "../Timer";
import FinalScore from "../FinalScore";

export interface MoleType {
  id: string;
  speed: number;
  delay: number;
}

const Battlefield = () => {
  const MOLES_LENGTH = 12;
  const INCREMENT_SCORE_BY = 10;
  const dispatch = useAppDispatch();

  const [molesArray, setMoles] = useState<MoleType[]>([]);
  const [score, setScore] = useState(0);
  const [hasTimeLeft, setHasTimeLeft] = useState(true);

  const onMoleClick = () => {
    setScore(prevState => prevState + INCREMENT_SCORE_BY);
  };

  useEffect(() => {
    const molesArray = Array.from(Array(MOLES_LENGTH).keys()).map(() => ({
      delay: gsap.utils.random(0.5, 5),
      id: uuidv4(),
      speed: gsap.utils.random(0.5, 2),
    }));

    setMoles(molesArray);
  }, []);

  const handleGoBack = () => {
    dispatch(setIsPlaying(false));
  };

  const onTimesUp = () => {
    setHasTimeLeft(false);
  };

  return (
    <BattlefieldContainer>
      {hasTimeLeft ? (
        <>
          <Header>
            <ButtonLink onClick={handleGoBack}>back</ButtonLink>
            <Timer onTimesUp={onTimesUp} />
            <Score>score: {score}</Score>
          </Header>
          <Field>
            {molesArray.map((mole, index) => (
              <Mole key={index} mole={mole} onMoleClick={onMoleClick} />
            ))}
          </Field>
        </>
      ) : (
        <FinalScore score={score} />
      )}
    </BattlefieldContainer>
  );
};

export default Battlefield;
