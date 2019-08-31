import { useStaticQuery, graphql } from "gatsby";
import BubbleChartItem from "../components/BubbleChart/BubbleChartItem";

const useSoftwareItems = () => {
  const { softwareItems, icons } = useStaticQuery(graphql`
    query {
      softwareItems: allSoftwareYaml {
        nodes {
          name
          experience
          color
          iconFileName
        }
      }
      icons: allFile(filter: {relativeDirectory: {eq: "software"}}) {
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

  return softwareItems.nodes
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
