"use client";

import { NavbarComponents } from "@/components/navbar";
import "./globals.css";
import client from "@/lib/apollo-clients";
import { ApolloProvider } from "@apollo/client";
import Head from "next/head";
import { Toaster } from "@/components/ui/toaster";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
          {/* <NavbarComponents /> */}
          <main className="mx-40">{children}</main>
          <Toaster />
        </ApolloProvider>
      </body>
    </html>
  );
}
