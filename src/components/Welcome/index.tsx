import { StartButton, WelcomeContainer } from "./styles";

interface WelcomeProps {
  handleOnStart: () => void;
}

const Welcome = ({ handleOnStart }: WelcomeProps) => {
  return (
    <WelcomeContainer>
      <h1>Whack a mole!</h1>
      <StartButton onClick={handleOnStart}>
        <span>start</span>
      </StartButton>
    </WelcomeContainer>
  );
};

export default Welcome;
