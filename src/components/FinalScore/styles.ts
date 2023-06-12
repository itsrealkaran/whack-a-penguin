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
    font-size: 6rem;
    text-shadow: 5px 4px 2px ${styles.colors["yellow-400"]};
    margin-bottom: 2rem;
  }
`;
