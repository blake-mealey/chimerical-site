import { useStaticQuery, graphql } from "gatsby";
import { CardDetails } from "../components/CardDetails";
import DateModel from "../DateModel";

const getDatesFromStartAndEnd = (startDate, endDate) => {
  return [
    new DateModel(startDate, `Start date`),
    new DateModel(endDate ? endDate : Date.now(), `End date`, !endDate && `Present`)
  ];
};

const useEducationItems = () => {
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

  return data.educationItems.nodes
    .map(item => new CardDetails({
      id: item.id,
      title: item.name,
      description: item.description,
      dates: getDatesFromStartAndEnd(item.startDate, item.endDate)
    }))
    .sort((a, b) => a.compare(b));
};

export default useEducationItems;
