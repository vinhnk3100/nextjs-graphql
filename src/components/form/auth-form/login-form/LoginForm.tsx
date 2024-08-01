"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { LoginSchema } from "@/schemas";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CgSpinner } from "react-icons/cg";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import FormErrorComponents from "../../FormErrorComponents";
import AuthService from "@/app/api/services/auth.services";
import { Suspense, useState } from "react";

export default function LoginForm() {
  const router = useRouter();
  const [message, setMessage] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const handleSubmitForm = async (values: z.infer<typeof LoginSchema>) => {
    const validateFields = LoginSchema.safeParse(values);
    if (validateFields.success) {
      const res = await AuthService.login(validateFields.data);
      setLoading(true);
      if (res.status) {
        setMessage(res.message);
        setLoading(false);
        console.log(res);
        return;
      } else {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
        setMessage(res.message);
      }
    } else {
      setMessage("Invalid Fields!");
    }
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
              <h2 className="text-2xl font-bold text-zinc-200">Login</h2>
              <p className="mt-2 text-sm text-zinc-200">Welcome back!</p>
            </div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmitForm)}
                className="mb-0 space-y-6"
              >
                <div className="mb-0 space-y-6">
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            {...field}
                            className="text-zinc-900 bg-zinc-200 hover:bg-zinc-900 focus:text-zinc-200 hover:text-zinc-200 transition-all"
                            type="text"
                            placeholder="Username"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            {...field}
                            className="text-zinc-900 bg-zinc-200 hover:bg-zinc-900 focus:text-zinc-200 hover:text-zinc-200 transition-all"
                            type="password"
                            placeholder="******"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormErrorComponents message={message ? message : ""} />
                </div>
                <div className="flex flex-col gap-4">
                  <div>
                    <Button
                      type="submit"
                      className="w-full bg-zinc-700 hover:bg-zinc-800 text-white"
                    >
                      Sign In
                    </Button>
                  </div>
                  <div className="flex justify-end">
                    <Link
                      className="text-sm font-medium text-zinc-200 hover:text-zinc-400 hover:underline hover:underline-offset-4"
                      href="/login"
                      prefetch={false}
                    >
                      Forgotten Password?
                    </Link>
                  </div>
                </div>
              </form>
            </Form>
            <div className="mb-0 space-y-6 mt-4">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  {(!loading && (
                    <div className="w-full border-t border-gray-300" />
                  )) || (
                    <>
                      <div className="w-full border-t border-gray-300 mr-3" />
                      <CgSpinner className="animate-spin text-white h-16 w-16" />
                      <div className="w-full border-t border-gray-300 ml-3" />
                    </>
                  )}
                </div>
                <div className="relative flex justify-center text-sm"></div>
              </div>
              <div className="flex flex-row gap-6">
                <Button className="w-full transition-all bg-white text-gray-700 border border-gray-300 shadow-sm">
                  <FcGoogle className="text-2xl" />
                </Button>
                <Button className="group transition-all w-full bg-white text-gray-700 border border-gray-300 shadow-sm">
                  <FaGithub className="group-hover:text-white text-2xl" />
                </Button>
              </div>
              <div className="flex justify-end">
                <Link
                  className="text-sm font-medium text-zinc-200 hover:text-zinc-400 hover:underline hover:underline-offset-4"
                  href="/register"
                  prefetch={false}
                >
                  Don&apos;t have an account?
                </Link>
              </div>
            </div>
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
