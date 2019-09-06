import { useStaticQuery, graphql } from "gatsby";
import CardDetails from "../components/CardDetails";

const columns = [
  {
    title: `Place`,
    align: `:-:`
  },
  {
    title: `Competition`,
    align: `:-`
  },
  {
    title: `Team Size`,
    align: `:-:`
  }
];

const getTeamSizeIcons = (count) => {
  const persons = [];
  for (let i = 0; i < count; i++) {
    persons.push(`<i class="material-icons">person</i>`);
  }
  return persons.join(``);
};

// Based on https://stackoverflow.com/a/13627586
const getOrdinalSuffix = i => {
  const j = i % 10,
        k = i % 100;
  if (j == 1 && k != 11) {
      return `st`;
  }
  if (j == 2 && k != 12) {
      return `nd`;
  }
  if (j == 3 && k != 13) {
      return `rd`;
  }
  return `th`;
}

const useCompetitionsItems = () => {
  const { competitionsItems } = useStaticQuery(graphql`
    query {
      competitionsItems: allCompetitionsYaml {
        nodes {
          id
          name
          year
          place
          teamSize
        }
      }
    }
  `);

  const table = `|${columns.map(c => c.title).join(`|`)}|
    |${columns.map(c => c.align).join(`|`)}|
    ${competitionsItems.nodes
      .sort((a, b) => +b.year - +a.year)
      .map(item => `|<big>${item.place}</big><sup>${getOrdinalSuffix(+item.place)}</sup>|${item.name} ${item.year}|${getTeamSizeIcons(item.teamSize)}|`)
      .join(`\n`)}`;

  return [new CardDetails({
    description: table
  })];
};

export default useCompetitionsItems;
