import React from "react";

import styled from "styled-components";

const StyledI = styled.i`
    font-size: initial;
`;

const MaterialIcon = ({ children, className }) => (
    <StyledI className={`${className} material-icons`}>{children}</StyledI>
);

export default MaterialIcon;