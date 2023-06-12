import styled from "styled-components";
import ReactResponsiveSpritesheet from "react-responsive-spritesheet";

import MoleBackground from "@assets/sprites.png";

export const MoleContainer = styled.div`
  display: inline-flex;
  height: 150px;
  justify-content: center;
  overflow: hidden;
  position: relative;
  width: 180px;
`;

export const MoleItem = styled.div`
  // background: url(${MoleBackground}) center no-repeat;
  // overflow: hidden;
  // height: 150px;
  // width: 190px;
  // background-position: 0 0;

  width: 180px;
  height: 150px;
  background: red;
`;

export const MoleSprite = styled(ReactResponsiveSpritesheet)`
  width: 160px;
`;
