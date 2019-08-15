import { useStaticQuery, graphql } from "gatsby";
import { CardDetails } from "../components/card-details-view";
import DateModel from "../date-model";

const getDatesFromStartAndEnd = (startDate, endDate) => {
  return [
    new DateModel(startDate, `Start date`),
    new DateModel(endDate ? endDate : Date.now(), `End date`, !endDate && `Present`)
  ];
};

const useExperienceItems = () => {
  console.log('useExperienceItems')

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
  `)

  console.log('data:', data);

  return data.experienceItems.nodes
    .map(item =>
      new CardDetails({
        id: item.id,
        title: item.name,
        description: item.description,
        dates: getDatesFromStartAndEnd(item.startDate, item.endDate)
      }))
    .sort((a, b) => a.compare(b));
};

export default useExperienceItems;
