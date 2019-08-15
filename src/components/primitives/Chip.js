import React from "react";
import styled from "styled-components";
import { accentColor } from "../../colors";

const StyledChip = styled.span`
  border-radius: 9999em;
  padding: 0.3em;
  background-color: ${accentColor};
  font-size: 0.8em;
  text-transform: lowercase;
`;

const Chip = ({ text }) => (
  <StyledChip key={text}>
    {text}
  </StyledChip>
);

export default Chip;