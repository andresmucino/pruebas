import { API_URL } from "@/common";
import { GraphQLClient } from "graphql-request";

export const graphQLClient = new GraphQLClient(`${API_URL}/graphql`);

export const clientGeneric = (apiUrl: string, user: any) => {
  const client = new GraphQLClient(apiUrl, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user?.stsTokenManager?.accessToken}`,
    },
  });
  return client;
};
