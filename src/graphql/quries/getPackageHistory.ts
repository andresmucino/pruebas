import { gql } from "graphql-request";

export const GetPackageHistory = gql`
  query GetPackagesHistory(
    $paging: OffsetPaging
    $filter: PackageHistoryFilter
    $sorting: [PackageHistorySort!]
  ) {
    packageHistories(paging: $paging, filter: $filter, sorting: $sorting) {
      nodes {
        id
        idPackage
        status
        description
        createdAt
      }
    }
  }
`;
