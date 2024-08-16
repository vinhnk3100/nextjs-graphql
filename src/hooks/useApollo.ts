import {
  TypedDocumentNode,
  useSuspenseQuery,
  OperationVariables,
} from "@apollo/client";

export function useApollo<TData, TVariables extends OperationVariables>(
  query: TypedDocumentNode<TData, TVariables>,
  variables?: TVariables
) {
  return useSuspenseQuery<TData, TVariables>(query, { variables });
}
