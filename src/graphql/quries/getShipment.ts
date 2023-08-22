import { gql } from "graphql-request";

export const GetShipment = gql`
  query Shipment($id: ID!) {
    shipment(id: $id) {
      id
      messenger {
        id
        firstName
        lastName
        phone
      }
      shipmentStatus {
        id
        status
      }
      warehouseShipment {
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
        instructions
      }
      packages {
        nodes {
          id
          guide
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
          contact {
            firstName
            lastName
            phone
            email
          }
          status {
            status
            id
            description
          }
          evidences {
            nodes {
              id
              personReceived
              comments
              url
              createdAt
            }
          }
        }
      }
    }
  }
`;
