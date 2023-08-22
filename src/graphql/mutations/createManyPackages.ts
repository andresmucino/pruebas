import { gql } from "graphql-request";

export const CreatePackages = gql`
  mutation CreateOneDelivery($input: InputCreatePackage!) {
    createDelivery(input: $input) {
      id
      clientId
      guide
    }
  }
`;
