import styled from "styled-components";
import { accentColor } from "../../colors";

// TODO: Add metadata/auto-structuring?
const Card = styled.section`
  border-radius: 0 20px 0 20px;
  border: 4px solid;
  list-style-type: none;
  padding: 20px;
  margin: 20px;

  transition: 0.2s;

  &:hover {
    background-color: ${accentColor.rgba(0.1)};
    border-color: ${accentColor};
    transform: scale(1.1);
  }

  h3 {
    margin-bottom: 0;
  }

  time {
    font-size: 0.8em;
    opacity: 0.8;
  }
`;

export default Card;