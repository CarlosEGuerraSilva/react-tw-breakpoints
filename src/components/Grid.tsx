import React from "react";

type Breakpoint = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
type ResponsiveProp = number | Partial<Record<Breakpoint, number>>;

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  container?: boolean;
  size?: ResponsiveProp;
  className?: string;
  children: React.ReactNode;
}

const breakpointPrefix: Record<Breakpoint, string> = {
  xs: "",
  sm: "sm:",
  md: "md:",
  lg: "lg:",
  xl: "xl:",
  "2xl": "2xl:",
};

const VALID_COL_SPANS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as const;

// Mapeo de columnas a porcentajes para flexbox
const COL_TO_BASIS: Record<number, string> = {
  1: "basis-1/12",
  2: "basis-2/12",
  3: "basis-3/12",
  4: "basis-4/12",
  5: "basis-5/12",
  6: "basis-6/12",
  7: "basis-7/12",
  8: "basis-8/12",
  9: "basis-9/12",
  10: "basis-10/12",
  11: "basis-11/12",
  12: "basis-full",
};

const buildClasses = (prop?: ResponsiveProp) => {
  if (!prop) return ["basis-full"];
  if (typeof prop === "number") {
    return [COL_TO_BASIS[prop] || "basis-full"];
  }

  const classes: string[] = [];
  for (const [bp, v] of Object.entries(prop)) {
    const val = Number(v);
    if (!Number.isFinite(val)) continue;
    const valid = VALID_COL_SPANS.includes(val as any);
    if (!valid) continue;

    const basisClass = COL_TO_BASIS[val] || "basis-full";
    const prefix = breakpointPrefix[bp as Breakpoint];
    classes.push(`${prefix}${basisClass}`);
  }
  return classes;
};

const Grid: React.FC<GridProps> = ({
  container = false,
  size,
  className = "",
  children,
}) => {
  const sizeClasses = buildClasses(size).join(" ");

  if (container) {
    return (
      <div className={`flex flex-wrap ${className}`.trim()}>{children}</div>
    );
  }
  return <div className={`${sizeClasses} ${className}`.trim()}>{children}</div>;
};

export default Grid;
