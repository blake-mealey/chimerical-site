import React from "react";
import styled from "styled-components";
import { accentColor } from "../colors";

const maxWidth = `1100px`;
const StyledArticle = styled.article`
    width: ${maxWidth};
    max-width: ${maxWidth};
    display: flex;
    flex-direction: column;
    align-items: center;

    & > h2 {
        margin-bottom: 1.5em;
        text-decoration: underline;
        text-decoration-color: ${accentColor}
    }
`;

const Section = ({ title, children }) => (
    <StyledArticle>
        <h2>{title}</h2>
        {children}
    </StyledArticle>
);

export default Section;
