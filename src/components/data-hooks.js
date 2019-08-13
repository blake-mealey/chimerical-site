import { useStaticQuery, graphql } from "gatsby"
import { CardDetails } from "./card-details-view";
import DateModel from "../date-model";

const getDatesFromStartAndEnd = (startDate, endDate) => {
  return [
    new DateModel(startDate, `Start date`),
    new DateModel(endDate ? endDate : Date.now(), `End date`, !endDate && `Present`)
  ];
};

export const useProjectsItems = () => {
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

  const getLastUpdatedDateForProject = project => {
    if (project.links && project.links.gitHub) {
      const repo = repositories.find(repo => project.links.gitHub.endsWith(repo.name));
      if (repo) {
        return new DateModel(repo.masterBranch.target.commits.nodes[0].lastUpdated, `Last updated`);
      }
    }
  };

  return data.projects.nodes
    .map(item => new CardDetails({
      id: item.id,
      title: item.name,
      tags: item.tags,
      description: item.description,
      links: item.links,
      dates: [getLastUpdatedDateForProject(item)]
    }))
    .sort((a, b) => a.compare(b));
};

export const useExperienceItems = () => {
  const data = useStaticQuery(graphql`
    query {
      experienceItems: allExperienceYaml {
        nodes {
          id
          name
          description
          startDate
          endDate
        }
      }
    }
  `)

  return data.experienceItems.nodes
    .map(item =>
      new CardDetails({
        id: item.id,
        title: item.name,
        description: item.description,
        dates: getDatesFromStartAndEnd(item.startDate, item.endDate)
      }))
    .sort((a, b) => a.compare(b));
};

export const useEducationItems = () => {
  const data = useStaticQuery(graphql`
    query {
      educationItems: allEducationYaml {
        nodes {
          id
          name
          description
          startDate
          endDate
        }
      }
    }
  `);

  return data.educationItems.nodes
    .map(item => new CardDetails({
      id: item.id,
      title: item.name,
      description: item.description,
      dates: getDatesFromStartAndEnd(item.startDate, item.endDate)
    }))
    .sort((a, b) => a.compare(b));
};
