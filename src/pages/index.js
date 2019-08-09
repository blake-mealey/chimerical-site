import React from "react"
import SplashHeader from "../components/splash-header"

import styled from "styled-components"
import { backgroundColor, textColor, accentColor } from "../colors";
import ProjectsView from "../components/projects-view";
import SEO from "../components/seo";
import "../components/layout.css";

const Main = styled.main`
  display: flex;
  justify-content: center;

  padding-top: 2em;

  color: ${textColor};
  background-color: ${backgroundColor};

  & > article {
    width: 1200px;
    max-width: 1200px;
    display: flex;
    flex-direction: column;
    align-items: center;

    & > h2 {
      margin-bottom: 1.5em;
      text-decoration: underline;
      text-decoration-color: ${accentColor}
    }
  }
`;

const IndexPage = () => (
  <>
    <SEO title="Chimerical"/>

    <SplashHeader/>

    <Main>
      <article>
        <h2>
          Projects by Blake Mealey
        </h2>
        <ProjectsView></ProjectsView>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
      </article>
    </Main>
  </>
);

export default IndexPage
