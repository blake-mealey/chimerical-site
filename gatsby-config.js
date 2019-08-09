require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`
});

module.exports = {
  siteMetadata: {
    title: `Gatsby Default Starter`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@gatsbyjs`,
  },
  plugins: [
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `${__dirname}/src/data`,
      }
    },
    `gatsby-transformer-yaml`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Chimerical`,
        short_name: `Chimerical`,
        start_url: `/`,
        background_color: `#1E292C`,
        theme_color: `#1E292C`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-source-github`,
      options: {
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_API_TOKEN}`
        },
        queries: [
          `{
            viewer {
              repositories(first: 100) {
                totalCount
                nodes {
                  name
                  masterBranch: defaultBranchRef {
                    target {
                      ... on Commit {
                        commits: history(first: 1) {
                          nodes {
                            lastUpdated: pushedDate
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }`
        ]
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-144998331-1`,
        head: true
      }
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
