import { auth0 } from "@/lib/auth0";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function Profile() {
  const session = await auth0.getSession();
  const user = session?.user;

  if (!user) {
    return null;
  }

  const profileImage = user.picture || "https://s.gravatar.com/avatar/default?s=200";

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-4">
      <Card className="w-[450px] max-w-full mx-auto shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader className="flex flex-col items-center text-center pt-8 pb-4">
          <div className="relative w-28 h-28 mb-4 rounded-full overflow-hidden border-4 border-emerald-50 dark:border-emerald-900/30 shadow-sm">
            <Image
              src={profileImage}
              alt={user.name || "Profile Picture"}
              fill
              className="object-cover"
              sizes="112px"
              priority
            />
          </div>
          <div className="w-full space-y-1.5 px-6">
          <CardTitle className="text-2xl font-bold tracking-tight">
            {user.name}
          </CardTitle>
          
          <CardDescription className="text-emerald-700 dark:text-emerald-300 font-semibold text-lg px-4 mt-0.5">
            {user.email}
          </CardDescription>
</div>
        </CardHeader>
        
        <CardContent className="text-center pt-4 border-t border-slate-100 dark:border-slate-800">
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-4 py-1.5 rounded-full">
            <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></span>
            Verified User 
          </span>
        </CardContent>

      </Card>

    </div>
  );
}