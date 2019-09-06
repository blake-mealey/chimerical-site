import { useStaticQuery, graphql } from "gatsby";
import BubbleChartItem from "../components/BubbleChart/BubbleChartItem";

const useSoftwareItems = () => {
  const { techItems, icons } = useStaticQuery(graphql`
    query {
      techItems: allTechYaml {
        nodes {
          name
          experience
          color
          iconFileName
        }
      }
      icons: allFile(filter: {relativeDirectory: {eq: "tech"}}) {
        nodes {
          fileName: base
          childImageSharp {
            fixed {
              src
            }
          }
        }
      }
    }
  `);

  return techItems.nodes
    .map(item => {
      const iconNode = icons.nodes.find(node => node.fileName === item.iconFileName);
      let imageUrl;
      if (iconNode) {
        imageUrl = iconNode.childImageSharp.fixed.src;
      }

      return new BubbleChartItem({
        label: item.name,
        value: item.experience,
        color: item.color,
        imageUrl
      });
    });
};

export default useSoftwareItems;
