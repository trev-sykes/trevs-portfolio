import { GraphQLClient, gql } from 'graphql-request';

const endpoint = 'https://api.github.com/graphql';

const graphQLClient = new GraphQLClient(endpoint, {
  headers: {
    authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
  },
});

export const GET_CONTRIBUTIONS = gql`
  query Contributions($username: String!) {
    user(login: $username) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
              color
            }
          }
        }
      }
    }
  }
`;

export const fetchContributions = async (username: any) => {
  const data = await graphQLClient.request(GET_CONTRIBUTIONS, { username });
  return data.user.contributionsCollection.contributionCalendar;
};
