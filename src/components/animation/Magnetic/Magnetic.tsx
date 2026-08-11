"use client";

import {
  useMotionValue,
  useSpring,
  useReducedMotion,
  motion,
} from "motion/react";

import {
  type ReactNode,
  type PointerEvent,
} from "react";

interface MagneticProps {
  children: ReactNode;
  strength?: number;
  className?: string;
}

export default function Magnetic({
  children,
  strength = 0.25,
  className,
}: MagneticProps) {
  const shouldReduceMotion = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, {
    stiffness: 300,
    damping: 20,
    mass: 0.5,
  });

  const springY = useSpring(y, {
    stiffness: 300,
    damping: 20,
    mass: 0.5,
  });

  const handlePointerMove = (
    event: PointerEvent<HTMLDivElement>,
  ) => {
    if (shouldReduceMotion) return;

    const rect =
      event.currentTarget.getBoundingClientRect();

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX =
      event.clientX - centerX;

    const distanceY =
      event.clientY - centerY;

    x.set(distanceX * strength);
    y.set(distanceY * strength);
  };

  const handlePointerLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      className={className}
      style={{
        x: springX,
        y: springY,
      }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      {children}
    </motion.div>
  );
}