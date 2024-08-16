"use client";

import { NavbarComponents } from "@/components/navbar";
import "./globals.css";
import { ApolloProvider } from "@apollo/client";
import Head from "next/head";
import { Toaster } from "@/components/ui/toaster";
import { usePathname } from "next/navigation";
import { authRoutes } from "@/routes";
import { SessionProvider } from "next-auth/react";
import client from "@/lib/apollo-clients";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Example Project</title>
        <meta name="description" content={""} />
      </Head>
      <body className="bg-zinc-950">
        <ApolloProvider client={client}>
          <SessionProvider>
            {!authRoutes.includes(pathname) && <NavbarComponents />}
            <main className="text-zinc-200 mx-20">{children}</main>
            <Toaster />
          </SessionProvider>
        </ApolloProvider>
      </body>
    </html>
  );
}
