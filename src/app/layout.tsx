import { Geist, Geist_Mono } from "next/font/google";
import { UserProvider } from "@/context/UserContext";
import { QuotesProvider } from "@/context/QuotesContext";
import { ThemeProvider } from "next-themes";
import ThemeWrapper from "@/components/ThemeWrapper";
import "./globals.css";
import { auth0 } from "@/lib/auth0";
import LoginButton from "@/components/LoginButton";


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

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await auth0.getSession();
    const user = session?.user;
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-black dark:bg-slate-900 dark:text-white transition-colors duration-300`}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <UserProvider>
          
            
            <ThemeWrapper>
             {user ? (
                         <QuotesProvider>{children}</QuotesProvider>
                       ) : (
                        <main className="min-h-dvh flex items-center justify-center">
                         <div>
                           <p className="">
                             Welcome! Please log in to access your protected content.
                           </p>
                           <LoginButton />
                         </div>
                         </main>
                       )} 
            </ThemeWrapper>
          
        </UserProvider>
      </ThemeProvider>
      </body>
    </html>
  );
}