import { gql } from "graphql-request";

export const ChangeShipmentStatus = gql`
  mutation ChangeShipmentStatus($input: SetShipmentStatusOnShipmentInput!) {
    setShipmentStatusOnShipment(input: $input) {
      id
    }
  }
`;
