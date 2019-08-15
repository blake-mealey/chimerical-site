import React from "react"
import SplashHeader from "../components/SplashHeader"

import styled from "styled-components"
import { backgroundColor, textColor } from "../colors";
import useProjectsItems from "../custom-hooks/useProjectsItems";
import useExperienceItems from "../custom-hooks/useExperienceItems";
import useEducationItems from "../custom-hooks/useEducationItems";
import SEO from "../components/Seo";
import "../components/layout.css";
import Section from "../components/Section";
import CardList from "../components/primitives/CardList";

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
        <CardList items={useProjectsItems()}/>
      </Section>

      <Section title="Experience">
        <CardList items={useExperienceItems()}/>
      </Section>

      <Section title="Education">
        <CardList items={useEducationItems()}/>
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
