'use client';
import { useEffect, useState } from "react";

export function useRefresh() {
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    async function refresh() {
      try {
        const res = await fetch("/api/auth/refresh", {
          method: "POST",
          credentials: "include",
        });

        if (res.ok) setLoggedIn(true);
        else setLoggedIn(false);

      } catch (err) {
        setLoggedIn(false);
      } finally {
        setLoading(false);
      }
    }

    refresh();
  }, []);

  return { loading, isLoggedIn };
}
