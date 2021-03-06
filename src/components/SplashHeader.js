import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import styled from "styled-components"

import BackgroundImage from "gatsby-background-image"
import { backgroundColor, textColor, accentColor } from "../colors";
import MaterialIcon from "./primitives/MaterialIcon";

const termsSpacing = `20px`
const StyledHeader = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${textColor};

  transition: 0.2s;

  @media (max-width: 900px) {
    font-size: 75%
  }

  @media (max-width: 700px) {
    font-size: 30%
  }

  ul {
    display: flex;
    padding: 0px ${termsSpacing};
    margin-left: 0;
    margin-top: -2rem;

    li {
      list-style-type: none;
      margin: 0px ${termsSpacing};
    }
  }

  p {
    font-size: 1.25em;
  }
`;

const StyledBackgroundImage = styled(BackgroundImage)`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .down-arrow {
    color: ${textColor};
    font-size: 2em;
    position: absolute;
    bottom: 1em;

    transition: 0.2s;

    &:hover {
      color: ${accentColor};
      transform: scale(1.5)
    }
  }
`;

const SplashHeader = () => {
  const data = useStaticQuery(graphql`
    query {
      splashImage: file(relativePath: { eq: "splash.jpg" }) {
        childImageSharp {
          fluid(quality: 100, maxWidth: 2000) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `);

  const fluidImageStack = [
    data.splashImage.childImageSharp.fluid,
    `linear-gradient(rgba(0,0,0,0) 80%, ${backgroundColor} 100%)`
  ].reverse();

  return (
    <StyledBackgroundImage
      preserveStackingContext={true}
      fluid={fluidImageStack}
    >
      <StyledHeader>
        <h1>Chimerical</h1>
        <ul>
          <li>adjective</li>
          <li>chi·me·ri·cal</li>
          <li>\kī-ˈmer-i-kəl\</li>
        </ul>
        <p>existing only as the product of unchecked imagination</p>
      </StyledHeader>
      <Link to="#"><MaterialIcon className='down-arrow'>keyboard_arrow_down</MaterialIcon></Link>
    </StyledBackgroundImage>
  )
}

export default SplashHeader
