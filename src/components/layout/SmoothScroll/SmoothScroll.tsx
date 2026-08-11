"use client";

import { ReactLenis } from "lenis/react";

interface SmoothScrollProps {
  children: React.ReactNode;
}

export default function SmoothScroll({
  children,
}: SmoothScrollProps) {
  return (
    <ReactLenis
      root
      options={{
        autoRaf: true,
        lerp: 0.08,
        duration: 1.2,
        smoothWheel: true,
        anchors: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}