import type { ReactNode } from "react";
import { cx } from "@/lib/cx";
import styles from "./AppShell.module.css";

export function AppShell({
  sidebar,
  rail,
  children,
}: {
  sidebar?: ReactNode;
  rail?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className={styles.root}>
      <div className={styles.grid}>
        <div className={styles.sidebar}>{sidebar}</div>
        <main className={styles.main}>{children}</main>
        <div className={cx(styles.rail, !rail && styles.railEmpty)}>{rail}</div>
      </div>
    </div>
  );
}
