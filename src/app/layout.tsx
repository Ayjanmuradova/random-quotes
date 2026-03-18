import { Geist, Geist_Mono } from "next/font/google";
import { UserProvider } from "@/context/UserContext";
import { QuotesProvider } from "@/context/QuotesContext";
import { ThemeProvider } from "next-themes";
import ThemeWrapper from "@/components/ThemeWrapper";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export const metadata = {
  title: "Random Quotes App",
  description: "A simple app that displays random quotes.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <UserProvider>
          <QuotesProvider>
            
            <ThemeWrapper fontVars={`${geistSans.variable} ${geistMono.variable}`}>
              {children}
            </ThemeWrapper>
          </QuotesProvider>
        </UserProvider>
      </ThemeProvider>
    </html>
  );
}