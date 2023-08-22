import { gql } from "graphql-request";

export const AddPackagesToShipments = gql`
  mutation GenerateShipment($input: InputAddPackageShipment!) {
    addPackageShipment(input: $input) {
      id
    }
  }
`;
