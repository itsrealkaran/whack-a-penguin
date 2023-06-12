import styled from "styled-components";
import MoleVisible from "@assets/mole-visible.png";
import MoleHidden from "@assets/mole-hidden.png";

export const MoleContainer = styled.div`
  display: inline-flex;
  height: 150px;
  justify-content: center;
  overflow: hidden;
  position: relative;
  width: 180px;
  background: url(${MoleHidden});
`;

export const MoleItem = styled.div`
  background: url(${MoleVisible});
  height: 150px;
  width: 180px;
`;
