import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import ProjectModel from "./project-model";
import ProjectCard from "./project-card";
import CardList from "../basics/card-list";

const ProjectsView = () => {
  const data = useStaticQuery(graphql`
    query {
      projects: allProjectsYaml {
        nodes {
          id
          name
          description
          links {
            project
            gitHub
          }
          tags
        }
      }
      githubUser: githubViewer {
        repositories {
          nodes {
            name
            masterBranch {
              target {
                commits {
                  nodes {
                    lastUpdated
                  }
                }
              }
            }
          }
        }
      }
    }
  `);

  const repositories = data.githubUser.repositories.nodes;
  const projects = data.projects.nodes.map(project => new ProjectModel(project, repositories)).sort((a, b) => {
    return a.lastUpdated.date > b.lastUpdated.date ? -1 : a.lastUpdated.date < b.lastUpdated.date ? 1 : 0;
  });

  return (
    <CardList>
      {projects.map(project => <ProjectCard project={project}/>)}
    </CardList>
  );
}

export default ProjectsView;
