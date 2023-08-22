import { gql } from "graphql-request";

export const CreateMessengerQuery = gql`
  mutation createOnemessenger($input: CreateOneMessengerInput!) {
    createOneMessenger(input: $input) {
      id
    }
  }
`;
