import {
  UseMutationOptions,
  UseMutationResult,
  useMutation,
} from "@tanstack/react-query";
import { gql, GraphQLClient } from "graphql-request";

export const useGeneratedMutation = <TMutation, TVariables, TError, TContext>(
  endpoint: string,
  mutation: string,
  options?: UseMutationOptions<TMutation, TError, TVariables, TContext>
): UseMutationResult<TMutation, TError, TVariables, TContext> => {
  const mutationData = useMutation(
    async (variables: TVariables): Promise<TMutation> => {
      const gqlQuery = gql`
        ${mutation}
      `;

      const graphqlUrl = endpoint.endsWith("/graphql")
        ? endpoint
        : `${endpoint}/graphql`;
      const client_ = new GraphQLClient(graphqlUrl);

      try {
        const result = await client_.request<TMutation, TVariables | any>(
          gqlQuery,
          variables
        );

        return result;
      } catch (error: any) {
        if ((error.message as string).includes("Inexistent entity in db")) {
          window.alert("Usuario sin permisos, contacta a Soporte");
        }
        return error;
      }
    },
    options
  );

  return mutationData;
};
