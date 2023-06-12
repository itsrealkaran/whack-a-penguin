import styled from "styled-components";
import BackgroundImage from "@assets/bg.jpg";
import HammerImage from "@assets/hammer.png";
import styles from "@/styles";

export const BattlefieldContainer = styled.section`
  background: url(${BackgroundImage}) center / cover no-repeat;
  height: 100%;
  position: relative;
`;

export const Field = styled.div`
  display: grid;
  height: 100%;
  padding: 10vh 10vw;
  grid-template-columns: 1fr 1fr 1fr;
  justify-content: center;
  cursor: url(${HammerImage}), pointer;
`;

export const Score = styled.div`
  border: 2px solid white;
  border-radius: 4px;
  font-family: ${styles.fonts.fontFamily.title};
  font-size: 20px;
  padding: 8px 16px;
  text-align: center;
  width: 110px;
`;
