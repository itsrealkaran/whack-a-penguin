import styles from "@/styles";
import styled from "styled-components";

export const Title = styled.h2`
  color: ${styles.colors.brown};
  font-family: ${styles.fonts.fontFamily.title};
  font-size: 4rem;
  text-shadow: 5px 4px 2px ${styles.colors["yellow-400"]};
  margin-bottom: 2rem;
`;

export const LeaderboardContainer = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  padding: 80px;
  flex-direction: column;
`;

export const RecordList = styled.ul`
  list-style: auto;
  margin-bottom: 5rem;
`;

export const Record = styled.li`
  justify-content: center;
  font-size: 1.625rem;
  margin-bottom: 1.25rem;

  p {
    display: inline-block;
    margin-right: 1.25rem;
  }

  span {
    color: ${styles.colors.brown};
  }

  &:first-child {
    font-size: 2.75rem;

    span {
      color: ${styles.colors.red};
    }
  }
`;

export const NoResult = styled.p`
  font-size: 1.375rem;
  margin-bottom: 5rem;
`;
