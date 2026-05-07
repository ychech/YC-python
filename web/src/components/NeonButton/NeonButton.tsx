import type { ButtonHTMLAttributes } from "react";
import { cx } from "@/lib/cx";
import styles from "./NeonButton.module.css";

export type NeonButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  tone?: "primary" | "ghost";
};

export function NeonButton({ tone = "primary", className, ...props }: NeonButtonProps) {
  return (
    <button
      className={cx(styles.root, tone === "ghost" ? styles.ghost : styles.primary, className)}
      {...props}
    />
  );
}
