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

const ExperiencesView = () => {
  const data = useStaticQuery(graphql`
    query {
      experiences: allExperiencesYaml {
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

  const experiences = data.experiences.nodes.map(experience => new ExperienceModel(experience)).sort((a, b) => {
    return a.endDate.date > b.endDate.date ? -1 : a.endDate.date < b.endDate.date ? 1 : 0;
  });

  return (
    <CardList>
      {experiences.map(experience =>
        <Card id={experience.id}
              title={experience.name}
              dates={[experience.startDate, experience.endDate]}>
          <div dangerouslySetInnerHTML={{__html: marked(experience.description)}}/>
        </Card>)}
    </CardList>
  );
}

export default ExperiencesView;
