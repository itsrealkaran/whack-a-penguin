import styled from "styled-components";
import BackgroundImage from "@assets/bg.jpg";

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
`;
