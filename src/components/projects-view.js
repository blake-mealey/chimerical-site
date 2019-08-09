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
  border-radius: 0 20px 0 20px;
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

const Tag = styled.span`
  border-radius: 9999em;
  padding: 0.3em;
  background-color: ${accentColor};
  font-size: 0.8em;
  text-transform: lowercase;
`;

const ButtonsList = styled.nav`
  & > * {
    margin-right: 10px;
  }
`;

const linkTypes = [
  {
    field: `project`,
    display: `->`
  },
  {
    field: `gitHub`,
    display: `GitHub`
  }
];

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

  class ProjectModel {
    constructor({id, name, description, links, tags}) {
      this.id = id;
      this.name = name;
      this.description = description;
      this.links = links;
      this.tags = tags;

      const repo = data.githubUser.repositories.nodes.find(repo => this.links.gitHub.endsWith(repo.name));
      if (repo) {
        this.lastUpdated = {};
        this.lastUpdated.dateTime = repo.masterBranch.target.commits.nodes[0].lastUpdated;
        this.lastUpdated.date = new Date(this.lastUpdated.dateTime);
        this.lastUpdated.formatted = this.lastUpdated.date.toLocaleDateString(`en-US`, {
          month: `long`,
          year: `numeric`
        });
      }
    }

    render() {
      return (
        <Project key={this.id}>
          <section>
            <header>
              <h1>{this.name}</h1>
            </header>
            <ButtonsList>
              {this.lastUpdated && <time dateTime={this.lastUpdated.dateTime} style={{fontSize: `0.8em`, opacity: 0.8}}>{this.lastUpdated.formatted}</time>}
              {this.tags.sort().map(tag => <Tag key={tag}>{tag}</Tag>)}
            </ButtonsList>
            <p>{this.description}</p>
            <ButtonsList>
              {linkTypes.map(linkType =>
                this.links[linkType.field] && <AnchorButton key={linkType.field} href={this.links[linkType.field]}>
                  {linkType.display}
                </AnchorButton>)}
            </ButtonsList>
          </section>
        </Project>
      );
    }
  }

  const projects = data.projects.nodes.map(project => new ProjectModel(project)).sort((a, b) => {
    return a.lastUpdated.date > b.lastUpdated.date ? -1 : a.lastUpdated.date < b.lastUpdated.date ? 1 : 0;
  });

  return (
    <ProjectsList>
      {projects.map(project => project.render())}
    </ProjectsList>
  );
}

export default ProjectsView;
