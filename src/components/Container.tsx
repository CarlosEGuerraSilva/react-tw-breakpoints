import React from "react";
import clsx from "clsx";

export interface ContainerProps {
  children?: React.ReactNode;
  className?: string;
  maxWidth?:
    | "sm"
    | "md"
    | "lg"
    | "xl"
    | "2xl"
    | "3xl"
    | "4xl"
    | "5xl"
    | "6xl"
    | "7xl"
    | "8xl"
    | "9xl"
    | "full";
}

const maxWidthClasses: Record<
  NonNullable<ContainerProps["maxWidth"]>,
  string
> = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  "2xl": "max-w-2xl",
  "3xl": "max-w-3xl",
  "4xl": "max-w-4xl",
  "5xl": "max-w-5xl",
  "6xl": "max-w-6xl",
  "7xl": "max-w-7xl",
  "8xl": "max-w-[1600px]",
  "9xl": "max-w-[1800px]",
  full: "max-w-full",
};

const Container: React.FC<ContainerProps> = ({
  children,
  className = "",
  maxWidth = "lg",
}) => {
  return (
    <div
      className={clsx(
        "container mx-auto px-2",
        maxWidthClasses[maxWidth],
        className
      )}
    >
      {children}
    </div>
  );
};

export default Container;
