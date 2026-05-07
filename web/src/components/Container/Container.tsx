import type { HTMLAttributes } from "react";
import { cx } from "@/lib/cx";
import styles from "./Container.module.css";

export function Container({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cx(styles.root, className)} {...props} />;
}

