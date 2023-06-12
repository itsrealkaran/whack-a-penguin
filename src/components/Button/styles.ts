import styles from "@/styles";
import styled from "styled-components";

export const ButtonContainer = styled.button`
  border: 2px solid ${styles.colors.brown};
  border-radius: 4px;
  background-color: ${styles.colors.white};
  color: ${styles.colors.brown};
  cursor: pointer;
  font-family: ${styles.fonts.fontFamily.title};
  font-size: 20px;
  letter-spacing: 1px;
  width: 80px;
  transition: all ${styles.transitions.default};

  &:hover {
    color: ${styles.colors.white};
  }
`;
