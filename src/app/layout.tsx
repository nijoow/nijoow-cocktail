import "./globals.css";
import { Inter } from "next/font/google";
import { Providers } from "@/utils/provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "nijoow cocktail",
  description: "cocktail searching app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} h-full`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
