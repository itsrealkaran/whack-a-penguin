import { useState } from "react";
import Battlefield from "./components/Battlefield";
import GlobalStyle from "./styles/global";
import Header from "./components/Header";
import Welcome from "./components/Welcome";

function App() {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleOnStart = () => {
    setIsPlaying(true);
  };

  return (
    <>
      <GlobalStyle />
      {/* <Header>
        <button onClick={handleOnStart}>{isPlaying ? "Stop" : "Start"}</button>
      </Header> */}

      {isPlaying ? <Battlefield /> : <Welcome handleOnStart={handleOnStart} />}
    </>
  );
}

export default App;
