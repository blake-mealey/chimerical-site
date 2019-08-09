import React from "react"
import SplashHeader from "../components/splash-header"

import styled from "styled-components"
import { backgroundColor, textColor } from "../colors";
import ProjectsView from "../components/projects/projects-view";
import ExperiencesView from "../components/experiences-view";
import SEO from "../components/seo";
import "../components/layout.css";
import Section from "../components/section";

const StyledMain = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;

  padding-top: 2em;

  color: ${textColor};
  background-color: ${backgroundColor};
`;

const IndexPage = () => (
  <>
    <SEO title="Chimerical"/>

    <SplashHeader/>

    <StyledMain>
      <Section title="Projects by Blake Mealey">
        <ProjectsView/>
      </Section>

      <Section title="Experience">
        <ExperiencesView/>
      </Section>

      <Section title="Education">
        <p>Coming soon</p>
      </Section>

      <Section title="Skills">
        <p>Coming soon</p>
      </Section>

      <Section title="Achievements">
        <p>Coming soon</p>
      </Section>
    </StyledMain>
  </>
);

export default IndexPage;
