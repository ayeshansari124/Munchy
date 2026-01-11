import toast from "react-hot-toast";

export async function api<T>(
  url: string,
  options?: RequestInit
): Promise<T | null> {
  const res = await fetch(url, {
    credentials: "include",
    ...options,
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    toast.error(data.message || "Something went wrong");
    return null;
  }

  return res.json();
}
