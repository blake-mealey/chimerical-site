import React from "react";
import SpacedList from "../basics/spaced-list";
import AnchorButton from "../basics/anchor-button";
import Tag from "../basics/tag";
import Card from "../basics/card";

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