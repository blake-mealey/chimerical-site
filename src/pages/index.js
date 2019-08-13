import React from "react"
import SplashHeader from "../components/splash-header"

import styled from "styled-components"
import { backgroundColor, textColor } from "../colors";
import { useExperienceItems, useEducationItems, useProjectsItems } from "../components/data-hooks";
import SEO from "../components/seo";
import "../components/layout.css";
import Section from "../components/section";
import { CardDetailsView } from "../components/card-details-view";

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
        <CardDetailsView items={useProjectsItems()}/>
      </Section>

      <Section title="Experience">
        <CardDetailsView items={useExperienceItems()}/>
      </Section>

      <Section title="Education">
      <CardDetailsView items={useEducationItems()}/>
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
