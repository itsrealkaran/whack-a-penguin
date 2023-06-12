import { useState } from "react";
import Battlefield from "@/components/Battlefield";
import Welcome from "@/components/Welcome";

import { HomeContainer } from "./styles";
import { useAppDispatch } from "@/store";
import { gameSelector, setIsPlaying } from "@/store/slices/game";
import { useSelector } from "react-redux";

const Home = () => {
  const dispatch = useAppDispatch();
  const { isPlaying } = useSelector(gameSelector);

  const handleOnStart = () => {
    dispatch(setIsPlaying(true));
  };

  return (
    <HomeContainer>
      {isPlaying ? <Battlefield /> : <Welcome handleOnStart={handleOnStart} />}
    </HomeContainer>
  );
};

export default Home;
