import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface LiquidGlassProps extends ComponentPropsWithoutRef<"div"> {
  children: ReactNode;
}

/**
 * Reusable translucent surface. The optical distortion stays on decorative
 * layers so text and controls inside the surface remain readable.
 */
export function LiquidGlass({ children, className, ...props }: LiquidGlassProps) {
  return (
    <div className={cn("liquid-glass", className)} {...props}>
      {children}
    </div>
  );
}

/** SVG filter definitions shared by every LiquidGlass surface. */
export function LiquidGlassFilterDefs() {
  return (
    <svg aria-hidden="true" className="absolute size-0 overflow-hidden">
      <defs>
        <filter id="liquid-glass-distortion" x="-15%" y="-15%" width="130%" height="130%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.012 0.035"
            numOctaves="2"
            seed="8"
            result="liquidNoise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="liquidNoise"
            scale="14"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>
    </svg>
  );
}
