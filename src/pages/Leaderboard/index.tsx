import { leaderboardSelector } from "@/store/slices/leaderboard";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Title,
  LeaderboardContainer,
  Record,
  NoResult,
  RecordList,
} from "./styles";

const Leaderboard = () => {
  const { leaderboard } = useSelector(leaderboardSelector);
  return (
    <LeaderboardContainer>
      <Title>Leaderboard</Title>
      {leaderboard.length > 0 ? (
        <RecordList>
          {leaderboard.map(record => (
            <Record>
              <p>{record.playerName}</p>
              <span>{record.score}</span>
            </Record>
          ))}
        </RecordList>
      ) : (
        <>
          <NoResult>There's nothing here!</NoResult>
        </>
      )}
      <Link to="/">go back</Link>
    </LeaderboardContainer>
  );
};

export default Leaderboard;
