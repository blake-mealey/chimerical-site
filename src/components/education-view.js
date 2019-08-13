import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import CardList from "./primitives/card-list";
import Card from "./primitives/card";
import DateModel from "../date-model";
import marked from "marked";

class EducationModel {
    constructor({ id, name, description, startDate, endDate }) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.startDate = new DateModel(startDate, `Start date`);
        this.endDate = new DateModel(endDate ? endDate : Date.now(), `End date`, !endDate && `Present`);
    }
}

const EducationView = () => {
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

  const educationItems = data.educationItems.nodes.map(item => new EducationModel(item)).sort((a, b) => {
    return a.endDate.date > b.endDate.date ? -1 : a.endDate.date < b.endDate.date ? 1 : 0;
  });

  return (
    <CardList>
      {educationItems.map(item =>
        <Card id={item.id}
              title={item.name}
              dates={[item.startDate, item.endDate]}>
          <div dangerouslySetInnerHTML={{__html: marked(item.description)}}/>
        </Card>)}
    </CardList>
  );
}

export default EducationView;
