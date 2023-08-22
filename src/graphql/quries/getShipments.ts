import { gql } from "graphql-request";

export const ShipmentsQuery = gql`
  query getShipments {
    shipments {
      nodes {
        id
        shipmentStatus {
          id
          status
        }
        packages {
          totalCount
        }
        messenger {
          id
        }
        updatedAt
      }
      totalCount
    }
  }
`;
