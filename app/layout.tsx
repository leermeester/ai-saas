import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
} from '@clerk/nextjs'
import { ModalProvider } from '@/components/ui/modal-provider'

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "SFAI | AI Platform",
  description: "AI Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <head>
          <link rel="icon" href="/favicon.ico" />
        </head>
        <body suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable}`}>
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            {/* <UserButton /> */}
          </SignedIn>
          <ModalProvider />
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
