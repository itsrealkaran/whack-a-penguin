import styled from "styled-components";
import MoleVisible from "@assets/mole-visible.png";
import MoleHidden from "@assets/mole-hidden.png";
import Hammer from "@assets/hammer.png";

export const MoleContainer = styled.div`
  height: 90px;
  justify-content: center;
  position: relative;
  width: 100%;
  cursor: url(${Hammer}), auto;

  &::after {
    background: url(${MoleHidden}) center bottom / contain no-repeat;
    bottom: -18px;
    content: "";
    height: 30px;
    justify-content: center;
    position: absolute;
    width: 100%;
    z-index: 2;
  }

  > div {
    overflow: hidden;
    position: relative;
    width: 100%;
    height: 100%;
  }

  @media (min-width: 1400px) {
    height: 150px;
    width: 180px;

    &::after {
      height: 70px;
    }
  }
`;

export const MoleItem = styled.div`
  background: url(${MoleVisible}) 2px 5px / contain no-repeat;
  bottom: -6px;
  height: 70px;
  position: absolute;
  width: 70px;
  z-index: 1;
  cursor: url(${Hammer}), auto;

  @media (min-width: 1400px) {
    background-position: 25px 5px;
    bottom: 20px;
    height: 110px;
    width: 165px;
    cursor: url(${Hammer}), auto;
  }
`;
