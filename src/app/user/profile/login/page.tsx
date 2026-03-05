"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  
  return (
    <main className="flex items-center justify-center min-h-[80vh] p-4">
      <Card className="w-full max-w-md border-zinc-200 dark:border-zinc-800 shadow-xl">
        <CardHeader className="text-center space-y-1">
          <CardTitle className="text-center text-2xl font-bold ">Login</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="name@gmail.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="Enter your password"/>
          </div>

          <Button type='submit' className="w-full">Login</Button>
            <p className="text-sm text-center text-zinc-600 dark:text-zinc-400">Don't have an account? 
              <Link href="/user/profile/signup" className="text-blue-600 dark:text-blue-400 hover:underline font-bold">Sign up</Link></p>
        </CardContent>
      </Card>
    </main>
  );
}
