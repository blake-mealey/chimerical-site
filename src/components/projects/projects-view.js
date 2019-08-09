import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import ProjectModel from "./project-model";
import CardList from "../primitives/card-list";
import Card from "../primitives/card";
import DateModel from "../../date-model";

const ProjectsView = () => {
  const data = useStaticQuery(graphql`
    query {
      projects: allProjectsYaml {
        nodes {
          id
          name
          description
          links {
            primary
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
      {projects.map(project =>
        <Card id={project.id}
              title={project.name}
              tags={project.tags}
              dates={[project.lastUpdated]}
              links={project.links}>
          <p>{project.description}</p>
        </Card>)}
    </CardList>
  );
}

export default ProjectsView;
