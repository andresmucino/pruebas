import { gql } from "graphql-request";

export const CreateWarehouseShipment = gql`
  mutation CreateWarehouseShipment($input: InputCreateWarehouseShipment!) {
    createWarehouseShipment(input: $input) {
      id
    }
  }
`;
