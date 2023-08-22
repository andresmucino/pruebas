import { gql } from "graphql-request";

export const GetWarehouseShipments = gql`
  query WarehouseShipments(
    $paging: OffsetPaging
    $filter: WarehouseShipmentFilter
    $sorting: [WarehouseShipmentSort!]
  ) {
    warehouseShipments(filter: $filter, paging: $paging, sorting: $sorting) {
      totalCount
      nodes {
        id
        instructions
        createdAt
        updatedAt
        contact {
          firstName
          lastName
          phone
          email
        }
        direction {
          street
          neigthboorhood
          municipality
          state
          externalNumber
          internalNumber
          zipCode
          latitude
          longitude
        }
        client {
          id
          firstName
          lastName
          phone
          email
        }
      }
    }
  }
`;
