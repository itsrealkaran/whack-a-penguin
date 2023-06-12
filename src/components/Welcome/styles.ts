import styled from "styled-components";
import colors from "@/styles/colors";
import fonts from "@/styles/fonts";

export const WelcomeContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;

  h1 {
    color: ${colors.brown};
    font-family: ${fonts.fontFamily.title};
    font-size: 6rem;
    text-shadow: 5px 4px 2px ${colors["yellow-400"]};
    margin-bottom: 2rem;
  }
`;

export const StartButton = styled.button`
  background: ${colors["yellow-400"]};
  border: 3px solid white;
  border-radius: 4px;
  box-shadow: rgba(0, 0, 0, 0.6) 2px 4px 14px 4px;
  color: ${colors.brown};
  cursor: pointer;
  font-family: ${fonts.fontFamily.title};
  font-size: 1.375rem;
  letter-spacing: 1px;
  padding: 1rem 2rem;
  transform: skew(8deg, 4deg) scale(1);
  transition: box-shadow 0.2s ease, transform 0.2s ease;

  span {
    transform: skew(-4deg, -2deg);
  }

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.6) 1px 1px 14px 1px;
    transform: skew(8deg, 4deg) scale(1.05);
  }
`;
