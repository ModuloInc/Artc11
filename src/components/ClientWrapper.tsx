"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Splashscreen from "@/components/Splashscreen";

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isHome = pathname === "/";
    const [isLoading, setIsLoading] = useState(isHome);

    useEffect(() => {
        if (isLoading) return;
    }, [isLoading]);

    return isLoading && isHome ? <Splashscreen /> : <>{children}</>;
}