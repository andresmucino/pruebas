import { gql } from "graphql-request";

export const RegisterOneClient = gql`
  mutation RegisterClient($input: InputCreateClient!) {
    registerClient(input: $input) {
      url
    }
  }
`;
