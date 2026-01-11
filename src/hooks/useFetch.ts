import { useEffect, useState } from "react";
import toast from "react-hot-toast";

type FetchState<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
};

export function useFetch<T>(url: string, options?: RequestInit) {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let active = true;

    async function fetchData() {
      try {
        const res = await fetch(url, {
          credentials: "include",
          ...options,
        });

        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error(err.message || "Failed to fetch");
        }

        const json = await res.json();
        if (active) {
          setState({ data: json, loading: false, error: null });
        }
      } catch (err: any) {
        if (active) {
          toast.error(err.message);
          setState({
            data: null,
            loading: false,
            error: err.message,
          });
        }
      }
    }

    fetchData();
    return () => {
      active = false;
    };
  }, [url]);

  return state;
}
