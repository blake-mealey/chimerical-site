import { useStaticQuery, graphql } from "gatsby";
import CardDetails from "../components/CardDetails";
import DateModel from "../DateModel";

const useAwardsItems = () => {
  const { awardsItems } = useStaticQuery(graphql`
    query {
      awardsItems: allAwardsYaml {
        nodes {
          id
          name
          dates
          links {
            primary
          }
        }
      }
    }
  `);

  return awardsItems.nodes
    .map(item => new CardDetails({
      id: item.id,
      title: item.name,
      dates: item.dates.map(date => new DateModel(date, null, null, { month: undefined })),
      links: item.links
    }));
};

export default useAwardsItems;
