import React from "react"
import { useStaticQuery, graphql } from "gatsby"

const ProjectsView = () => {
  const data = useStaticQuery(graphql`
    query {
      projects: allProjectsYaml {
        nodes {
          id
          name
          description
          github_url
          project_url
        }
      }
    }
  `);

  return (
    <ul>
      {data.projects.nodes.map((project) => (
        <li key={project.id}>{project.name}</li>
      ))}
    </ul>
  );
}

export default ProjectsView
