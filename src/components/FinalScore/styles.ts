import styles from "@/styles";
import styled from "styled-components";

export const FinalScoreContainer = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  p {
    color: ${styles.colors.brown};
    font-family: ${styles.fonts.fontFamily.title};
    font-size: 3rem;
    text-shadow: 5px 4px 2px ${styles.colors["yellow-400"]};
    margin-bottom: 2rem;
  }

  button {
    margin-bottom: 2rem;
  }

  @media (min-width: 1400px) {
    p {
      font-size: 4rem;
    }
  }
`;

export const ScoreDisplay = styled.h2`
  color: ${styles.colors.brown};
  font-family: ${styles.fonts.fontFamily.title};
  font-size: 4rem;
  text-shadow: 6px 5px 2px ${styles.colors["yellow-400"]};
  margin: 0 0 1rem 0;

  @media (min-width: 1400px) {
    font-size: 5rem;
  }
`;

export const BlockchainStatus = styled.div`
  background: ${styles.colors["yellow-400"]};
  border: 4px solid ${styles.colors.brown};
  border-radius: 12px;
  padding: 1rem 1.5rem;
  margin-bottom: 2rem;
  box-shadow: 6px 5px 0 ${styles.colors["yellow-400"]};

  h3 {
    margin: 0 0 0.75rem 0;
    color: ${styles.colors.brown};
    font-family: ${styles.fonts.fontFamily.title};
    text-shadow: 3px 2px 0 ${styles.colors["yellow-400"]};
  }
`;

export const StatsInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;

  div {
    color: ${styles.colors.brown};
    font-family: ${styles.fonts.fontFamily.text};
    font-size: 1.25rem;
  }
`;