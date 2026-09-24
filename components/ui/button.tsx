import Link from "next/link";
import { ReactNode } from "react";

interface ButtonProps {
  href?: string;
  children: ReactNode;
  variant?: "filled" | "glass" | "outline";
  size?: "small" | "medium" | "large" | "xlarge";
  shape?: "round" | "square";
  className?: string;
  external?: boolean;
}

const sizeClasses = {
  small: "px-4 py-2 text-sm",
  medium: "px-6 py-3 text-base",
  large: "px-8 py-4 text-base",
  xlarge: "px-10 py-5 text-lg",
};

const variantClasses = {
  filled: "bg-dark-1 text-white hover:bg-blue-600",
  glass: "bg-white/5 backdrop-blur-sm border border-outline text-white hover:bg-white/10",
  outline: "border border-outline text-white hover:bg-white/5",
};

const shapeClasses = {
  round: "rounded-full",
  square: "rounded-lg",
};

export function Button({
  href,
  children,
  variant = "filled",
  size = "medium",
  shape = "round",
  className = "",
  external = false,
}: ButtonProps) {
  const classes = `inline-flex items-center justify-center font-medium transition-all duration-200 ${sizeClasses[size]} ${variantClasses[variant]} ${shapeClasses[shape]} ${className}`;

  if (href) {
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return <button className={classes}>{children}</button>;
}
