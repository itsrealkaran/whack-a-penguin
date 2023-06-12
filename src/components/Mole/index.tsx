import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { MoleContainer, MoleItem } from "./styles";
import { MoleType } from "../Battlefield";

interface MoleProps {
  mole: MoleType;
  onMoleClick: () => void;
}

const Mole = ({ mole, onMoleClick }: MoleProps) => {
  const buttonRef = useRef(null);
  const holeRef = useRef<gsap.core.Tween>();

  const [whacked, setIsWhacked] = useState(false);

  useEffect(() => {
    gsap.set(buttonRef.current, { yPercent: 100 });

    holeRef.current = gsap.to(buttonRef.current, {
      yPercent: 0,
      yoyo: true,
      repeat: -1,
      delay: mole.delay,
      repeatDelay: mole.delay,
      duration: mole.speed,
    });

    return () => {
      if (holeRef.current) holeRef.current.kill();
    };
  }, [mole.delay, mole.speed]);

  useEffect(() => {
    if (whacked) {
      holeRef.current?.pause();
      gsap.to(buttonRef.current, {
        yPercent: 100,
        duration: 0.1,
        onComplete: () => {
          gsap.delayedCall(gsap.utils.random(1, 3), () => {
            setIsWhacked(false);
            holeRef.current
              ?.restart()
              .timeScale(holeRef.current.timeScale() * 1.2);
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
      <MoleItem ref={buttonRef} onClick={handleOnMoleClick} />
    </MoleContainer>
  );
};

export default Mole;
