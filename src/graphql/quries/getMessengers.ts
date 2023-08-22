import { gql } from "graphql-request";

export const GetMessengersQuery = gql`
  query getMessengers {
    messengers {
      totalCount
      nodes {
        id
        firstName
        lastName
        phone
        email
      }
    }
  }
`;
