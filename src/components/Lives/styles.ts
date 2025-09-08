import styled from "styled-components";
import styles from "@/styles";

export const LivesContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: ${styles.fonts.fontFamily.title};
  font-size: 1.2rem;
  color: ${styles.colors.brown};
  position: absolute;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(255, 255, 255, 0.7);
  border: 2px solid ${styles.colors.brown};
  border-radius: 8px;
  padding: 8px 12px;
  box-shadow: 4px 3px 0 ${styles.colors["yellow-400"]};
  z-index: 2;
`;

export const LivesText = styled.span`
  font-family: ${styles.fonts.fontFamily.title};
  font-size: 1rem;
  color: ${styles.colors.brown};
`;

export const LifeIcon = styled.span`
  font-size: 1.5rem;
  margin: 0 2px;
`;
