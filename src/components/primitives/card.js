import React from "react";
import styled from "styled-components";
import { accentColor } from "../../colors";
import SpacedList from "./spaced-list";
import AnchorButton from "./anchor-button";
import MaterialIcon from "./material-icon";
import Tag from "./tag";

const StyledSection = styled.section`
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

  h3 {
    margin-bottom: 0;
  }

  time {
    font-size: 0.8em;
    opacity: 0.8;
  }
`;

const linkTypes = [
  {
    field: `primary`,
    display: <MaterialIcon>arrow_forward</MaterialIcon>
  },
  {
    field: `gitHub`,
    display: `GitHub`
  }
];

const Card = ({ id, title, tags, dates, links, children }) => {
  if (links) {
    links = linkTypes.map(linkType => links[linkType.field] && {
      key: linkType.field,
      url: links[linkType.field],
      display: linkType.display
    });
  }

  return (
    <StyledSection key={id}>
      {title &&
        <header>
          <h3>{title}</h3>
        </header>}

      <SpacedList>
        {dates && dates.map(date => <time title={date.title} dateTime={date.dateTime}> {date.formatted} </time>)
                       .reduce((acc, item, i) => i === 0 ? [item] : [...acc, <span>-</span>, item], [])}
        {tags && tags.sort().map(tag => <Tag tag={tag}/>)}
      </SpacedList>

      {children}

      {links &&
        <SpacedList as="nav">
          {links.map(link => link && <AnchorButton key={link.key} href={link.url}>{link.display}</AnchorButton>)} 
        </SpacedList>}
    </StyledSection>
  );
};

export default Card;
