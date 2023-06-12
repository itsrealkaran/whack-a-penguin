import { Link } from "react-router-dom";
import { NameInput, StartButton, WelcomeContainer } from "./styles";
import { useAppDispatch } from "@/store";
import { setNewGame } from "@/store/slices/game";
import { useState } from "react";
import Button from "../Button";

const Welcome = () => {
  const dispatch = useAppDispatch();
  const [showNameInput, setShowNameInput] = useState(false);
  const [playerName, setPlayerName] = useState("");

  const handleShowName = () => {
    setShowNameInput(true);
  };

  const handleCancel = () => {
    setShowNameInput(false);
    setPlayerName("");
  };

  const handleOnStart = () => {
    dispatch(
      setNewGame({
        playerName,
      })
    );
  };

  return (
    <WelcomeContainer>
      <h1>Whack a mole!</h1>
      {showNameInput ? (
        <NameInput>
          <Button onClick={handleCancel}>
            <span>cancel</span>
          </Button>
          <input
            type="text"
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
      )}
      <Link to="leaderboard">leaderboard</Link>
    </WelcomeContainer>
  );
};

export default Welcome;
