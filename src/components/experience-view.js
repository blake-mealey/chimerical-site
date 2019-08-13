import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import CardList from "./primitives/card-list";
import Card from "./primitives/card";
import DateModel from "../date-model";
import marked from "marked";

class ExperienceModel {
    constructor({ id, name, description, startDate, endDate }) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.startDate = new DateModel(startDate, `Start date`);
        this.endDate = new DateModel(endDate ? endDate : Date.now(), `End date`, !endDate && `Present`);
    }
}

const ExperienceView = () => {
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
  `);

  const experienceItems = data.experienceItems.nodes.map(item => new ExperienceModel(item)).sort((a, b) => {
    return a.endDate.date > b.endDate.date ? -1 : a.endDate.date < b.endDate.date ? 1 : 0;
  });

  return (
    <CardList>
      {experienceItems.map(item =>
        <Card id={item.id}
              title={item.name}
              dates={[item.startDate, item.endDate]}>
          <div dangerouslySetInnerHTML={{__html: marked(item.description)}}/>
        </Card>)}
    </CardList>
  );
}

export default ExperienceView;
