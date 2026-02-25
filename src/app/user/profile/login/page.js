"use client";

import { useTheme } from "@/context/ThemeContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function LoginPage() {
  const { isDarkMode } = useTheme();
  return (
    <main className="flex items-center justify-center min-h-[80vh] p-4">
      <Card className="w-full max-w-md border-zinc-200 dark:border-zinc-800 shadow-xl">
        <CardHeader className="text-center space-y-1">
          <CardTitle className="text-center text-2xl font-bold ">Login</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">Email</label>
            <Input id="email" type="email" placeholder="name@gmail.com" />
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">Password</label>
            <Input id="password" type="password" placeholder="Enter your password"/>
          </div>

          <Button className="w-full bg-emerald-800 hover:bg-emerald-900 text-white transition-all">Login</Button>
            <p className="text-sm text-center text-zinc-600 dark:text-zinc-400">Don't have an account? 
              <Link href="/user/profile/signup" className="text-blue-600 dark:text-blue-400 hover:underline font-bold">Sign up</Link></p>
        </CardContent>
      </Card>
    </main>
  );
}
