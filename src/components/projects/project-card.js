import React from "react";
import SpacedList from "../primitives/spaced-list";
import AnchorButton from "../primitives/anchor-button";
import Tag from "../primitives/tag";
import Card from "../primitives/card";

const ProjectCard = ({ project }) => (
  <Card key={project.id}>
    <header>
      <h3>{project.name}</h3>
    </header>
    
    <SpacedList>
      {project.lastUpdated &&
        <time title="Last updated"
              dateTime={project.lastUpdated.dateTime}>
          {project.lastUpdated.formatted}
        </time>}
      {project.tags.sort().map(tag => <Tag tag={tag}/>)}
    </SpacedList>
    
    <p>{project.description}</p>
    
    <SpacedList as="nav">
      {project.links.map(link => link && <AnchorButton key={link.key} href={link.url}>{link.display}</AnchorButton>)}
    </SpacedList>
  </Card>
);

export default ProjectCard;