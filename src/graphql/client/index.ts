import { API_URL } from "@/common";
import { GraphQLClient } from "graphql-request";

export const graphQLClient = new GraphQLClient(`${API_URL}/graphql`);
