import { useStaticQuery, graphql } from "gatsby";
import CardDetails from "../components/CardDetails";
import DateModel from "../DateModel";

const getSemesterDate = (dateTime) => {
  const date = new Date(dateTime);
  return new DateModel(dateTime, `Semester`, `${date.getMonth() < 6 ? `Winter` : `Fall`} ${date.getFullYear()}`);
};

const useCoursesItems = () => {
  const { coursesItems } = useStaticQuery(graphql`
    query {
      coursesItems: allCoursesYaml {
        nodes {
          id
          name
          shortName
          institution
          date
          description
          links {
            primary
            gitHub
          }
        }
      }
    }
  `);

  return coursesItems.nodes
    .map(item => new CardDetails({
      id: item.id,
      title: item.name,
      description: item.description,
      dates: [getSemesterDate(item.date)],
      tags: [item.institution, item.shortName],
      links: item.links
    }));
};

export default useCoursesItems;
