import { gql } from "graphql-request";

export const CreateManyPackages = gql`
  mutation createDeliveries($input: InputCreatePackages!) {
    createDeliveries(input: $input) {
      id
      guide
    }
  }
`;
