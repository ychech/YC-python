import Link from "next/link";
import { cx } from "@/lib/cx";
import styles from "./PathMap.module.css";

export type PathStep = {
  id: string;
  title: string;
  slug: string;
  status: "locked" | "todo" | "doing" | "done";
  meta?: string;
};

function StepDot({ status }: { status: PathStep["status"] }) {
  return <span className={cx(styles.dot, styles[`dot_${status}`])} aria-hidden="true" />;
}

export function PathMap({ title, steps }: { title: string; steps: PathStep[] }) {
  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <div className={styles.title}>{title}</div>
        <div className={styles.sub}>按关卡推进，完成会解锁下一节</div>
      </div>
      <div className={styles.track} role="list">
        {steps.map((s, i) => (
          <div key={s.id} className={styles.step} role="listitem">
            <div className={styles.top}>
              <StepDot status={s.status} />
              {i < steps.length - 1 ? <span className={styles.connector} aria-hidden="true" /> : null}
            </div>
            <Link className={styles.card} href={s.status === "locked" ? "#" : `/learn/${s.slug}`}>
              <div className={styles.stepTitle}>{s.title}</div>
              <div className={styles.stepMeta}>{s.meta ?? statusLabel(s.status)}</div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

function statusLabel(status: PathStep["status"]) {
  if (status === "doing") return "进行中";
  if (status === "done") return "已完成";
  if (status === "locked") return "未解锁";
  return "待开始";
}

