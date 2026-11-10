import type { ReactNode } from 'react';
import type { UseQueryResult } from '@tanstack/react-query';
import { ErrorState } from '../error-state';

interface Props<T> {
  query: UseQueryResult<T>;
  skeleton: ReactNode;
  children: (data: T) => ReactNode;
}

/** Skeleton while loading, an Arabic error with retry on failure, else the data. */
export function QueryBoundary<T>({ query, skeleton, children }: Props<T>) {
  if (query.isPending) return <>{skeleton}</>;
  if (query.isError && query.data === undefined) {
    return <ErrorState error={query.error} onRetry={() => void query.refetch()} />;
  }
  return <>{query.data === undefined ? null : children(query.data)}</>;
}
