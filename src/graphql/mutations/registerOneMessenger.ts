import { gql } from "graphql-request";

export const RegisterOneMessenger = gql`
  mutation RegisterCourier($input: InputRegisterCourier!) {
    registerCourier(input: $input) {
      url
    }
  }
`;
