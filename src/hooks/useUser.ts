"use client";

import { useCallback, useEffect, useState } from "react";

export function useUser() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = useCallback(async () => {
    setLoading(true);

    const res = await fetch("/api/auth/me", {
      credentials: "include",
    });

    if (!res.ok) {
      setUser(null);
    } else {
      const data = await res.json();
      setUser(data && data._id ? data : null);
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return {
    user,
    loading,
    setUser,
    fetchUser,
  };
}
