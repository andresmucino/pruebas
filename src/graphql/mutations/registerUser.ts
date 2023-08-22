import { gql } from "graphql-request";

export const RegisterUser = gql`
  mutation registerUser($input: InputRegisterUser!) {
    registerUser(input: $input) {
      url
    }
  }
`;
