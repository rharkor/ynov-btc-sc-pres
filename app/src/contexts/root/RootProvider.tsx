import { useEffect, useState } from "react";
import { RootContext } from "./RootContext";

export function RootProvider({ children }: { children: React.ReactNode }) {
  const [admin, setAdmin] = useState(false);

  const checkAdmin = async (adminPassword: string) => {
    const worked = await fetch(import.meta.env.VITE_API_URL + "/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: adminPassword }),
    })
      .then((res) => res?.ok)
      .catch(() => false);
    if (worked) {
      setAdmin(true);
    } else {
      setAdmin(false);
      localStorage.removeItem("adminPassword");
    }
  };

  useEffect(() => {
    const adminPassword = localStorage.getItem("adminPassword");
    if (!adminPassword) return;
    checkAdmin(adminPassword);
  }, []);

  return (
    <RootContext.Provider
      value={{
        admin,
        setAdmin,
      }}
    >
      {children}
    </RootContext.Provider>
  );
}
