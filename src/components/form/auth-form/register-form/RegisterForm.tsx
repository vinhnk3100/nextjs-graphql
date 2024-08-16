"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterForm() {
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    router.push("/");
  };

  return (
    <div className="flex mx-52">
      <div className="w-1/2 bg-zinc-900 p-12 text-white flex flex-col justify-between rounded-sm">
        <div>
          {/* <GaugeIcon className="h-8 w-8 text-white" /> */}
          <h1 className="mt-4 text-3xl font-semibold">Acme Inc</h1>
        </div>
        <div>
          <blockquote>
            &quot;This library has saved me countless hours of work and helped
            me deliver stunning designs to my clients faster than ever
            before&quot;
          </blockquote>
          <p className="mt-4">Sofia Davis</p>
        </div>
      </div>
      <div className="w-1/2 flex items-center justify-center p-12 bg-black">
        <div className="w-full max-w-md">
          <div className="bg-black py-8 px-6 shadow rounded-lg sm:px-10">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-zinc-200">
                Create an account
              </h2>
              <p className="mt-2 text-sm text-zinc-200">
                Enter field below to create your new account
              </p>
            </div>
            <form onSubmit={handleSubmit} className="mb-0 space-y-6">
              <div>
                <Input
                  className="text-zinc-900 bg-zinc-200 hover:bg-zinc-900 focus:text-zinc-200 hover:text-zinc-200 transition-all"
                  id="email"
                  type="email"
                  placeholder="name@email.com"
                />
              </div>
              <div>
                <Input
                  className="text-zinc-900 bg-zinc-200 hover:bg-zinc-900 focus:text-zinc-200 hover:text-zinc-200 transition-all"
                  id="username"
                  type="text"
                  placeholder="Username"
                />
              </div>
              <div>
                <Input
                  className="text-zinc-900 bg-zinc-200 hover:bg-zinc-900 focus:text-zinc-200 hover:text-zinc-200 transition-all"
                  id="password"
                  type="password"
                  placeholder="Password"
                />
              </div>
              <div className="flex flex-col gap-4">
                <div>
                  <Button
                    type="submit"
                    className="w-full bg-zinc-700 hover:bg-zinc-800 text-white"
                  >
                    Sign Up
                  </Button>
                </div>
                <div className="flex justify-end">
                  <Link
                    className="text-sm font-medium text-zinc-200 hover:text-zinc-400 hover:underline hover:underline-offset-4"
                    href="/login"
                    prefetch={false}
                  >
                    Already have an account?
                  </Link>
                </div>
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm"></div>
              </div>
            </form>
            <p className="mt-6 text-xs text-zinc-200">
              By clicking continue, you agree to our{" "}
              <Link
                className="font-medium text-zinc-200 hover:text-zinc-400 underline hover:underline-offset-4"
                href="/register"
                prefetch={false}
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                className="font-medium text-zinc-200 hover:text-zinc-400 underline hover:underline-offset-4"
                href="/register"
                prefetch={false}
              >
                Privacy Policy.
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
