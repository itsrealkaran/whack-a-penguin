import styled from "styled-components";
import styles from "@/styles";

export const WelcomeContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;

  h1 {
    color: ${styles.colors.brown};
    font-family: ${styles.fonts.fontFamily.title};
    font-size: 6rem;
    text-shadow: 5px 4px 2px ${styles.colors["yellow-400"]};
    margin-bottom: 2rem;
  }
`;

export const StartButton = styled.button`
  background: ${styles.colors["yellow-400"]};
  border: 3px solid white;
  border-radius: 4px;
  box-shadow: rgba(0, 0, 0, 0.6) 2px 4px 14px 4px;
  color: ${styles.colors.brown};
  cursor: pointer;
  font-family: ${styles.fonts.fontFamily.title};
  font-size: 1.375rem;
  letter-spacing: 0.0625rem;
  margin-bottom: 5rem;
  padding: 1rem 2rem;
  transform: skew(8deg, 4deg) scale(1);
  transition: box-shadow ${styles.transitions.default},
    transform ${styles.transitions.default};

  span {
    transform: skew(-4deg, -2deg);
  }

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.6) 1px 1px 14px 1px;
    transform: skew(8deg, 4deg) scale(1.05);
  }
`;

export const NameInput = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 4.5rem;
  height: 70px;

  input {
    border: 2px solid ${styles.colors.brown};
    border-radius: 4px;
    box-shadow: none;
    font-family: ${styles.fonts.fontFamily.title};
    font-size: 18px;
    align-self: flex-start;
    height: 50px;
    outline: none;
    padding: 8px 16px;
    transition: border-color ${styles.transitions.default};

    &:focus {
      border-color: ${styles.colors["yellow-400"]};
    }
  }

  button {
    align-self: flex-start;
    height: 50px;

    &:first-child {
      &:hover {
        background-color: ${styles.colors.red};
        transform: skew(-8deg, -4deg);
      }
    }

    &:last-child {
      &:hover {
        background-color: ${styles.colors.blue};
        transform: skew(8deg, 4deg);
      }
    }
  }
`;
