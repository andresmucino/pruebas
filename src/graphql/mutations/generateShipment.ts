import { gql } from "graphql-request";

export const GenerateShipment = gql`
  mutation GenerateShipment($input: InputGenerateShipment!) {
    generateShipment(input: $input) {
      id
    }
  }
`;
