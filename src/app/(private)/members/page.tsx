"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AnimatedShinyText } from "@/components/ui/animated-shiny-text"

export default function MembersPage() {
  const router = useRouter();

  useEffect(() => {
    // Replace current history entry and navigate to home
    router.replace("/");
  }, [router]);

  return (
    <main className="flex items-center justify-center min-h-screen bg-black" style={{
      background:
        "radial-gradient(37.55% 29.18% at 113.44% 43.98%, #290886 0%, rgba(0, 0, 0, 0.00) 100%), radial-gradient(54.06% 49.74% at 40.94% 68.84%, rgba(41, 8, 134, 0.20) 0%, rgba(0, 0, 0, 0.00) 100%), radial-gradient(68.5% 61.39% at 55.21% -19.94%, #290886 0%, rgba(0, 0, 0, 0.00) 100%), radial-gradient(49.46% 42.97% at -9.9% 105.52%, #B00D23 0%, rgba(0, 0, 0, 0.00) 100%), #05060B",
    }}>
     
      
      <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400"> 
        <h2 className="text-white ">Redirecionando...</h2>
      </AnimatedShinyText>
   
    </main >
  );
}
