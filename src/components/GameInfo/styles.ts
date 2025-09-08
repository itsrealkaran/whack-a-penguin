import styled from 'styled-components';
import styles from '@/styles';

export const GameInfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 24px;
  margin-bottom: 20px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 12px;
  }
`;

export const ConnectionStatus = styled.div<{ isConnected: boolean }>`
  font-size: 14px;
  font-weight: bold;
  font-family: ${styles.fonts.fontFamily.text};
  color: ${({ isConnected }) => isConnected ? styles.colors["green-100"] : styles.colors.red};
  background: rgba(255, 255, 255, 0.1);
  padding: 8px 16px;
  border-radius: 20px;
  border: 2px solid ${({ isConnected }) => isConnected ? styles.colors["green-100"] : styles.colors.red};
  display: flex;
  align-items: center;
  gap: 6px;
  transition: ${styles.transitions.default};
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

export const PoolAmount = styled.div`
  font-size: 18px;
  font-weight: bold;
  font-family: ${styles.fonts.fontFamily.text};
  color: ${styles.colors.brown};
  background: ${styles.colors["yellow-400"]};
  padding: 12px 20px;
  border-radius: 25px;
  border: 3px solid ${styles.colors.brown};
  box-shadow: 0 4px 0 ${styles.colors.brown};
  transition: ${styles.transitions.default};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 0 ${styles.colors.brown};
  }

  @media (max-width: 768px) {
    font-size: 16px;
    padding: 10px 16px;
  }
`;
