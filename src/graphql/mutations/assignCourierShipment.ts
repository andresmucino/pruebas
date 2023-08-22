import { gql } from "graphql-request";

export const AssignCourierShipment = gql`
  mutation AssignCourierShipment($input: InputAssignCourier!) {
    assignCourierShipment(input: $input) {
      id
    }
  }
`;
