import styled from "styled-components";
import { textColor, accentColor } from "../../colors";
import { OutboundLink } from "gatsby-plugin-google-analytics";

const AnchorButton = styled(OutboundLink)`
  text-decoration: none;
  color: ${textColor};
  border-radius: 10px;
  padding: 10px;
  border: 2px solid;

  transition: 0.2s;

  display: inline-block;

  &:hover {
    background-color: ${accentColor.rgba(0.1)};
    border-color: ${accentColor};
    transform: translate(0, -0.1em);
  }
`;

export default AnchorButton;
