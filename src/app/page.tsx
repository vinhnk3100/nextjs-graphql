"use client";

import useGetCurrentUser from "@/hooks/useCurrentUser";

export default function Home() {
  const { user, loading, error } = useGetCurrentUser();
  console.log('User: ', user);
  if (user) {
    return <p>Authenticated as {user.username}</p>;
  }
  return (
    <div className="w-[calc(100% - 40px)] mx-auto mt-4">
      Welcome to landing page
    </div>
  );
}
