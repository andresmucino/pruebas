import {
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";
import { gql, GraphQLClient } from "graphql-request";

export const useGeneratedGQLQuery = <TData, TError, TQuery, TVariables>(
  endpoint: string,
  queryName: string,
  query: string,
  queryVariables?: TVariables,
  options?: UseQueryOptions<TQuery, TError, TData>
): UseQueryResult<TData, TError> => {
  const queryData = useQuery<TQuery, TError, TData>(
    [queryName, queryVariables],
    async (): Promise<TQuery> => {
      const gqlQuery = gql`
        ${query}
      `;

      const graphqlUrl = endpoint.endsWith("/graphql")
        ? endpoint
        : `${endpoint}/graphql`;

      let user: any;

      if (typeof window !== "undefined") {
        user = JSON.parse(window.localStorage.getItem("user") as string);
      }

      if (
        JSON.parse(window.localStorage.getItem("user") as string) === undefined
      ) {
        user = "basictoken";
      }

      const client_ = new GraphQLClient(graphqlUrl, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.stsTokenManager?.accessToken}`,
        },
      });

      try {
        const result = await client_.request<TQuery, TVariables | any>(
          gqlQuery,
          queryVariables
        );

        return result;
      } catch (error: any) {
        error?.response?.errors?.forEach((error: any) => {
          if (error?.message.includes("Context creation failed")) {
            window.alert("No se puede ingresar a la pagina");
          }
        });
        return error;
      }
    },
    options
  );

  return queryData;
};
