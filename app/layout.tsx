import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import "./globals.css";
import TanStackProvider from "@/provider/tanstack-provider";
import { ToastProvider } from "@/provider/toast-provider";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AntdRegistry>
        <body className={inter.className}>
          <TanStackProvider>
            <ToastProvider />
            {children}
          </TanStackProvider>
        </body>
      </AntdRegistry>
    </html>
  );
}
