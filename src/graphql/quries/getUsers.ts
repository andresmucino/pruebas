import { gql } from "graphql-request";

export const GetQueryUsers = gql`
  query GetUsers(
    $paging: OffsetPaging
    $filter: UserFilter
    $sorting: [UserSort!]
  ) {
    users(paging: $paging, filter: $filter, sorting: $sorting) {
      nodes {
        id
        firstName
        lastName
        phone
        email
      }
      totalCount
    }
  }
`;
