import { gql } from "graphql-request";

export const GetPackages = gql`
  query GetPackages(
    $paging: OffsetPaging
    $filter: PackageFilter
    $sorting: [PackageSort!]
  ) {
    packages(paging: $paging, filter: $filter, sorting: $sorting) {
      nodes {
        id
        guide
        updatedAt
        clientId
        client {
          id
        }
        shipment {
          id
        }
        status {
          id
          status
          description
        }
      }
      totalCount
    }
  }
`;
