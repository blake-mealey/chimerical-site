import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import AnchorButton from "../components/styled/anchor-button";
import { accentColor } from "../colors";

import styled from "styled-components";

const ProjectsList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: none;
`;

const Project = styled.li`
  border-radius: 20px;
  border: 4px solid;
  list-style-type: none;
  padding: 20px;
  margin: 20px;

  transition: 0.2s;

  &:hover {
    background-color: ${accentColor.rgba(0.1)};
    border-color: ${accentColor};
    transform: scale(1.1);
  }
`;

const ButtonsList = styled.div`
  & > * {
    margin-right: 10px;
  }
`;

const ProjectsView = () => {
  const data = useStaticQuery(graphql`
    query {
      projects: allProjectsYaml {
        nodes {
          id
          name
          description
          gitHubUrl
          projectUrl
        }
      }
    }
  `);

  return (
    <ProjectsList>
      {data.projects.nodes.map((project) => (
        <Project key={project.id}>
          <section>
            <header>
              <h1>{project.name}</h1>
            </header>
            <p>{project.description}</p>
            <ButtonsList>
              <AnchorButton href={project.projectUrl}>-></AnchorButton>
              <AnchorButton href={project.gitHubUrl}>GitHub</AnchorButton>
            </ButtonsList>
          </section>
        </Project>
      ))}
    </ProjectsList>
  );
}

export default ProjectsView
