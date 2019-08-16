import { useStaticQuery, graphql } from "gatsby";
import CardDetails from "../components/CardDetails";
import DateModel from "../DateModel";

const getDatesFromStartAndEnd = (startDate, endDate) => {
  return [
    new DateModel(startDate, `Start date`),
    new DateModel(endDate ? endDate : Date.now(), `End date`, !endDate && `Present`)
  ];
};

const useEducationItems = () => {
  const { educationItems } = useStaticQuery(graphql`
    query {
      educationItems: allEducationYaml {
        nodes {
          id
          name
          institution
          description
          startDate
          endDate
        }
      }
    }
  `);

  return educationItems.nodes
    .map(item => new CardDetails({
      id: item.id,
      title: item.name,
      description: item.description,
      dates: getDatesFromStartAndEnd(item.startDate, item.endDate),
      tags: [item.institution]
    }));
};

export default useEducationItems;
