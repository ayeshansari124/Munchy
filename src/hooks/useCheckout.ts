'use client';

import { useEffect, useState } from "react";

export function useCheckout() {
  const [address, setAddress] = useState({
    phone: "",
    street: "",
    city: "",
    postalCode: "",
    country: "",
  });

  useEffect(() => {
    fetch("/api/me", { credentials: "include" })
      .then(res => res.json())
      .then(user => {
        if (!user) return;
        setAddress({
          phone: user.phone || "",
          street: user.address?.street || "",
          city: user.address?.city || "",
          postalCode: user.address?.postalCode || "",
          country: user.address?.country || "",
        });
      });
  }, []);

  return { address, setAddress };
}
