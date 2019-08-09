import React from "react";
import MaterialIcon from "../primitives/material-icon";

const linkTypes = [
  {
    field: `project`,
    display: <MaterialIcon>arrow_forward</MaterialIcon>
  },
  {
    field: `gitHub`,
    display: `GitHub`
  }
];

class ProjectModel {
  constructor({ id, name, tags, description, links }, repositories) {
    this.id = id;
    this.name = name;
    this.tags = tags;
    this.description = description;

    this.links = linkTypes.map(linkType => links[linkType.field] && {
      key: linkType.field,
      url: links[linkType.field],
      display: linkType.display
    });

    const repo = repositories.find(repo => links.gitHub.endsWith(repo.name));
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
};

export default ProjectModel;
