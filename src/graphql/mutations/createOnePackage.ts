import { gql } from "graphql-request";

export const CreateOnePackage = gql`
  mutation CreateOneDelivery($input: InputCreatePackage!) {
    createDelivery(input: $input) {
      id
      clientId
      guide
    }
  }
`;
