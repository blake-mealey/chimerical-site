import DateModel from "../../date-model";

class ProjectModel {
  constructor({ id, name, tags, description, links }, repositories) {
    this.id = id;
    this.name = name;
    this.tags = tags;
    this.description = description;
    this.links = links;

    if (this.links && this.links.gitHub) {
      const repo = repositories.find(repo => this.links.gitHub.endsWith(repo.name));
      if (repo) {
        this.lastUpdated = new DateModel(repo.masterBranch.target.commits.nodes[0].lastUpdated, `Last updated`);
      }
    }
  }
};

export default ProjectModel;
