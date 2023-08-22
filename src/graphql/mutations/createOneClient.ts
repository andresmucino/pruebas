import { gql } from "graphql-request";

export const CreateOneClientQuery = gql`
  mutation CreateOneClient($input: CreateOneClientInput!) {
    createOneClient(input: $input) {
      id
    }
  }
`;
