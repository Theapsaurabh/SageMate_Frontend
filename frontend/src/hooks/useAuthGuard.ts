import { useEffect, useState } from "react";
import router from "next/router";

export function useAuthGuard() {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          router.replace("/login");
          return;
        }

        const res = await fetch("http://localhost:5000/user/verify-token", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();

        if (res.ok && data.success) {
          setAuthenticated(true);
        } else {
          localStorage.removeItem("authToken");
          router.replace("/login");
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        localStorage.removeItem("authToken");
        router.replace("/login");
      } finally {
        setLoading(false);
      }
    };

    verifyAuth();
  }, []);

  return { loading, authenticated };
}
