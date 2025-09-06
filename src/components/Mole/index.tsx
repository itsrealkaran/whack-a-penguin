import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { MoleContainer, MoleItem } from "./styles";
import { MoleType } from "../Battlefield";
import gameConfig from "@/game-config";

interface MoleProps {
  mole: MoleType;
  onMoleClick: () => void;
  onEmptyHoleClick: () => void;
}

const Mole = ({ mole, onMoleClick, onEmptyHoleClick }: MoleProps) => {
  const buttonRef = useRef<HTMLDivElement>(null);
  const speedRef = useRef(2);
  const moleRef = useRef<gsap.core.Tween>();

  const [whacked, setIsWhacked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isHitting, setIsHitting] = useState(false);

  useEffect(() => {
    gsap.set(buttonRef.current, { yPercent: 100 });

    moleRef.current = gsap.to(buttonRef.current, {
      yPercent: 0,
      yoyo: true,
      repeat: -1,
      delay: mole.delay,
      duration: mole.speed,
      repeatDelay: mole.delay,
      onStart: () => setIsVisible(true),
      onReverseComplete: () => setIsVisible(false),
    });

    return () => {
      if (moleRef.current) moleRef.current.kill();
    };
  }, []);

  useEffect(() => {
    if (whacked) {
      moleRef.current?.pause();
      gsap.to(buttonRef.current, {
        yPercent: 100,
        duration: 0.1,
        onStart: () => {
          speedRef.current = speedRef.current * gameConfig.SPEED_INCREASE;
          const speed = gsap.utils.random(0.5, speedRef.current);

          moleRef.current?.duration(speed);
        },
        onComplete: () => {
          gsap.delayedCall(gsap.utils.random(1, 5), () => {
            setIsWhacked(false);
            moleRef.current?.restart();
          });
        },
      });
    }
  }, [whacked]);

  const handleOnMoleClick = () => {
    // Show hit animation
    setIsHitting(true);
    
    // Change cursor to hammer2 on every hit
    document.body.style.cursor = 'url(/src/assets/hammer2.png), auto';
    
    if (isVisible && !whacked) {
      setIsWhacked(true);
      onMoleClick();
    } else {
      onEmptyHoleClick();
    }
    
    // Reset hit animation after a short delay
    setTimeout(() => {
      setIsHitting(false);
      // Reset cursor back to normal hammer
      document.body.style.cursor = 'url(/src/assets/hammer.png), auto';
    }, 200);
  };

  return (
    <MoleContainer 
      onClick={handleOnMoleClick} 
      data-testid="hole"
      isHitting={isHitting}
    >
      <div>
        <MoleItem
          ref={buttonRef}
          data-testid="mole"
        />
      </div>
    </MoleContainer>
  );
};

export default Mole;
