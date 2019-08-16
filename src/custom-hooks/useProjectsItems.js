import { useStaticQuery, graphql } from "gatsby";
import CardDetails from "../components/CardDetails";
import DateModel from "../DateModel";

const useProjectsItems = () => {
  const { projects, githubUser } = useStaticQuery(graphql`
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

  const repositories = githubUser.repositories.nodes;

  const getLastUpdatedDateForProject = project => {
    if (project.links && project.links.gitHub) {
      const repo = repositories.find(repo => project.links.gitHub.endsWith(repo.name));
      if (repo) {
        return new DateModel(repo.masterBranch.target.commits.nodes[0].lastUpdated, `Last updated`);
      }
    }
  };

  return projects.nodes
    .map(item => new CardDetails({
      id: item.id,
      title: item.name,
      tags: item.tags,
      description: item.description,
      links: item.links,
      dates: [getLastUpdatedDateForProject(item)]
    }));
};

export default useProjectsItems;
