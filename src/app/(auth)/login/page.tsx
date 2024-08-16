"use client"

import { LoginForm } from "@/components/form";
import useGetCurrentUser from "@/hooks/useCurrentUser";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter();
    const { user, loading, error } = useGetCurrentUser();
    if (user) {
        router.push('/')
    }
    return (
        <div className="h-screen flex justify-center items-center">
            <LoginForm />
        </div>
    )
}