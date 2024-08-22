"use client"

import useGetCurrentUser from "@/hooks/useCurrentUser";

export default function Home() {
  const { user, loading, error } = useGetCurrentUser();
  if (user) {
    return <div className="text-2xl mt-10">Welcome back {user.username}</div>;
  }
  return (
    <div className="w-[calc(100% - 40px)] mx-auto mt-4">
      Welcome to landing page
    </div>
  );
}
