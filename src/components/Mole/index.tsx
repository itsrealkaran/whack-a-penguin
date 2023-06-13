import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { MoleContainer, MoleItem, Teste } from "./styles";
import { MoleType } from "../Battlefield";

interface MoleProps {
  mole: MoleType;
  onMoleClick: () => void;
}

const Mole = ({ mole, onMoleClick }: MoleProps) => {
  const buttonRef = useRef(null);
  const speedRef = useRef(2);
  const holeRef = useRef<gsap.core.Tween>();
  const SPEED_INCREASE = 0.7;

  const [whacked, setIsWhacked] = useState(false);

  useEffect(() => {
    gsap.set(buttonRef.current, { yPercent: 100 });

    holeRef.current = gsap.to(buttonRef.current, {
      yPercent: 0,
      yoyo: true,
      repeat: -1,
      delay: mole.delay,
      duration: mole.speed,
      repeatDelay: mole.delay,
    });

    return () => {
      if (holeRef.current) holeRef.current.kill();
    };
  }, []);

  useEffect(() => {
    if (whacked) {
      holeRef.current?.pause();
      gsap.to(buttonRef.current, {
        yPercent: 100,
        duration: 0.1,
        onStart: () => {
          speedRef.current = speedRef.current * SPEED_INCREASE;
          const speed = gsap.utils.random(0.5, speedRef.current);

          holeRef.current?.duration(speed);
        },
        onComplete: () => {
          gsap.delayedCall(gsap.utils.random(1, 5), () => {
            setIsWhacked(false);
            holeRef.current?.restart();
          });
        },
      });
    }
  }, [whacked]);

  const handleOnMoleClick = () => {
    setIsWhacked(true);
    onMoleClick();
  };

  return (
    <MoleContainer>
      <div>
        <MoleItem ref={buttonRef} onClick={handleOnMoleClick} />
      </div>
    </MoleContainer>
  );
};

export default Mole;
