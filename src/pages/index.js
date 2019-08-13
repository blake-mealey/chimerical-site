import React from "react"
import SplashHeader from "../components/splash-header"

import styled from "styled-components"
import { backgroundColor, textColor } from "../colors";
import ProjectsView from "../components/projects/projects-view";
import ExperienceView from "../components/experience-view";
import EducationView from "../components/education-view";
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
        <ExperienceView/>
      </Section>

      <Section title="Education">
        <EducationView/>
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
