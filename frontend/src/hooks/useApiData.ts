/**
 * hooks/useApiData.ts
 * ------------------------------------------------------------------
 * Reusable data-fetching hook used by Skills, Projects, and
 * Achievements. Wraps the repetitive "loading / error / data" state
 * pattern so each component only has to write:
 *   const { data, loading, error } = useApiData(api.getProjects);
 * instead of three separate useState calls + a useEffect each.
 * ------------------------------------------------------------------
 */

import { useEffect, useState } from "react";

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export function useApiData<T>(fetcher: () => Promise<T>, deps: unknown[] = []): FetchState<T> {
  const [state, setState] = useState<FetchState<T>>({ data: null, loading: true, error: null });

  useEffect(() => {
    // `cancelled` guards against a race: if the component unmounts (or
    // deps change) before the fetch resolves, we skip the stale update
    // instead of setting state on a component that's no longer there.
    let cancelled = false;
    setState({ data: null, loading: true, error: null });

    fetcher()
      .then((data) => {
        if (!cancelled) setState({ data, loading: false, error: null });
      })
      .catch((err: Error) => {
        if (!cancelled) setState({ data: null, loading: false, error: err.message });
      });

    return () => {
      cancelled = true; // cleanup runs on unmount or before the next effect
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return state;
}
