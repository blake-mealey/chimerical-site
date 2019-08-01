import React from "react"
import SplashHeader from "../components/splash-header"

import styled from "styled-components"
import { backgroundColor } from "../colors";
import ProjectsView from "../components/projects-view";

const Main = styled.main`
  display: flex;
  justify-content: center;

  padding-top: 2em;

  color: white;
  background-color: ${backgroundColor};

  & > * {
    max-width: 1000px;
  }
`;

const IndexPage = () => (
  <>
    <SplashHeader/>

    <Main>
      <article>
        <h1>
          Projects by Blake Mealey
        </h1>
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
)

export default IndexPage
