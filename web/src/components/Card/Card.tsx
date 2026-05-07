import type { HTMLAttributes } from "react";
import { cx } from "@/lib/cx";
import styles from "./Card.module.css";

type Tone = "glass" | "solid";

export type CardProps = HTMLAttributes<HTMLDivElement> & {
  tone?: Tone;
};

function Root({ tone = "glass", className, ...props }: CardProps) {
  return (
    <div
      className={cx(styles.root, tone === "solid" ? styles.solid : styles.glass, className)}
      {...props}
    />
  );
}

function Header({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cx(styles.header, className)} {...props} />;
}

function Body({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cx(styles.body, className)} {...props} />;
}

function Footer({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cx(styles.footer, className)} {...props} />;
}

export const Card = Object.assign(Root, { Header, Body, Footer });
