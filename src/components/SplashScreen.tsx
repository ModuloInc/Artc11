"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import anime from "animejs";

interface SplashScreenProps {
  finishLoading: () => void;
}

export default function SplashScreen({ finishLoading }: SplashScreenProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const tl = anime.timeline({ complete: finishLoading });
    tl.add({
      targets: "#splash-logo",
      scale: [0.9, 1.05],
      opacity: [0.5, 1],
      duration: 600,
      easing: "easeOutExpo",
    })
      .add(
        {
          targets: "#splash-logo",
          scale: [1.05, 1],
          duration: 400,
          easing: "easeInOutQuad",
        },
        "-=200"
      )
      .add(
        {
          targets: "#splash-logo",
          scale: 1,
          duration: 800,
        },
        "-=100"
      );
  }, [finishLoading]);

  if (!mounted) return null;

  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center bg-[var(--color-background)]"
      aria-hidden="true"
    >
      <Image
        id="splash-logo"
        src="/logo.svg"
        alt=""
        width={160}
        height={80}
        className="opacity-0"
        priority
      />
    </div>
  );
}
