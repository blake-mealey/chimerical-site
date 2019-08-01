import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import styled from "styled-components"

import BackgroundImage from "gatsby-background-image"
import { backgroundColor } from "../colors";

const termsSpacing = `20px`
const StyledHeader = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;

  h1 {
    font-size: 10rem;
  }

  ul {
    display: flex;
    padding: 0px ${termsSpacing};
    margin-top: -2rem;

    li {
      list-style-type: none;
      margin: 0px ${termsSpacing};
    }
  }

  p {
    font-size: 1.25rem;
  }
`;

const SplashHeader = () => {
  const data = useStaticQuery(graphql`
    query {
      splashImage: file(relativePath: { eq: "splash-2.jpg" }) {
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
    <BackgroundImage
      preserveStackingContext={true}
      fluid={fluidImageStack}
      style={{
        width: `100%`,
        height: `100vh`,
        display: `flex`,
        alignItems: `center`,
        justifyContent: `center`,
      }}
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
    </BackgroundImage>
  )
}

export default SplashHeader
