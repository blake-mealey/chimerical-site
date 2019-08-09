import React from "react";
import styled from "styled-components";
import { accentColor } from "../../colors";

const StyledTag = styled.span`
  border-radius: 9999em;
  padding: 0.3em;
  background-color: ${accentColor};
  font-size: 0.8em;
  text-transform: lowercase;
`;

const Tag = ({ tag }) => (
  <StyledTag key={tag}>
    {tag}
  </StyledTag>
);

export default Tag;