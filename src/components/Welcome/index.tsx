import { Link } from "react-router-dom";
import { NameInput, StartButton, WelcomeContainer } from "./styles";
import { useAppDispatch } from "@/store";
import { setNewGame } from "@/store/slices/game";
import { useState } from "react";
import Button from "../Button";
import WalletConnect from "../WalletConnect";
import { useStacks } from "@/contexts/StacksContext";

const Welcome = () => {
  const dispatch = useAppDispatch();
  const { isConnected } = useStacks();
  const [showNameInput, setShowNameInput] = useState(false);
  const [playerName, setPlayerName] = useState("");
  const [inputError, setInputError] = useState(false);

  const handleShowName = () => {
    setShowNameInput(true);
  };

  const handleCancel = () => {
    setShowNameInput(false);
    setInputError(false);
    setPlayerName("");
  };

  const handleOnStart = () => {
    if (playerName.trim() === "") {
      setInputError(true);
      return;
    }

    setInputError(false);
    dispatch(
      setNewGame({
        playerName,
      })
    );
  };

  return (
    <WelcomeContainer>
      <h1>Whack a Penguin!</h1>
      <WalletConnect />
      {isConnected ? (
        showNameInput ? (
          <NameInput className={inputError ? "error" : ""}>
            <Button onClick={handleCancel}>
              <span>cancel</span>
            </Button>
            <input
              type="text"
              placeholder="enter your name"
              value={playerName}
              onChange={e => setPlayerName(e.target.value)}
            />
            <Button onClick={handleOnStart}>
              <span>ok</span>
            </Button>
          </NameInput>
        ) : (
          <StartButton onClick={handleShowName}>
            <span>let's go!</span>
          </StartButton>
        )
      ) : (
        <p style={{ color: 'rgba(255, 255, 255, 0.7)', textAlign: 'center' }}>
          Connect your wallet to start playing!
        </p>
      )}
      <Link to="leaderboard">leaderboard</Link>
    </WelcomeContainer>
  );
};

export default Welcome;
