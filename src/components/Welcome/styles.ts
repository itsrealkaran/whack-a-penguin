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
    font-size: 3rem;
    text-shadow: 5px 4px 2px ${styles.colors["yellow-400"]};
    margin-bottom: 2rem;

    @media (min-width: 1400px) {
      font-size: 6rem;
    }
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
  font-size: 1.125rem;
  letter-spacing: 0.0625rem;
  margin-bottom: 5rem;
  padding: 0.75rem 1.625rem;
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

  @media (min-width: 1400px) {
    font-size: 1.375rem;
    padding: 1rem 2rem;
  }
`;

export const NameInput = styled.div`
  align-items: flex-end;
  display: flex;
  flex-direction: column;
  gap: 8px;
  height: 70px;
  margin-bottom: 4.5rem;

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
    height: 50px;
    width: 100%;

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

  &.error {
    input {
      border-color: ${styles.colors.red};
    }
  }

  @media (min-width: 1400px) {
    flex-direction: row;
    align-items: baseline;

    button {
      width: 80px;
    }
  }
`;
