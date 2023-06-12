import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { BattlefieldContainer, Field } from "./styles";
import Mole from "../Mole";
import { gsap } from "gsap";

export interface MoleType {
  id: string;
  speed: number;
  delay: number;
}

const Battlefield = () => {
  const MOLES_LENGTH = 12;
  const [molesArray, setMoles] = useState<MoleType[]>([]);
  const [score, setScore] = useState(0);

  const onMoleClick = () => {
    setScore(prevState => prevState + 10);
  };

  useEffect(() => {
    const molesArray = Array.from(Array(MOLES_LENGTH).keys()).map(() => ({
      speed: gsap.utils.random(0.5, 2),
      delay: gsap.utils.random(0.5, 5),
      id: uuidv4(),
    }));

    setMoles(molesArray);
  }, []);

  return (
    <BattlefieldContainer>
      <p>score: {score}</p>
      <Field>
        {molesArray.map((mole, index) => (
          <Mole key={index} mole={mole} onMoleClick={onMoleClick} />
        ))}
      </Field>
    </BattlefieldContainer>
  );
};

export default Battlefield;
